# Prompt untuk Codex (salin seluruh blok di bawah ke Codex)

---

Kamu adalah engineer frontend senior yang mengerjakan **KapanDok** di repo ini. Bekerjalah dalam bahasa Indonesia untuk teks UI.

## 1. Apa yang kita bangun
KapanDok adalah sistem untuk tantangan **RS-01 UMS Health Innovation Hackathon 2026**. Mitra tantangannya RS AR Fachrudin UMS, dengan judul tantangan "Informasi Jadwal Dokter dan Notifikasi Perubahan untuk Pasien".

**Masalahnya:** jadwal dokter rawat jalan berubah hampir setiap hari, karena operasi melebihi estimasi, visite rawat inap, atau tindakan darurat. Petugas lalu mengabari pasien secara manual lewat WhatsApp.

**Cara kerja KapanDok:**
1. Memprediksi jam mulai praktik dokter dari sinyal rumah sakit, dengan rentang keyakinan 90%.
2. Kalau sinyal kurang, meminta dokter konfirmasi satu ketukan lewat WhatsApp.
3. Menghitung jam datang yang pas untuk setiap pasien.
4. Mengirimkan jam itu lewat WhatsApp dengan tombol "Hadir" dan "Jadwal ulang".

**Web melayani tiga kelompok:**
- **Petugas poli:** memantau sesi dokter dan status pesan pasien.
- **Admin RS:** melihat laporan dan mengatur data.
- **Pasien:** cek jadwal dokter, dan melihat jam datang pribadi lewat kode booking.

## 2. Tugasmu SEKARANG: Fase 0, mockup statis 5 layar untuk proposal
Hasil akhirnya **5 halaman web statis** (tanpa backend, tanpa login sungguhan, tanpa database), plus **screenshot PNG** dari setiap halaman untuk ditempel di lampiran proposal. Deadline: **15 Oktober 2026**.

| # | Halaman | Rute | Viewport screenshot |
|---|---|---|---|
| P10 | Hari ini (dashboard petugas) | `/app` | 1440×900 |
| P11 | Detail sesi dr. Rina | `/app/sesi/s-pd-rina` | 1440×1100 |
| P1 | Cek jadwal dokter (publik) | `/jadwal` | 390×844 |
| P4 | Jam datang saya (publik) | `/k/KD-4812` | 390×844 |
| P15 | Laporan dampak (admin) | `/admin/laporan` | 1440×900 |

## 3. Baca dulu, berurutan, sebelum menulis kode
1. `AGENTS.md`
2. `docs/00-BRIEF.md`
3. `docs/01-PRD.md`: terutama §4 Alur Inti, §5 Peta Halaman, §7 F0
4. `docs/08-DESIGN.md`: token, pola layout, konten spesifik layar Fase 0, Anti tampilan AI
5. **`docs/09-MOCKUP-FASE0.md`: susunan setiap layar dari atas ke bawah, teks UI final** (acuan utama saat membangun)
6. `docs/03-ARCHITECTURE.md`: §1 Stack, §2 Perintah, §6 task T1-T10
7. `docs/02-AGENT.md`, `docs/06-WORKFLOW.md`, `docs/07-RULES.md`
8. `docs/seed/mockup-data.json`: **satu-satunya sumber data**
9. Acuan visual pendamping: `docs/riset/lampiran-c/mockup_wa.png` (mockup WA dengan skenario yang sama). Jangan meniru tampilan WhatsApp di web.

## 4. Skenario yang wajib konsisten
Skenarionya: Senin, 9 November 2026, snapshot pukul 08.50. **Angka-angka ini dipakai juga di proposal dan mockup WA, jadi jangan diubah.**

**dr. Rina Setyaningsih, Sp.PD (Poli Penyakit Dalam)**
- Jadwal resmi 09.00-13.00, dengan 22 pasien.
- Prediksi mulai **10.15**, rentang **10.05-10.30**.
- Alasan: "Tindakan di OK 2 berjalan 40 menit melewati estimasi".
- Konfirmasi dokter: "Sesuai prediksi (08.41)".
- Status pesan: 22 terkirim · 17 dibaca · 12 konfirmasi hadir · 1 minta jadwal ulang · 4 dibaca belum membalas · 5 belum dibaca.

**Ibu Sri Wahyuni**
- Antrean 12, kode `KD-4812`.
- Slot awal 10.50, jam datang 11.15, perkiraan dipanggil **11.30**, saran berangkat **10.45**.
- Status: Hadir.

**Sesi dokter lain**
- **dr. Dewi Anggraini, Sp.A (Anak):** menunggu konfirmasi dokter, prediksi 10.20 (10.10-10.35).
- **dr. Agus Prasetyo, Sp.B (Bedah):** praktik batal, 9 dari 14 pasien sudah memilih slot pengganti.
- **dr. Bambang Hartono, Sp.OG (Kebidanan):** sudah mulai 08.05.
- **dr. Lestari Wulandari, Sp.M (Mata):** tepat waktu 09.30.

