# 01 — PRD: KapanDok

> Apa yang dibangun, untuk siapa, dan kenapa. Turunan dari 00-BRIEF. Status: Draf — menunggu ACC
> Fase 0 (sekarang) hanya membangun **mockup statis 5 layar** (lihat §7 F0 dan 03-ARCHITECTURE §6). Seluruh isi lain menggambarkan produk utuh untuk fase berikutnya.

## 1. Pitch Satu Kalimat
Untuk pasien rawat jalan dan petugas poli yang kerepotan karena jadwal dokter berubah hampir setiap hari, KapanDok adalah sistem jadwal berbasis AI yang memprediksi jam mulai praktik dokter dan memberi setiap pasien jam datang pribadi lewat WhatsApp, tidak seperti notifikasi antrean biasa yang baru bereaksi setelah dokter atau petugas mengabari.

## 2. Masalah, Pengguna, dan Nilai
- **Pengguna utama & pekerjaannya:**
  - **Petugas poli** (pendaftaran/layanan pelanggan): mengabari pasien setiap kali jadwal dokter berubah. Saat ini manual lewat WhatsApp setelah dokter konfirmasi [riset: balasan mitra].
  - **Pasien rawat jalan** (termasuk lansia, peserta JKN): ingin tahu jam berapa harus berangkat supaya tidak menunggu lama.
- **Stakeholder lain:** dokter (memberi konfirmasi satu ketukan via WA), admin/manajemen RS (mengatur data, membaca laporan mutu waktu tunggu), juri hackathon.
- **Value proposition:**
  - **Sebelum:** jadwal berubah hampir setiap hari, kabar dikirim manual satu per satu. Di RS Tipe C Depok rerata tunggu 86 menit (standar ≤60) [riset: Jurnal Promotif Preventif 2026], dan audit klinik di Inggris mencatat hanya sekitar 50% pasien diberi tahu sesuai protokol [riset: PMC8769270].
  - **Bagaimana:** prediksi jam mulai dari sinyal RS → konfirmasi dokter satu ketukan → optimasi jam datang seluruh antrean → WA otomatis dengan tombol Hadir/Jadwal ulang.
  - **Sesudah:** pada simulasi data sintetis, rerata tunggu turun dari 35,5 menjadi 16,8 menit dan pasien yang menunggu > 60 menit turun dari 20,2% menjadi 4,6% [riset: `docs/riset/lampiran-c/ringkasan.md`, data simulasi].
- **Alternatif saat ini & kelemahannya:**
  - WA manual oleh petugas: lambat, tidak semua pasien terkabari, tidak ada pelacakan baca/balas.
  - Mobile JKN (antrean online): bergantung pada RS memperbarui jadwal, tidak memprediksi keterlambatan.
  - Chup (RSUD Bakti Pajajaran), Siagga, chatbot WA klinik: reaktif, perubahan diinput admin.
  - Phreesia, Waitly AI (AS): isi slot batal, tidak ada di Indonesia, tidak memprediksi keterlambatan dokter.
- **Ukuran keberhasilan (uji coba):** rerata tunggu menuju ≤60 menit; ≥90% pasien terdampak menerima kabar sebelum berangkat; MAE prediksi jam mulai ≤15 menit; cakupan interval 90% tercapai; ≥30% slot batal terisi ulang [asumsi target, dari proposal].

## 3. Strategi — Startup Canvas
| # | Bagian | Isi |
|---|---|---|
| 1 | Vision | Tidak ada pasien yang berangkat terlalu awal atau menunggu tanpa kabar karena jadwal dokter berubah. |
| 2 | Segmen utama & JTBD | **Rumah sakit tipe C/B dengan poli spesialis yang ramai** (mulai dari RS AR Fachrudin UMS). JTBD petugas: "kabari semua pasien yang terdampak dengan benar tanpa menghabiskan pagi saya". Segmen ini dulu karena masalahnya terkonfirmasi mitra dan jejaring RS Muhammadiyah memudahkan perluasan. |
| 3 | Pembeda | Memprediksi sebelum ada yang melapor (sinyal operasi/visite) + optimasi jam datang per pasien + interval prediksi yang terkalibrasi (conformal). Sistem-agnostik terhadap vendor SIMRS. |
| 4 | Relative costs | Murah: memakai WhatsApp yang sudah dimiliki pasien, tanpa aplikasi baru. Nilai unik: model yang dilatih pada pola dokter di RS itu sendiri. |
| 5 | Trade-off | Tidak membuat SIMRS, tidak membuat aplikasi mobile pasien, tidak menangani telemedicine atau pembayaran. |
| 6 | Key metrics | North Star: **persentase pasien terdampak yang menerima jam datang baru sebelum berangkat**. Pendukung: rerata tunggu, % > 60 menit, MAE prediksi, tingkat konfirmasi pasien. |
| 7 | Growth / GTM | Sales-led ke manajemen RS (pembeli) melalui pilot di RS AR Fachrudin, lalu jejaring RS Muhammadiyah/'Aisyiyah. Pengguna harian: petugas poli. |
| 8 | Capabilities | Bangun sendiri: model prediksi, optimizer, web. Partner: WhatsApp Business (Meta), integrasi SIMRS lewat API/FHIR. |
| 9 | Can't/Won't | Vendor SIMRS besar fokus ke modul klinis dan billing; aplikasi antrean nasional tidak punya akses sinyal operasional per RS. |

