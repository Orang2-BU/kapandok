# Lampiran C. Simulasi Bukti Konsep KapanDok

> **Data simulasi (sintetis), bukan data rumah sakit.** Angka di bawah adalah ilustrasi cara kerja, bukan hasil uji di RS AR Fachrudin UMS.

## Tujuan
Membuktikan dua fungsi kritis KapanDok (dasar klaim TKT 3):
1. **Model 1** memprediksi jam mulai praktik dokter dengan rentang keyakinan 90% yang terkalibrasi.
2. **Model 3** (optimasi jam datang) menurunkan waktu tunggu pasien dibanding kondisi sekarang dan notifikasi reaktif.

## Metode
- **Data sintetis.** 5.000 hari praktik sintetis untuk Model 1 (3.000 latih, 1.000 kalibrasi, 1.000 uji), lalu 300 sesi untuk membandingkan strategi.
  - Satu sesi berisi 24 pasien dengan slot 10 menit.
  - Penyebab keterlambatan dokter: operasi, visite rawat inap, darurat, atau normal. Penyebab ini sesuai konfirmasi mitra (Okt 2026).
- **Model 1.** *Gradient boosting* kuantil (5/50/95%) ditambah *split conformal prediction* [7]. Sinyal yang dipakai:
  - penyebab,
  - sisa estimasi operasi atau visite,
  - kebiasaan telat dokter.

  Keputusan diambil 90 menit sebelum jam praktik.
- **Model 2.** Durasi konsultasi menurut jenis pasien (kontrol 8 menit, baru 14 menit) [8], dan peluang tidak hadir 15% [9].
- **Model 3.** *Sample average approximation* [11] atas 300 skenario per sesi. Fungsi biaya: rerata tunggu pasien + 0,5 × waktu dokter menganggur. Pasien tidak pernah diminta datang lebih awal dari slot awalnya.
- **Strategi yang dibandingkan:**
  - **A. Kondisi sekarang:** pasien datang sesuai slot awal.
  - **B1. Reaktif ideal:** petugas tahu keterlambatan secara tepat saat jam praktik, dan semua pasien yang belum berangkat terkabari. Ini batas atas.
  - **B2. Reaktif realistis:** sama dengan B1, tetapi hanya sekitar 50% pasien terkabari tepat waktu, sesuai temuan audit klinik [5]. Pengabaran saat ini juga masih manual lewat WhatsApp (konfirmasi mitra).
  - **C. KapanDok:** prediksi Model 1-2, lalu optimasi jam datang 90 menit sebelum praktik.

## Hasil

**Model 1:** cakupan interval 90% tercapai **93,4%** pada 1.000 hari uji, dengan galat absolut rata-rata median **16,0 menit**.

| Strategi | Rerata tunggu (mnt) | Median (mnt) | Tunggu > 60 mnt | Dokter menganggur (mnt/sesi) |
|---|---|---|---|---|
| A. Kondisi sekarang | 35,5 | 22,4 | 20,2% | 9,4 |
| B1. Reaktif ideal (batas atas) | 15,7 | 10,0 | 3,7% | 21,6 |
| B2. Reaktif realistis | 27,7 | 16,8 | 13,6% | 19,6 |
| **C. KapanDok** | **16,8** | **9,4** | **4,6%** | 22,3 |

Grafik: `grafik_waktu_tunggu.png` dan `grafik_prediksi_model1.png`.

## Interpretasi
- Dibanding kondisi sekarang, rerata waktu tunggu dengan KapanDok turun **sekitar 53%** (35,5 menjadi 16,8 menit). Pasien yang menunggu lebih dari 60 menit turun dari **20,2% menjadi 4,6%**.
- KapanDok mendekati batas atas notifikasi reaktif yang ideal, **tanpa bergantung pada konfirmasi manual dokter dan petugas**, dan keputusannya diambil 90 menit lebih awal.
- Dibanding notifikasi reaktif yang realistis, rerata tunggu KapanDok **sekitar 39% lebih rendah**.
- **Ada konsekuensinya:** waktu dokter menganggur naik sekitar 13 menit per sesi. Bobot di fungsi biaya bisa diatur bersama mitra untuk menyeimbangkan waktu tunggu pasien dengan waktu dokter.

## Batasan
- Semua parameter adalah **asumsi** dari literatur dan informasi umum mitra. Model akan dilatih ulang dengan data historis anonim setelah ada izin mitra.
- Waktu tunggu di sini hanya mencakup jeda antara jam datang pasien dan saat dilayani dokter. Waktu pendaftaran dan farmasi tidak dimodelkan.
- Keterlambatan karena keadaan darurat tidak terlihat dari sinyal apa pun, sehingga rentang prediksi pada hari operasi atau darurat bisa lebar.
- Model 3 memakai kebijakan sederhana dengan 2 parameter (pergeseran awal dan jarak antarpasien). Optimasi per pasien akan dikembangkan pada tahap hackathon.

## Reproduksi
```
python simulasi_kapandok.py
```
Butuh Python 3 dengan paket numpy, scikit-learn, dan matplotlib. Seed acak tetap (2026), jadi hasilnya bisa diulang.

Nomor sumber [5], [7], [8], [9], [11] merujuk ke Daftar Pustaka proposal.