**Laporan (data simulasi)**
- Rerata tunggu 35,5 → 16,8 menit.
- Menunggu > 60 menit: 20,2% → 4,6%.
- Cakupan interval 93,4%, MAE 16,0 menit.
- Bandingkan 4 strategi: A Kondisi sekarang, B1 Reaktif ideal, B2 Reaktif realistis, C KapanDok. Angka lengkapnya di `docs/riset/lampiran-c/ringkasan.md`.

## 5. Aturan teknis
- **Stack:** Next.js App Router + TypeScript strict + Tailwind CSS v4 + shadcn/ui + lucide-react.
  - Recharts lewat komponen `chart` shadcn, hanya untuk P15.
  - Playwright hanya untuk script screenshot.
  - pnpm, di folder `web/`.
  - Jangan menambah dependency lain tanpa izin.
- **Token desain:** di-export dari `docs/08-DESIGN.md` dengan `npx -p @google/design.md designmd export --format css-tailwind docs/08-DESIGN.md > web/src/styles/theme.css`, lalu variabel tema shadcn dipetakan ke token. **Dilarang** memakai warna, radius, atau shadow di luar token.
- **Font:** Plus Jakarta Sans lewat `next/font/google`. Semua jam memakai `tabular-nums`.
- **Sidebar app:** animated sidebar dari 21st.dev (Aceternity), diadaptasi ke token. Bukan sidebar shadcn.
  - Menu petugas: Hari ini · Tindak lanjut (badge "1") · Pasien · Riwayat.
  - Grup Admin: Laporan · Dokter · Poli · Jadwal praktik · Pengguna · Pengaturan · Mode demo.
  - Saat diciutkan berupa rail ikon bulat (gaya referensi `docs/design/refs/ref-1.png`).
  - Akun berupa **pil di bar atas kanan**: "Rahmat Hidayat · Petugas poli".
  - Item menu yang belum dibuat boleh berupa link non-aktif bertanda "Segera".
- **Acuan gaya visual:** `docs/design/preview.html` (render: `docs/design/preview-p10.png`). Ikuti grid bento, pil, dan angka ringan seperti di sana.
- **Warna utama biru** (`primary`): tombol utama, item navigasi aktif, chip terpilih. Badge status pastel.
- **Grafik bentuk standar** (Recharts BarChart): bar persegi, sumbu, garis bantu putus-putus, label nilai, legenda. Jangan bar pil atau gaya dekoratif.
- **Halaman pasien:** satu kolom, maksimal 480px, header sederhana "RS AR Fachrudin UMS", tanpa sidebar.
- **Label "Data simulasi"** (komponen `sim-label`) wajib terlihat di setiap halaman.
- **Data:** salin `docs/seed/mockup-data.json` ke `web/src/data/mockup-data.json`, lalu buat tipe di `web/src/lib/types.ts`. Tidak ada fetch ke jaringan.
- **Script `pnpm shots`:** jalankan Playwright terhadap `next start` (atau dev server), lalu simpan 5 PNG dengan `deviceScaleFactor: 2` ke `docs/mockup/` dengan nama:
  - `p10-hari-ini.png`
  - `p11-detail-sesi.png`
  - `p01-cek-jadwal.png`
  - `p04-jam-datang.png`
  - `p15-laporan.png`

## 6. Aturan tampilan (ringkas, lengkapnya di 08-DESIGN)
- Jam terpenting tampil paling besar (`display-time`). Rentang, sumber prediksi, dan ID tampil kecil.
- Satu layar, satu tugas. Satu tombol primary per layar. Aksi berbahaya disimpan di menu ⋯.
- Status selalu berupa teks + ikon, tidak hanya warna. Tidak ada emoji. Tidak ada em-dash di teks UI.
- Tidak ada kartu statistik dekoratif, gradasi, glassmorphism, atau label kecil di atas judul.
- Responsif di 375 / 768 / 1440 px tanpa scroll horizontal. Di bawah 768px, tabel antrean berubah jadi daftar baris.
- Aksesibilitas: kontras AA, focus terlihat, `lang="id"`, `aria-label` untuk ikon tanpa teks, `min-h-[100dvh]`.
- Jangan menampilkan alasan medis dokter di halaman pasien. Di P4, cukup "karena tindakan medis yang belum selesai".

## 7. Urutan kerja & definisi selesai
Kerjakan task **T1 sampai T10** di `docs/03-ARCHITECTURE.md` §6, dengan urutan sesuai `docs/06-WORKFLOW.md` §4. Perbarui `docs/04-TODO.md` setiap kali status berubah.

Fase 0 dianggap selesai kalau:
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`, dan `pnpm dlx knip` semuanya hijau.
- [ ] 5 halaman tampil sesuai skenario §4, dengan angka yang sama persis.
- [ ] 5 PNG ada di `docs/mockup/`.
- [ ] Checklist UI di 07-RULES §8 dan Anti tampilan AI A1-A11 di 08-DESIGN lulus.
- [ ] Laporan akhir sudah ditulis dengan format 07-RULES §10.

**Jangan mengerjakan Fase 1+** (database, auth, FastAPI, WhatsApp API) sebelum diminta.

Mulai dengan membaca dokumen di §3, lalu tuliskan rencana singkatmu untuk T1-T10 sebelum mengubah file.