**Model bisnis:**
- **Struktur biaya:** hosting web + layanan model (kecil, recurring), biaya pesan WhatsApp Business per pesan template (mengikuti tarif Meta, cek terbaru), pendampingan implementasi per RS.
- **Pendapatan & pricing:** langganan per poli per bulan, contoh **Rp500 ribu/poli/bulan** [asumsi]. RS dengan 8 poli: Rp4 juta/bulan.
- **ROI pelanggan:** perubahan jadwal hampir setiap hari × ±22 pasien × ±2 menit per pesan manual ≈ 15 jam kerja petugas per poli per bulan [asumsi: 22 hari kerja] ditambah turunnya keluhan waktu tunggu (indikator mutu nasional). Harga dibuat lebih rendah dari biaya waktu petugas yang dihemat.

**Hipotesis berisiko:**
| # | Hipotesis | Cara dibuktikan |
|---|---|---|
| H1 | Sinyal operasional (status OK, visite) tersedia dan bisa dibaca dari SIMRS mitra | Bahas saat pembekalan; fallback: riwayat jam mulai + konfirmasi dokter |
| H2 | Dokter mau menekan satu tombol WA saat diminta | Uji 3-5 dokter; ukur tingkat respons dan waktu respons |
| H3 | Pasien membaca dan membalas pesan WA sebelum berangkat | Ukur status dibaca/dibalas saat uji coba 1-2 poli |

### 3b. Kartu Contekan Bisnis

**Ide dalam 3 kalimat:** Petugas poli repot mengabari puluhan pasien setiap kali dokter telat atau batal, padahal itu terjadi hampir setiap hari. Akibatnya pasien datang terlalu awal dan menunggu lama. KapanDok menebak jam mulai dokter lebih awal dari sinyal rumah sakit, lalu mengirim jam datang yang pas ke setiap pasien lewat WhatsApp secara otomatis.

**Cara menghasilkan uang:** rumah sakit berlangganan per poli per bulan.

**Angka kunci:**
| Angka | Nilai | Sumber | Cara menghitung |
|---|---|---|---|
| Harga | Rp500 ribu/poli/bulan | asumsi | Di bawah biaya waktu petugas yang dihemat |
| Waktu petugas dihemat | ±15 jam/poli/bulan | asumsi | 22 hari × 22 pasien × 2 menit ÷ 60 |
| Penurunan rerata tunggu | 35,5 → 16,8 menit | simulasi (data sintetis) | `docs/riset/lampiran-c/ringkasan.md` |
| Akurasi prediksi | cakupan 93,4%, MAE 16 menit | simulasi (data sintetis) | 1.000 hari uji sintetis |

**Kalau ditanya hal yang tidak kamu tahu:** "Itu asumsi kami berdasarkan simulasi dan literatur; langkah berikutnya adalah memvalidasinya dengan data historis anonim RS AR Fachrudin saat uji coba."

**Kamus istilah:**
| Istilah | Artinya |
|---|---|
| MVP | Versi paling sederhana yang sudah bisa dipakai dan menguji ide |
| North Star metric | Satu angka utama yang paling menunjukkan produk memberi nilai |
| ROI | Uang/waktu yang dihemat pelanggan dibanding biaya yang dia bayar |
| GTM | Cara produk sampai ke pembeli: channel, harga, penjualan |
| SIMRS | Sistem Informasi Manajemen Rumah Sakit |
| Rawat jalan / poli | Layanan pasien yang datang, diperiksa, lalu pulang di hari yang sama |
| Visite | Kunjungan dokter ke pasien rawat inap, biasanya sebelum praktik poli |
| OK | Kamar operasi |
| No-show | Pasien yang tidak datang tanpa membatalkan |
| Interval prediksi 90% | Rentang jam yang 90% kemungkinan memuat jam mulai sebenarnya |
| Conformal prediction | Metode statistik yang menjamin interval prediksi benar sesuai persentase yang dijanjikan |
| Optimasi stokastik | Mencari jadwal terbaik dengan memperhitungkan banyak kemungkinan kejadian sekaligus |
| HL7 FHIR | Standar pertukaran data kesehatan yang dipakai SATUSEHAT |
| TKT | Tingkat Kesiapterapan Teknologi (1-9) |

