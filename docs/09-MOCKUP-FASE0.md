# 09 — Spesifikasi Mockup Fase 0

> Susunan tiap layar dari atas ke bawah. Data: `docs/seed/mockup-data.json` (snapshot 08.50, Senin 9 November 2026). Token & komponen: `docs/08-DESIGN.md`. Semua teks di bawah adalah teks UI final (tanpa em-dash).

## Arahan komponen dari pengguna, 5 November 2026
- Referensi tambahan: [Pantara](https://pantara.hadooyy.my.id/) dan dashboard `/dashboard`, untuk sidebar berkelompok, header ringkas, kartu membulat, tombol pil, serta hierarki panel operasional.
- Gunakan komponen frontend dari [21st.dev](https://21st.dev/) yang sesuai kebutuhan layar. Periksa sumber, lisensi, dan kebutuhan dependency setiap komponen sebelum mengadaptasinya. Sidebar Aceternity yang sudah diadaptasi di repo menjadi titik awal.
- Adaptasi komponen mengikuti token resmi `08-DESIGN.md`, identitas biru KapanDok, bahasa Indonesia, aksesibilitas, dan responsivitas. Efek dekoratif referensi tidak otomatis menjadi bagian desain KapanDok.
- Cakupan tetap frontend statis dengan data simulasi. Referensi ini tidak menambah halaman, backend, atau integrasi. Dependency di luar daftar yang disetujui tetap mengikuti aturan izin proyek.
- Sidebar memakai adaptasi Aceternity yang sudah ada; transisi CSS dipertahankan. Beranda menggunakan pola panel dan tombol yang sama tanpa dependency tambahan.

## P10 Hari ini (`/app`, desktop 1440)
1. **Rail kiri + bar atas** (08-DESIGN Components):
   - Rail: item aktif Hari ini, Tindak lanjut memakai badge 1.
   - Bar atas: pil cari, `sim-label`, dan pil akun "Rahmat Hidayat · Petugas poli".
   - **Susunan panel mengikuti grid bento di 08-DESIGN Layout. Urutan di bawah ini = isi panel, bukan tumpukan vertikal.**
2. **Header konten:**
   - Kiri: judul dua-warna "Senin, 9 November" (abu) di atas "Hari ini" (hitam).
   - Kanan: pil "Semua poli", pil "Diperbarui 08.50", dan pil grafit "Tindak lanjut (1)".
3. **Baris panel ringkas** (4 panel × 3 kolom; setiap panel adalah tautan, ikon panah kecil di kanan atas):
   - Sesi hari ini **5**, "2 terlambat · 1 batal".
   - Pasien terjadwal **90**, "di 5 poli".
   - Menunggu konfirmasi dokter **1**, "dr. Dewi Anggraini, dikirim 08.47".
   - Perlu tindak lanjut **1**, "1 pasien minta jadwal ulang".
4. **Grup "Perlu perhatian"** (judul `title` + ikon `CircleAlert`), berisi baris sesi:
   - **dr. Agus Prasetyo, Sp.B · Bedah · 13.00-16.00**
     - Badge danger "Batal".
     - Teks: "Operasi darurat. 9 dari 14 pasien sudah memilih slot pengganti".
     - Aksi baris: "Lihat 5 pasien".
   - **dr. Dewi Anggraini, Sp.A · Anak · 10.00-13.00**
     - Jam prediksi "10.20", rentang kecil "10.10-10.35".
     - Alasan: "Masih ada 6 pasien visite rawat inap".
     - Badge warning "Menunggu dokter", teks kecil "dikirim 08.47".
   - **dr. Rina Setyaningsih, Sp.PD · Penyakit Dalam · 09.00-13.00**
     - Jam prediksi "10.15", rentang "10.05-10.30".
     - Alasan: "Tindakan di OK 2 berjalan 40 menit melewati estimasi".
     - Badge warning "Terlambat 75 mnt" + teks "Dikonfirmasi dokter 08.41".
     - Progres: "17 dari 22 dibaca · 12 hadir".
5. **Panel "Sesi paling terdampak"** (4 kol, `panel-alt`):
   - Teks "dr. Rina Setyaningsih, mulai diperkirakan".
   - Jam besar biru "10.15" + tag "75 mnt".
   - "rentang 10.05-10.30 · dikonfirmasi dokter 08.41".
   - "12 dari 22 pasien konfirmasi hadir", lalu tag 17 dibaca, 5 belum dibaca, 1 jadwal ulang.
6. **Panel "Keterlambatan mulai per dokter"** (7 kol):
   - **Grafik bar standar** (bukan bar pil): sumbu Y "menit" 0-80, garis bantu putus-putus, label nilai di atas bar, semua bar `chart-1`.
   - Nilai: Bambang 5, Lestari 0, Rina 75, Dewi 20, Agus ditulis "Batal".
   - Chip di header panel: Hari ini (terpilih), 7 hari.
7. **Grup "Berjalan normal"** (5 kol):
   - **dr. Bambang Hartono, Sp.OG · Kebidanan dan Kandungan:** badge success "Sudah mulai 08.05".
   - **dr. Lestari Wulandari, Sp.M · Mata:** "09.30", rentang "09.25-09.40", badge success "Tepat waktu".
8. **Baris dapat diklik** menuju P11. Untuk mockup, cukup dr. Rina yang punya halaman detail.
9. **Mobile:** rail menjadi drawer, setiap baris sesi bertumpuk (dokter, jam, alasan, badge).

## P11 Detail sesi (`/app/sesi/s-pd-rina`, desktop 1440)
1. **Breadcrumb:** "Hari ini / dr. Rina Setyaningsih".
2. **Kepala sesi** (panel):
   - **Kiri:**
     - Nama dokter (`headline-md`), "Poli Penyakit Dalam · jadwal 09.00-13.00 · 22 pasien".
     - "Mulai" + **"10.15"** (`display-time`), lalu "rentang 10.05-10.30" kecil.
     - Alasan dalam kalimat.
     - Chip sumber: "Model" + "Dikonfirmasi dr. Rina 08.41".
   - **Kanan:**
     - Tombol primary **"Kirim ulang ke 5 pasien yang belum membaca"**.
     - Menu ⋯: Ubah jam mulai (M2), Konfirmasi atas nama dokter (M1), Batalkan praktik (M3).
3. **Ringkasan pesan** (satu baris teks + badge): 22 terkirim · 17 dibaca · 12 hadir · 1 jadwal ulang · 4 belum membalas · 5 belum dibaca.
4. **Tabel antrean** (lebar ±70%):
   - Kolom: No · Pasien · Jenis · Slot awal · Jam datang · Dipanggil · Status pesan.
   - 22 baris dari `antrean_rina`.
   - Slot awal tampil dicoret halus bila berbeda dari jam datang. Ini bukan warna merah, cukup `on-surface-muted` + garis.
   - Baris 12 (Ibu Sri Wahyuni) tidak diistimewakan.
   - Baris "jadwal ulang" memakai tautan "Tindak lanjut".
   - Filter cepat di atas tabel: Semua · Belum dibaca · Hadir · Jadwal ulang.
5. **Kolom kanan** (±30%): **Timeline sinyal**, urut dari atas:
   - 07.30 "Operasi di OK 2 dimulai (estimasi selesai 08.00)".
   - 08.00 "Operasi melewati estimasi".
   - 08.40 "Operasi berjalan 40 menit melewati estimasi".
   - 08.40 "Prediksi: mulai 10.15 (10.05-10.30), konfirmasi dikirim ke dokter".
   - 08.41 "dr. Rina: Sesuai prediksi".
   - 08.43 "22 pasien menerima jam datang baru".

   Warna titik timeline memakai `info`.
6. **Mobile:** timeline pindah ke bawah tabel; tabel menjadi daftar baris (nama, jam datang, status).

## P1 Cek jadwal dokter (`/jadwal`, mobile 390)
1. **Header:** "RS AR Fachrudin UMS" dan tautan "Kode booking", plus `sim-label` kecil.
2. **Judul** "Jadwal dokter hari ini" + "Senin, 9 November 2026 · diperbarui 08.50".
3. **Kolom cari** "Cari poli atau nama dokter" (input 44px).
4. **Daftar per dokter** (baris lapang, teks ≥ 16px):
   - Nama dokter, poli.
   - "Perkiraan mulai 10.15" (`title`, tabular) + "jadwal 09.00".
   - Status kecil: "Terlambat", "Tepat waktu", "Sudah mulai", atau "Praktik dibatalkan" (dr. Agus, danger).
   - Untuk pasien, alasan ditulis umum: "karena tindakan medis".
5. **Kotak tautan:** "Punya kode booking? Lihat jam datang Anda" → P3.
6. **Footer:** Bantuan · Kebijakan privasi.

## P4 Jam datang saya (`/k/KD-4812`, mobile 390)
1. **Header** sama seperti P1.
2. **Sapaan:** "Ibu Sri Wahyuni" + "Kode KD-4812".
3. **Blok utama:**
   - "Saran berangkat" + **"10.45"** (`display-time`).
   - Di bawahnya "Perkiraan dipanggil 11.30 · Nomor antrean 12".
4. **Detail** (daftar definisi):
   - Dokter: dr. Rina Setyaningsih, Sp.PD.
   - Poli: Penyakit Dalam.
   - Dokter diperkirakan mulai 10.15, karena tindakan medis yang belum selesai.
5. **Status:** badge success + ikon `CheckCheck` "Kehadiran tercatat pukul 08.46".
6. **Aksi:**
   - Tombol sekunder lebar penuh "Jadwal ulang". Tidak ada tombol primary, karena pasien sudah konfirmasi.
   - Tautan "Lokasi poli dan bantuan".
7. **Teks kecil:** "Diperbarui 08.44. Kami kabari lewat WhatsApp bila ada perubahan."

## P15 Laporan dampak (`/admin/laporan`, desktop 1440)
1. **Rail:** item aktif Laporan (grup Admin). Pil akun berganti: "Wulan Sari · Admin RS".
2. **Header:**
   - Judul "Laporan dampak" + pemilih periode (dropdown, nilai "Simulasi 300 sesi").
   - `sim-label`.
   - Catatan "Data simulasi (sintetis), bukan data rumah sakit".
3. **Baris 4 angka** (ukuran `headline-md`, bukan raksasa, masing-masing dengan pembanding):
   - "Rerata tunggu 16,8 menit" + "dari 35,5".
   - "Menunggu > 60 menit 4,6%" + "dari 20,2%".
   - "Cakupan interval 93,4%" + "target 90%".
   - "Galat prediksi 16,0 menit" + "MAE".
4. **Grafik bar standar** "Rerata tunggu per strategi":
   - Strategi: A Kondisi sekarang, B1 Reaktif ideal, B2 Reaktif realistis, C KapanDok.
   - **Satu seri saja:** rerata tunggu dalam menit (`chart-1`), sumbu Y "menit", garis bantu, label nilai di atas bar. Angka % > 60 menit cukup di panel angka dan tabel (satuan berbeda tidak digabung dalam satu grafik).
5. **Tabel strategi** (5 kolom dari `ringkasan.md`), bisa diurutkan.
6. **Catatan konsekuensi:** "Waktu dokter menganggur naik sekitar 13 menit per sesi; bobot dapat diatur di Pengaturan."

## P31 Asisten petugas (`/app/asisten`, desktop 1440)
Tambahan atas permintaan pengguna (12 Okt 2026). Data: `docs/seed/asisten-mockup.json` + `antrean_rina`.
1. **Judul:** "Asisten" + "Minta rekap atau aksi rutin dengan kalimat biasa. Data diambil dari sistem, aksi dijalankan setelah Anda setuju."
2. **Percakapan 08.51:** "Tolong rekap pasien dr. Rina hari ini yang belum konfirmasi hadir." → tabel **10 dari 22 pasien** (1 jadwal ulang, 4 dibaca belum membalas, 5 belum membaca), dihitung dari antrean, bukan diketik.
3. **08.52:** "Ibu Nur Hidayah minta jadwal ulang. Bisa dipindah? Dampaknya apa?" → 3 slot (Rabu 11 Nov 09.40 disarankan, Rabu 11.20, Jumat 13 Nov 09.10), efek ke antrean (antrean 21-22 maju sekitar 5 menit, di bawah ambang 10 menit), penanda dari data (kontrol, rujukan BPJS berlaku sampai 27 Nov, tanpa penanda prioritas dokter), catatan "penilaian kondisi medis tetap oleh dokter", kartu **Usulan U-0917** berlaku sampai 09.02.
4. **08.53:** "Oke, tolong jadwalkan." → struk "Sudah dijadwalkan": kunjungan pindah, WA tertahan sampai 08.58 (tombol batal), tindak lanjut selesai, log LA-0917.
5. **Samping:** "Yang bisa dikerjakan" (langsung, setelah disetujui, lewat menu sesi, tidak dikerjakan) + "Aksi asisten hari ini".
6. **Kolom tulis:** 3 contoh permintaan + tombol Kirim (pratinjau simulasi).

## Konsistensi lintas layar
- **Jam dan angka** harus sama dengan mockup WA (`docs/riset/lampiran-c/mockup_wa.png`):
  - Dokter menerima prediksi 08.40, konfirmasi 08.41, dan laporan pengiriman 08.43.
  - Pasien menerima pesan 08.44 dan menekan Hadir 08.46.
- **Nama tokoh contoh** (realistis, data simulasi): Rahmat Hidayat (petugas poli), Wulan Sari (admin RS).

## Perluasan mockup atas permintaan pengguna, 12 Oktober 2026
Menu yang sebelumnya berlabel Segera kini dapat dibuka: P28 Riwayat, P16 Dokter, P30 Poli, P18 Jadwal praktik, P19 Pengguna, P20 Pengaturan, P22 Mode demo. Ini perluasan presentasi Fase 0, bukan implementasi backend gelombang berikutnya. Form mengubah state lokal selama halaman terbuka; pemutar demo mengikuti timeline yang sama. Jadwal publik responsif desktop/mobile dengan pencarian, filter poli, dan kode booking. Data inti tidak berubah. Persona, timeline, dan nilai ambang terdokumentasi dipasok dari docs/seed/administrasi-mockup.json melalui data:sync.

## P0 Beranda demo (`/`)
Pembuka presentasi dengan identitas KapanDok, label Data simulasi, tautan dashboard petugas dan jadwal publik, pratinjau sesi dr. Rina serta jam datang KD-4812, alur tiga langkah, dan akses laporan. Semua angka berasal dari seed. Responsif 375/768/1440; tanpa pengiriman pesan nyata.
