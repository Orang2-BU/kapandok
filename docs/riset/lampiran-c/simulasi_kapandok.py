"""Simulasi bukti konsep KapanDok (DATA SINTETIS, bukan data RS).

Membandingkan tiga strategi pada satu sesi praktik rawat jalan:
  A. Kondisi sekarang  : pasien datang sesuai slot awal.
  B. Notifikasi reaktif: petugas mengabari keterlambatan saat dokter konfirmasi (jam praktik).
     B1 ideal    : semua pasien terkabari, nilai keterlambatan tepat (batas atas).
     B2 realistis: hanya ~50% pasien terkabari tepat waktu (audit klinik [5]).
  C. KapanDok          : prediksi jam mulai (model kuantil + conformal) lalu optimasi jam datang (SAA).

Jalankan: python simulasi_kapandok.py  -> mencetak hasil, menyimpan grafik PNG dan ringkasan.md
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.ensemble import GradientBoostingRegressor

rng = np.random.default_rng(2026)

# ---- Parameter (asumsi; sumber di ringkasan.md) ----
N = 24             # pasien terjadwal per sesi
SLOT = 10          # menit per slot di jadwal awal (sesi 4 jam)
P_NOSHOW = 0.15    # Olearczyk 2026: 14%; Dantas 2018: rerata global ~23%
P_INFORMED = 0.5   # audit klinik Inggris [5]: ~50% pasien diberi tahu sesuai protokol
TRAVEL = 30        # menit perjalanan pasien; kabar < TRAVEL sebelum slot dianggap terlambat
DECIDE = -90       # KapanDok memutuskan 90 menit sebelum jam praktik
TYPE_MEAN = {0: 8.0, 1: 14.0}   # durasi kontrol vs pasien baru (Golmohammadi 2023: jenis pasien prediktor utama)
CAUSES = ["normal", "operasi", "visite", "darurat"]
P_CAUSE = [0.20, 0.35, 0.35, 0.10]   # mitra: perubahan hampir setiap hari, penyebab operasi/visite/darurat


def make_days(n):
    """Hari sintetis: sinyal yang terlihat 90 menit sebelum praktik dan keterlambatan dokter sebenarnya."""
    cause = rng.choice(4, n, p=P_CAUSE)
    habit = rng.normal(8, 6, n)                           # kebiasaan telat dokter (riwayat)
    load = np.where(cause == 1, rng.uniform(30, 180, n),  # sisa estimasi operasi (menit)
           np.where(cause == 2, rng.integers(4, 20, n) * 7.0, 0.0))  # sisa pasien visite x 7 menit
    mult = np.where(cause == 1, rng.lognormal(0.05, 0.30, n), rng.lognormal(0, 0.15, n))
    delay = habit + np.maximum(0, load * mult + 10 + DECIDE)  # +10 menit pindah ke poli
    delay += np.where(cause == 3, rng.exponential(45, n), 0)  # darurat: tidak terlihat dari sinyal
    delay = np.maximum(0, delay + rng.normal(0, 5, n))
    X = np.column_stack([np.eye(4)[cause], habit, load])
    return X, delay


def fit_model1():
    """Model 1: kuantil 5/50/95% + split conformal (CQR) agar interval 90% terkalibrasi."""
    Xtr, ytr = make_days(3000)
    Xca, yca = make_days(1000)
    q = {a: GradientBoostingRegressor(loss="quantile", alpha=a, n_estimators=200, max_depth=3,
                                      random_state=0).fit(Xtr, ytr) for a in (0.05, 0.5, 0.95)}
    lo, hi = q[0.05].predict(Xca), q[0.95].predict(Xca)
    score = np.maximum(lo - yca, yca - hi)
    k = int(np.ceil(0.9 * (len(yca) + 1))) - 1
    qhat = np.sort(score)[k]
    resid = yca - q[0.5].predict(Xca)                    # untuk skenario SAA
    return q, qhat, resid


def run_queue(arr, start, serv, show):
    """Antrean satu dokter, urut nomor antrean. Semua argumen bisa berdimensi skenario (S, N)."""
    t = np.array(start, dtype=float)
    wait = np.zeros_like(arr, dtype=float)
    idle = np.zeros_like(t)
    for k in range(arr.shape[-1]):
        a, s, m = arr[..., k], serv[..., k], show[..., k]
        begin = np.maximum(t, a)
        idle += np.where(m, np.maximum(0, a - t), 0)
        wait[..., k] = np.where(m, begin - a, np.nan)
        t = np.where(m, begin + s, t)
    return wait, idle, t


def main():
    q, qhat, resid = fit_model1()
    Xte, yte = make_days(1000)
    lo = q[0.05].predict(Xte) - qhat
    hi = q[0.95].predict(Xte) + qhat
    med = q[0.5].predict(Xte)
    coverage = np.mean((yte >= lo) & (yte <= hi))
    mae = np.mean(np.abs(med - yte))

    planned = np.arange(N) * SLOT
    DAYS, S = 300, 300
    deltas, spacings = np.arange(-20, 35, 5), np.arange(0.6, 1.25, 0.1)
    K = ["A", "B1", "B2", "C"]
    res = {s: {"wait": [], "idle": [], "end": []} for s in K}
    for d in range(DAYS):
        types = rng.integers(0, 2, N)                       # 0 kontrol, 1 pasien baru
        mean_s = np.vectorize(TYPE_MEAN.get)(types)
        serv = rng.lognormal(np.log(mean_s), 0.35)
        show = rng.random(N) > P_NOSHOW
        D = yte[d]

        arr_a = planned.astype(float)
        arr_b1 = np.where(planned >= TRAVEL, planned + D, planned)  # yang sudah berangkat tak terkabari
        told = rng.random(N) < P_INFORMED
        arr_b2 = np.where((planned >= TRAVEL) & told, planned + D, planned)

        # KapanDok: SAA atas skenario dari Model 1 (median + residual) dan Model 2 (durasi, no-show)
        # ponytail: kebijakan 2 parameter (geser + jarak), bukan optimasi per pasien; cukup untuk bukti konsep
        Ds = np.maximum(0, med[d] + rng.choice(resid, S))[:, None]
        sv = rng.lognormal(np.log(mean_s), 0.35, (S, N))
        sh = rng.random((S, N)) > P_NOSHOW
        gap = np.concatenate([[0], np.cumsum(mean_s * (1 - P_NOSHOW))[:-1]])
        best, best_cost = None, np.inf
        for dl in deltas:
            for c in spacings:
                arr = np.maximum(planned, med[d] + dl + c * gap)
                w, idle, _ = run_queue(np.broadcast_to(arr, (S, N)), Ds[:, 0], sv, sh)
                cost = np.nanmean(w) + 0.5 * idle.mean()
                if cost < best_cost:
                    best, best_cost = arr, cost
        for name, arr in (("A", arr_a), ("B1", arr_b1), ("B2", arr_b2), ("C", best)):
            w, idle, end = run_queue(arr[None], np.array([D]), serv[None], show[None])
            res[name]["wait"].extend(w[~np.isnan(w)])
            res[name]["idle"].append(idle[0])
            res[name]["end"].append(end[0])

    label = {"A": "A. Kondisi\nsekarang", "B1": "B1. Reaktif\nideal", "B2": "B2. Reaktif\nrealistis",
             "C": "C. KapanDok"}
    rows = []
    for s in K:
        w = np.array(res[s]["wait"])
        rows.append((label[s], w.mean(), np.median(w), 100 * np.mean(w > 60),
                     np.mean(res[s]["idle"]), np.mean(res[s]["end"])))
    print(f"Model 1: cakupan interval 90% = {coverage:.1%}, MAE median = {mae:.1f} menit")
    for r in rows:
        print(f"{r[0].replace(chr(10), ' '):24s} rerata tunggu {r[1]:5.1f} | median {r[2]:5.1f} | >60 mnt {r[3]:4.1f}% "
              f"| dokter menganggur {r[4]:5.1f} | sesi selesai +{r[5]:5.1f}")

    # ---- Grafik ----
    fig, ax = plt.subplots(1, 2, figsize=(11, 4.2))
    ax[0].boxplot([res[s]["wait"] for s in K], showfliers=False)
    ax[0].set_xticks([1, 2, 3, 4], [label[s] for s in K], fontsize=8)
    ax[0].axhline(60, ls="--", c="gray", lw=1)
    ax[0].text(4.45, 61, "standar 60 menit", fontsize=8, ha="right", va="bottom", c="gray")
    ax[0].set_ylabel("Waktu tunggu pasien di RS (menit)")
    ax[0].set_title("Sebaran waktu tunggu (300 sesi)")
    ax[1].bar([label[s] for s in K], [r[3] for r in rows], color=["#9aa5b1", "#c9d6e0", "#7aa6c2", "#1b6aa3"])
    ax[1].set_ylabel("Pasien menunggu > 60 menit (%)")
    ax[1].set_title("Melampaui standar waktu tunggu")
    ax[1].tick_params(axis="x", labelsize=8)
    fig.text(0.5, -0.02, "Data simulasi (sintetis), bukan data rumah sakit.", ha="center", fontsize=8, c="gray")
    fig.tight_layout()
    fig.savefig("grafik_waktu_tunggu.png", dpi=200, bbox_inches="tight")

    n = 40
    fig, ax = plt.subplots(figsize=(11, 3.8))
    x = np.arange(n)
    inside = (yte[:n] >= lo[:n]) & (yte[:n] <= hi[:n])
    ax.vlines(x, lo[:n], hi[:n], color="#1b6aa3", lw=6, alpha=0.35, label="Rentang prediksi 90%")
    ax.scatter(x[inside], yte[:n][inside], c="#1b6aa3", s=18, label="Jam mulai sebenarnya (di dalam rentang)")
    ax.scatter(x[~inside], yte[:n][~inside], c="#c0392b", s=22, marker="x", label="Di luar rentang")
    ax.set_xlabel("Hari uji ke-")
    ax.set_ylabel("Keterlambatan mulai praktik (menit)")
    ax.set_title(f"Model 1: prediksi jam mulai praktik, cakupan 90% tercapai {coverage:.0%} (1.000 hari uji)")
    ax.legend(fontsize=8, loc="upper right")
    fig.text(0.5, -0.02, "Data simulasi (sintetis), bukan data rumah sakit.", ha="center", fontsize=8, c="gray")
    fig.tight_layout()
    fig.savefig("grafik_prediksi_model1.png", dpi=200, bbox_inches="tight")

    with open("hasil_tabel.md", "w", encoding="utf-8") as f:
        f.write(f"Cakupan interval 90% Model 1: {coverage:.1%}; MAE median: {mae:.1f} menit\n\n")
        f.write("| Strategi | Rerata tunggu (mnt) | Median (mnt) | Tunggu > 60 mnt | Dokter menganggur (mnt/sesi) | Sesi selesai (mnt setelah jadwal) |\n|---|---|---|---|---|---|\n")
        for r in rows:
            f.write(f"| {r[0].replace(chr(10), ' ')} | {r[1]:.1f} | {r[2]:.1f} | {r[3]:.1f}% | {r[4]:.1f} | {r[5]:.1f} |\n")

    # self-check: kalau logika rusak, ini gagal
    assert 0.85 <= coverage <= 0.95, coverage
    assert rows[3][1] < rows[0][1], "KapanDok harus lebih baik dari kondisi sekarang"


if __name__ == "__main__":
    main()