## 4. Alur Inti
1. **Sinyal masuk:** sistem membaca jadwal praktik dan sinyal operasional (status operasi, sisa visite, riwayat) setiap beberapa menit.
2. **Prediksi:** Model 1 menghasilkan jam mulai + rentang 90% per sesi dokter. Bila rentang terlalu lebar atau sinyal kurang 60 menit sebelum praktik, dokter diminta konfirmasi lewat WA (satu ketukan).
3. **Optimasi:** Model 2-3 menghitung jam datang setiap pasien di antrean.
4. **Kabar ke pasien:** WA otomatis berisi jam datang, perkiraan dipanggil, saran berangkat, tombol Hadir/Jadwal ulang. Bila batal: tawaran slot pengganti.
5. **Pantau & tindak lanjut:** petugas melihat status setiap pasien (terkirim/dibaca/hadir/jadwal ulang) di dashboard, dan menangani yang belum merespons atau minta jadwal ulang.

## 5. Peta Halaman
> Satu halaman, satu tugas. Kolom **Fase 0** = masuk mockup proposal.

**Peran:** tamu/pasien (tanpa login) · petugas poli · admin RS · (dokter hanya lewat WA) · **Total:** 31 halaman + 5 modal — Must 8 · Should 18 · Could 5

### 5a. Daftar halaman
| # | Halaman | Rute | Peran | Tugas | Info utama (besar) | Info pendukung (kecil) | Aksi utama | Aksi sekunder (menu ⋯) | State khusus | Prioritas | Fase 0 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Publik** |||||||||||
| P1 | Cek jadwal dokter | `/jadwal` | tamu | Melihat dokter yang praktik hari ini dan perkiraan jam mulainya | Nama dokter, poli, perkiraan mulai | Jadwal resmi, rentang, waktu pembaruan | Cari poli/dokter | Lihat minggu ini | kosong (tidak ada praktik), batal, loading, error | Must | ✅ |
| P2 | Detail jadwal dokter | `/jadwal/[dokter]` | tamu | Melihat jadwal dokter 7 hari | Hari & jam praktik | Status hari ini | Kembali ke daftar | — | libur, kosong | Should | |
| P3 | Masukkan kode booking | `/cek` | tamu | Membuka jam datang pribadi tanpa link WA | Kolom kode | Contoh format `KD-4812` | Lihat jam datang | — | kode salah, kedaluwarsa | Must | |
| P4 | Jam datang saya | `/k/[kode]` | tamu (pemegang kode) | Tahu kapan harus berangkat | Saran berangkat, perkiraan dipanggil | Antrean, dokter, poli, alasan umum keterlambatan | Hadir pada jam ini | Jadwal ulang · Lokasi poli & bantuan (P26) | sesi batal, sudah dilayani, kode tidak valid | Must | ✅ |
| P5 | Pilih slot pengganti | `/k/[kode]/jadwal-ulang` | tamu (pemegang kode) | Memilih jadwal baru | 2-3 slot tersedia | Dokter alternatif | Pilih slot | Hubungi petugas | slot habis | Should | |
| P6 | Kebijakan privasi | `/privasi` | semua | Memahami penggunaan data | Data apa dipakai dan untuk apa | Kontak RS | — | — | — | Should | |
| P26 | Bantuan pasien | `/bantuan` | tamu | Menjawab "kenapa jam saya berubah?", lokasi poli, cara jadwal ulang | Jawaban singkat per pertanyaan, denah/lokasi poli | Kontak pendaftaran | Hubungi pendaftaran (tel:) | — | — | Should | |
| **Akun** |||||||||||
| P7 | Masuk | `/masuk` | tamu | Petugas/admin masuk | Email, password | Nama RS | Masuk | Lupa password | kredensial salah, terkunci | Must | |
| P8 | Lupa password | `/lupa-password` | tamu | Reset password | Kolom email | — | Kirim tautan | — | email tidak dikenal (pesan netral) | Could | |
| P9 | Profil & keamanan | `/akun` | petugas, admin | Ubah password | Nama, email | Peran | Simpan | Keluar | — | Could | |
| **Inti (petugas)** |||||||||||
| P10 | Hari ini | `/app` | petugas, admin | Melihat sesi dokter hari ini dan mana yang butuh perhatian | Jam mulai prediksi per sesi + alasan | Rentang, status konfirmasi dokter, progres pesan | Buka sesi | Kirim ulang ke yang belum membaca | tidak ada sesi, sinyal SIMRS terputus | Must | ✅ |
| P11 | Detail sesi | `/app/sesi/[id]` | petugas, admin | Memantau antrean satu dokter | Jam mulai prediksi, daftar pasien dengan jam datang & status | Riwayat prediksi, sinyal yang dipakai | Konfirmasi atas nama dokter | Ubah jam mulai · Batalkan praktik · Kirim ulang | menunggu konfirmasi, batal, data pasien kosong | Must | ✅ |
| P12 | Tindak lanjut | `/app/tindak-lanjut` | petugas, admin | Menangani pasien yang minta jadwal ulang atau belum merespons | Nama, masalah, sejak kapan | Kontak, sesi | Tandai selesai | Telepon · Kirim ulang | kosong (semua beres) | Must | |
| P13 | Pasien hari ini | `/app/pasien` | petugas, admin | Mencari satu pasien | Nama, jam datang, status | Kode booking, poli | Buka sesi pasien | Salin kode | tidak ditemukan | Should | |
| P14 | Riwayat pesan | `/app/pesan` | petugas, admin | Audit pesan yang terkirim | Penerima, isi, status | Waktu, template | Filter | Ekspor CSV | kosong | Could | |
| P31 | Asisten petugas | `/app/asisten` | petugas, admin | Meminta rekap, analisis jadwal ulang, dan aksi rutin lewat kalimat biasa | Jawaban berupa tabel atau kartu dari data sistem; struk aksi yang sudah dijalankan | Fungsi yang dipanggil ("Membaca antrean dr. Rina"), batas kemampuan asisten | Kirim pertanyaan / perintah | Batalkan aksi (selama WA masih tertahan) · Buka sesi terkait | usulan kedaluwarsa, data berubah sejak usulan, aksi di luar hak akses, asisten tidak tersedia (fallback ke menu biasa) | Should | ✅ |
| P28 | Riwayat sesi | `/app/riwayat` | petugas, admin | Membuka sesi hari sebelumnya | Tanggal, dokter, jam mulai prediksi vs aktual | Selisih menit, jumlah pasien | Pilih tanggal | — | tidak ada sesi di tanggal itu | Should | |
| **Admin** |||||||||||
| P15 | Laporan dampak | `/admin/laporan` | admin | Melihat apakah waktu tunggu membaik | Rerata tunggu, % > 60 menit (tren) | Cakupan interval, MAE, tingkat konfirmasi | Pilih periode | Ekspor | data belum cukup | Should | ✅ |
| P16 | Dokter | `/admin/dokter` | admin | Mengelola daftar dokter | Nama, poli, nomor WA | Status aktif | Tambah dokter | Nonaktifkan | kosong | Should | |
| P17 | Form dokter | `/admin/dokter/baru`, `/admin/dokter/[id]/ubah` | admin | Menambah/mengubah dokter | Nama, poli, nomor WA | Kebiasaan sinyal | Simpan | Hapus (konfirmasi) | validasi nomor | Should | |
| P18 | Poli & jadwal praktik | `/admin/jadwal` | admin | Mengatur jadwal mingguan | Grid hari × jam per dokter | Kuota pasien | Simpan jadwal | Salin minggu | bentrok jadwal | Should | |
| P19 | Pengguna | `/admin/pengguna` | admin | Mengelola akun petugas | Nama, peran | Terakhir masuk | Tambah pengguna (modal) | Reset password · Nonaktifkan | kosong | Should | |
| P20 | Pengaturan sistem | `/admin/pengaturan` | admin | Mengatur ambang dan template pesan | Ambang lebar rentang, jam kirim, bobot tunggu vs dokter menganggur | Template WA | Simpan | Kembalikan default | nilai di luar batas | Should | |
| P21 | Integrasi | `/admin/integrasi` | admin | Memantau koneksi SIMRS & WhatsApp | Status adapter, sinkron terakhir | Log error | Uji koneksi | — | terputus | Could | |
| P29 | Detail dokter | `/admin/dokter/[id]` | admin | Melihat pola ketepatan waktu dokter dan jadwalnya | Rerata terlambat per hari, tren 30 hari | Poli, nomor WA, jadwal mingguan | Ubah data (P17) | Nonaktifkan | riwayat belum cukup | Should | |
| P30 | Poli | `/admin/poli` | admin | Mengelola daftar poli | Nama poli, jumlah dokter | Lokasi/lantai (dipakai P26) | Tambah poli (modal M5) | Ubah · Nonaktifkan | kosong | Should | |
| P27 | Log aktivitas | `/admin/log` | admin | Audit siapa mengubah apa | Waktu, pengguna, aksi, objek | Nilai sebelum/sesudah | Filter | Ekspor CSV | kosong | Could | |
| P22 | Mode demo | `/admin/demo` | admin | Memutar satu sesi praktik dipercepat untuk juri | Timeline, jam simulasi, peristiwa | Kecepatan | Mulai demo | Atur ulang | sedang berjalan | Should | |
| **Sistem** |||||||||||
| P23 | Tidak ditemukan | `/404` | semua | Kembali ke halaman benar | Pesan singkat | — | Ke beranda | — | — | Should | |
| P24 | Galat server | `/500` | semua | Memberi tahu dan menyarankan coba lagi | Pesan singkat | Kode galat | Coba lagi | — | — | Should | |
| P25 | Akses ditolak | `/403` | petugas | Menjelaskan halaman khusus admin | Pesan singkat | Peran saat ini | Kembali | — | — | Must | |

### 5b. Struktur navigasi
- **Publik (pasien):** header sederhana dengan nama RS + "Cek jadwal" + "Kode booking" + "Bantuan"; footer: Kebijakan privasi. Halaman `/k/[kode]` dibuka dari link WA.
- **Menu utama petugas (sidebar):** Hari ini · Asisten · Tindak lanjut (dengan jumlah) · Pasien · Riwayat.
- **Menu admin (kelompok terpisah di sidebar, hanya admin):** Laporan · Dokter · Poli · Jadwal praktik · Pengguna · Pengaturan · Mode demo.
- **Menu akun (kartu akun di bawah sidebar):** Profil & keamanan · Keluar.
- **Hanya lewat tautan/aksi:** Detail sesi, Detail & form dokter, Pilih slot pengganti, Integrasi dan Log aktivitas (dari Pengaturan), Riwayat pesan (dari Detail sesi).

### 5c. Matriks entitas
| Entitas | Daftar | Detail | Buat | Ubah | Hapus | Catatan |
|---|---|---|---|---|---|---|
| Poli | P30 | P30 (baris) | M5 | M5 | nonaktifkan di P30 | Lokasi dipakai P26 |
| Dokter | P16 | P29 | P17 | P17 | nonaktifkan di P29 | Tidak dihapus permanen (riwayat) |
| Jadwal praktik | P18 | P18 | P18 | P18 | P18 | Template mingguan |
| Sesi praktik | P10 | P11 | otomatis dari jadwal | P11 (ubah jam / batal) | — | Instance harian |
| Kunjungan/booking | P11, P13 | P4 (pasien) | impor dari SIMRS | P5 (jadwal ulang) | — | Dibuat oleh sistem |
| Pesan | P14 | P11 | otomatis | — | — | Log tidak dihapus |
| Prediksi & sinyal | P28 (ringkas) | P11 (timeline) | otomatis | M2 (koreksi manual) | — | Setiap koreksi tercatat di P27 |
| Log aktivitas | P27 | P27 (baris) | otomatis | — | — | Hanya baca |
| Tindak lanjut | P12 | P12 | otomatis | P12, P31 | tandai selesai | |
| Usulan aksi asisten | P27 (tercatat) | P31 (kartu usulan) | P31 (dibuat fungsi, bukan LLM) | — | kedaluwarsa 10 menit / dibatalkan | Satu usulan = satu perubahan persis; dijalankan hanya setelah konfirmasi petugas |
| Pengguna | P19 | modal P19 | modal P19 | modal P19 | nonaktifkan | |
| Pengaturan | — | P20 | — | P20 | — | Satu baris |

### 5d. Modal & dialog
| # | Modal | Dibuka dari | Isi | Aksi | Catatan |
|---|---|---|---|---|---|
| M1 | Konfirmasi atas nama dokter | P11 | Prediksi saat ini + pilihan "Sesuai prediksi" | Konfirmasi | Hanya bila dokter menelepon/memberi tahu langsung; tercatat di P27 |
| M2 | Ubah jam mulai | P11 ⋯ | Pilihan cepat +15 / +30 / +60 menit + input jam manual; pratinjau "22 pasien akan menerima jam datang baru" | Simpan & kirim | Konsekuensi terlihat sebelum aksi |
| M3 | Batalkan praktik | P11 ⋯ | Alasan (opsional, tidak dikirim ke pasien), "22 pasien akan ditawari slot pengganti" | Batalkan praktik (danger) | Konfirmasi dua langkah |
| M4 | Tambah/ubah pengguna | P19 | Nama, email, peran | Simpan | Password sementara dikirim ke email |
| M5 | Tambah/ubah poli | P30 | Nama, lokasi/lantai | Simpan | — |

### 5e. Alur antar halaman (dibuka dari → lanjut ke)
| # | Dibuka dari | Lanjut ke |
|---|---|---|
| P1 | URL langsung, P26, link di WA | P2, P3 |
| P2 | P1 | P1 |
| P3 | P1, header publik | P4 |
| P4 | Link di WA, P3 | P5, P26 |
| P5 | P4 ("Jadwal ulang"), link WA saat praktik batal | P4 (slot baru) |
| P6 | Footer publik, P7 | — |
| P7 | URL, P8 | P10 |
| P8 | P7 | P7 |
| P9 | Kartu akun | — |
| P10 | P7, sidebar | P11, P12 |
| P11 | P10, P13, P28, P31 | M1, M2, M3, P12, P14 |
| P12 | Sidebar (badge), P10, P11 | P11 |
| P13 | Sidebar | P11 |
| P14 | P11 | — |
| P15 | Sidebar admin | — |
| P16 | Sidebar admin | P29, P17 |
| P17 | P16 ("Tambah"), P29 ("Ubah") | P29 |
| P18 | Sidebar admin, P29 | — |
| P19 | Sidebar admin | M4 |
| P20 | Sidebar admin | P21, P27 |
| P21 | P20 | — |
| P22 | Sidebar admin | P10 (melihat demo berjalan) |
| P23-P25 | Sistem | P10 atau P1 |
| P26 | Header publik, P4 | P1, P3 |
| P27 | P20 | — |
| P28 | Sidebar | P11 |
| P29 | P16 | P17, P18 |
| P30 | Sidebar admin | M5 |
| P31 | Sidebar | P11 (tautan di jawaban), P12, P27 |

### 5f. Halaman untuk demo day vs uji coba RS
> Semua halaman punya fungsi, tetapi hackathon hanya 3 hari. **Gelombang 1 (demo day)** wajib berfungsi dengan data nyata dari sistem karena muncul di script demo (05-PITCH §2) atau menjawab langsung kriteria demo (pedoman hlm. 13). **Gelombang 2 (uji coba RS sampai April 2027)** dibutuhkan agar RS bisa memakai sistem sehari-hari, tetapi tidak dilihat juri.

| Gelombang | Halaman | Fungsi nyata | Kriteria demo yang dijawab |
|---|---|---|---|
| 1 | P22 Mode demo | Memutar satu sesi dengan peristiwa nyata (operasi molor, batal) dan WA asli | Fungsionalitas 25% |
| 1 | P10 Hari ini | Petugas tahu sesi mana yang butuh perhatian | Fungsionalitas, kesesuaian masalah-solusi 20% |
| 1 | P11 Detail sesi + M1-M3 | Memantau antrean, status baca/balas, koreksi manual | Fungsionalitas, kesesuaian masalah-solusi |
| 1 | P12 Tindak lanjut | Menangani pasien yang minta jadwal ulang atau belum membaca (arahan mitra: konfirmasi & pelacakan respons) | Kesesuaian masalah-solusi |
| 1 | P4 Jam datang + P5 Slot pengganti | Pasien melihat jam datang dan memilih slot saat dokter batal | Fungsionalitas, dampak 15% |
| 1 | P1 Cek jadwal | Inti tantangan RS-01: "pasien memperoleh informasi jadwal dokter" | Kesesuaian masalah-solusi |
| 1 | P15 Laporan | Bukti dampak (waktu tunggu, akurasi) | Dampak, inovasi 15% |
| 1 | P20 Pengaturan | Menunjukkan manusia tetap memegang kendali (ambang, bobot) | Inovasi, kesiapan hilirisasi 10% |
| 1 | P21 Integrasi | Menunjukkan adapter SIMRS sistem-agnostik (arahan mitra) | Hilirisasi, komponen lokal & KI 10% |
| 1 | P31 Asisten petugas (setelah alur inti jalan) | Rekap, analisis jadwal ulang, jadwalkan ulang 1 pasien, kirim ulang WA lewat chat; semua aksi tercatat | Inovasi 15%, kesesuaian masalah-solusi (arahan mitra: perubahan hampir harian, notifikasi manual) |
| 1 | P7 Masuk + P25 Akses ditolak | Akses aman per peran | Prasyarat (pertanyaan privasi juri) |
| 2 | P3 Kode booking | Pasien tanpa link WA | — |
| 2 | P26 Bantuan, P6 Privasi | Kepercayaan pasien, kepatuhan UU PDP | (P6 dapat ditunjukkan bila juri bertanya privasi) |
| 2 | P16, P17, P29 Dokter | Admin mengelola dokter; pola ketepatan waktu | — |
| 2 | P18 Jadwal praktik, P30 Poli | Data dasar jadwal (saat demo cukup dari seed/adapter) | — |
| 2 | P19 Pengguna + M4 | Kelola akun petugas | — |
| 2 | P13 Pasien hari ini | Menjawab pasien yang menelepon | — |
| 2 | P28 Riwayat sesi, P27 Log, P14 Riwayat pesan | Audit dan evaluasi harian | — |
| 2 | P2, P8, P9, P23, P24 | Halaman standar aplikasi | — |

**Aturan:** gelombang 2 tidak dikerjakan sebelum semua halaman gelombang 1 berfungsi end-to-end. Saat hackathon, menu gelombang 2 boleh tampil non-aktif ("Segera") agar juri melihat cakupan produk tanpa halaman setengah jadi.

**Cek kelengkapan:** setiap entitas punya cara dilihat/dibuat/diubah/dinonaktifkan (Kunjungan dan Pesan dibuat sistem, alasannya di 5c); setiap peran punya halaman awal (tamu P1, petugas & admin P10); setiap aksi di 5a menuju halaman atau modal yang ada; tidak ada halaman yatim.

## 6. Titik Keputusan AI
> AI inti KapanDok = model statistik/ML (Model 1-2) + optimasi (Model 3): model menghasilkan angka, **kode yang memutuskan** dengan ambang di tabel pengaturan. **LLM hanya dipakai di P31 Asisten petugas** sebagai lapisan percakapan: memahami permintaan, memilih fungsi, dan menjelaskan hasil. LLM tidak menyimpan data, tidak menghitung, dan tidak memutuskan. Pola: `docs/AI-PRIMITIVES.md`.

| Keputusan fuzzy | Keluaran model | Kode yang memutuskan |
|---|---|---|
| Kapan dokter benar-benar mulai? | Model 1: median + interval 90% (kuantil + conformal) | `if lebar_rentang > AMBANG_LEBAR (default 30 mnt) or tidak ada sinyal pada T-60 → kirim WA konfirmasi ke dokter; else pakai median` |
| Berapa lama tiap pasien dan siapa yang mungkin tidak datang? | Model 2: durasi per jenis kunjungan, p(no-show) | Hanya masukan optimizer; tidak menampilkan "pasien ini akan tidak datang" ke siapa pun |
| Jam datang tiap pasien? | Model 3: jadwal dari SAA | `if |jam_baru - jam_lama| ≥ AMBANG_UBAH (default 10 mnt) → kirim pembaruan`; jam datang tidak pernah lebih awal dari slot awal |
| Pasien minta jadwal ulang | — (aturan) | Tawarkan 3 slot; `if tidak memilih dalam 30 mnt → masuk Tindak lanjut` |
| Petugas minta sesuatu lewat asisten (P31) | LLM: *choice* fungsi + argumen (structured output) | Kode memeriksa hak akses peran dan validitas argumen; fungsi tidak dikenal atau di luar hak → ditolak dengan alasan |
| Dampak jadwal ulang satu pasien | — (fungsi `analisis_jadwal_ulang`, deterministik) | Slot dari jadwal dokter; efek ke antrean dihitung Model 3; penanda risiko dari data pendaftaran (jenis kunjungan, masa berlaku rujukan BPJS, penanda prioritas dari dokter). **LLM tidak pernah menilai kondisi medis atau "pasien kritis".** |
| Aksi yang mengubah data | — (fungsi `usulkan_*` lalu `jalankan_usulan`) | Usulan berisi perubahan persis + jumlah terdampak; dijalankan hanya bila pesan petugas berikutnya mengonfirmasi usulan itu, belum kedaluwarsa (10 mnt), dan data belum berubah sejak usulan dibuat. Aksi besar (batal praktik, kirim massal > 5 pasien) tidak tersedia lewat asisten: asisten mengarahkan ke M2/M3 |

**LLM generatif:** hanya di P31 untuk kalimat penjelas. Tabel dan struk aksi dirender web dari hasil fungsi, bukan ditulis LLM, sehingga angka tidak bisa dikarang. Teks WA tetap memakai template yang disetujui Meta dengan variabel terstruktur. Balasan teks bebas pasien tidak pernah diteruskan ke LLM sebagai perintah (cegah prompt injection).

## 7. Fitur
| # | Fitur | Prioritas | Alur / halaman | Kriteria terima |
|---|---|---|---|---|
| F0 | **Mockup statis Fase 0** | Must (sekarang) | P10, P11, P1, P4, P15 | 5 layar statis dari `docs/seed/mockup-data.json`, label "Data simulasi", konsisten dengan mockup WA, screenshot PNG 1440 px (desktop) dan 390 px (mobile) |
| F1 | Prediksi jam mulai per sesi | Must | Alur 2 / P10, P11 | Median + rentang tampil, diperbarui saat sinyal berubah, alasan dalam kalimat biasa |
| F2 | Konfirmasi dokter via WA | Must | Alur 2 | Dokter menerima pesan 3 tombol; balasan tercatat < 5 detik di P11 |
| F3 | Optimasi jam datang | Must | Alur 3 / P11 | Jam datang tiap pasien terhitung; tidak lebih awal dari slot awal; perubahan < 10 mnt tidak dikirim |
| F4 | WA pasien + konfirmasi dua arah | Must | Alur 4 / P4 | Pesan berisi jam datang, dipanggil, saran berangkat, tombol Hadir/Jadwal ulang; status terkirim/dibaca/dibalas tercatat |
| F5 | Dashboard hari ini & detail sesi | Must | Alur 5 / P10, P11 | Petugas melihat sesi yang butuh perhatian di atas; status pesan per pasien |
| F6 | Tindak lanjut | Must | Alur 5 / P12 | Pasien jadwal ulang/belum merespons muncul otomatis; bisa ditandai selesai |
| F7 | Cek jadwal publik & jam datang via kode | Must | P1, P3, P4 | Bisa dibuka di HP 360 px tanpa login; kode salah memberi pesan jelas |
| F8 | Login petugas/admin + peran | Must | P7, P25 | Petugas tidak bisa membuka `/admin/*` |
| F9 | Slot pengganti saat batal / jadwal ulang | Should | P5 | 3 slot ditawarkan; slot yang diambil pasien lain hilang |
| F10 | Laporan dampak | Should | P15 | Rerata tunggu, % > 60 mnt, cakupan interval, MAE, tingkat konfirmasi per periode |
| F11 | Kelola dokter, jadwal, pengguna, pengaturan | Should | P16-P20 | CRUD dengan validasi; ambang tersimpan dan dipakai sistem |
| F12 | Mode demo | Should | P22 | Satu sesi diputar 30× lebih cepat; WA asli terkirim ke nomor uji |
| F13 | Adapter SIMRS sistem-agnostik | Should | P21 | Kontrak data via API/FHIR; adapter dummy untuk data simulasi |
| F14 | Riwayat pesan + ekspor CSV | Could | P14 | Filter per sesi/status |
| F15 | Pengingat H-1 otomatis | Could | — | Kirim pengingat malam sebelumnya (fitur kecil bernilai besar) |
| F16 | Mode teks besar di halaman pasien | Could | P1, P4 | Tombol perbesar teks untuk lansia |
| F17 | Asisten petugas (agen percakapan) | Should | P31 | Rekap antrean tampil sebagai tabel dari data sistem; analisis jadwal ulang menampilkan 3 slot, efek ke antrean, dan penanda dari data; "jadwalkan" mengubah kunjungan, mengirim WA setelah jeda batal 5 menit, menandai tindak lanjut selesai, dan tercatat di P27; 0 aksi tanpa konfirmasi pada eval; jawaban "sudah" hanya muncul bila fungsi melapor berhasil |

## 8. Di Luar Scope
- SIMRS, rekam medis, billing, klaim BPJS, telemedicine.
- Aplikasi mobile native (pasien cukup WA + web).
- Halaman web untuk dokter (dokter hanya lewat WA).
- Chatbot untuk pasien dan percakapan bebas di luar data KapanDok.
- LLM yang menilai kondisi medis, menentukan prioritas klinis, atau menjalankan aksi tanpa konfirmasi petugas.
- Data pasien asli sebelum ada izin mitra.

## 9. Riwayat Perubahan
| Tanggal | Perubahan |
|---|---|
| 2026-10-12 | Dokumen awal |
| 2026-10-12 | Tambah P31 Asisten petugas dan F17 (LLM sebagai lapisan percakapan), atas permintaan pengguna |

## Tambahan mockup atas permintaan pengguna (12 Oktober 2026)
Dashboard ringkasan tersedia di `/app/dashboard`, menjadi tujuan halaman akar. `/app` tetap Hari ini. Dashboard merangkum 5 sesi, 90 pasien, 3 sesi perlu perhatian, dan respons pasien dr. Rina dari seed. Tidak menambah integrasi maupun angka skenario.

## Perluasan mockup atas permintaan pengguna, 12 Oktober 2026
Menu yang sebelumnya berlabel Segera kini dapat dibuka: P28 Riwayat, P16 Dokter, P30 Poli, P18 Jadwal praktik, P19 Pengguna, P20 Pengaturan, P22 Mode demo. Ini perluasan presentasi Fase 0, bukan implementasi backend gelombang berikutnya. Form mengubah state lokal selama halaman terbuka; pemutar demo mengikuti timeline yang sama. Jadwal publik responsif desktop/mobile dengan pencarian, filter poli, dan kode booking. Data inti tidak berubah. Persona, timeline, dan nilai ambang terdokumentasi dipasok dari docs/seed/administrasi-mockup.json melalui data:sync.

## Revisi lokasi pasien, 5 November 2026
Atas koreksi pengguna: durasi perjalanan dihitung sistem dari rute jalan, tidak diisi pasien. Pada prototipe frontend, P4 mengambil lokasi setelah izin pengguna atau lokasi rumah simulasi, membaca durasi mobil OSRM, menghitung saran berangkat dari target datang ke poli dengan cadangan perjalanan/parkir, lalu merender pratinjau WhatsApp berisi perubahan jadwal dokter dan rekomendasi pribadi. Integrasi pengiriman, penyimpanan lokasi, dan pemicu otomatis saat sinyal dokter berubah tetap menunggu backend/WhatsApp; prototipe tidak mengklaim pesan terkirim. Belum memakai lalu lintas langsung. Rute gagal menampilkan pesan dan menghapus estimasi sebelumnya.
