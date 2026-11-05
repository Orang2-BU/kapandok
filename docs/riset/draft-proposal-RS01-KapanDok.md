# Draf Proposal UMS Health Innovation Hackathon 2026

> Versi lengkap untuk dibaca tim. Isi bagian 1-6 wajib dipadatkan menjadi maksimal 3 halaman A4 (Tahoma 11, spasi 1,15, margin 2,54 cm). Tanda [...] = perlu dilengkapi/diverifikasi tim sebelum submit.

## 1. Judul

**KapanDok: Sistem Prediksi Jam Mulai Praktik Dokter dan Realokasi Slot Otomatis untuk Notifikasi Proaktif Pasien Rawat Jalan**

## 2. Tema

Tema kesehatan: Layanan rumah sakit dan sistem informasi kesehatan.
Tantangan: **RS-01, Informasi Jadwal Dokter dan Notifikasi Perubahan untuk Pasien** (RS AR Fachrudin UMS).

## 3. Ringkasan Eksekutif

Perubahan dan keterlambatan jadwal dokter membuat pasien rawat jalan datang pada waktu yang tidak tepat dan menunggu lama. Studi di rumah sakit Indonesia mencatat rerata waktu tunggu 86 menit, di atas standar 60 menit, dengan penyebab utama keterlambatan dokter spesialis [2]. Akar masalahnya adalah rantai informasi: kabar keterlambatan sering tidak sampai dari dokter ke petugas, lalu ke pasien [4,5]. Solusi yang tersedia saat ini bersifat reaktif dan baru bekerja setelah keterlambatan dilaporkan secara manual.

KapanDok adalah sistem yang **memprediksi jam mulai praktik dokter** dari sinyal operasional rumah sakit (status ruang operasi, sisa visite rawat inap, riwayat ketepatan waktu), lalu meminta konfirmasi satu sentuhan dari dokter hanya bila data tidak cukup. Prediksi ini menghasilkan notifikasi personal via WhatsApp berisi estimasi waktu panggil dan waktu berangkat. Bila praktik batal, sistem menawarkan slot pengganti secara otomatis dan mengisi slot kosong dari daftar tunggu berdasarkan prioritas.

Pengguna utama adalah pasien rawat jalan, dokter, dan petugas poliklinik RS AR Fachrudin UMS. Kegiatan meliputi pengembangan purwarupa, pelatihan model dengan data historis mitra, dan uji coba terbatas pada 1-2 poliklinik. TKT awal 2-3 (konsep dan bukti konsep simulasi), target TKT 6 (purwarupa diuji di lingkungan rumah sakit) pada April 2027.

*(±230 kata)*

## 4. Deskripsi Inovasi

### 4.1 Masalah dan pengguna

**Tantangan mitra.** RS AR Fachrudin UMS menyampaikan bahwa perubahan jadwal dokter dapat menyebabkan pasien datang pada waktu yang kurang sesuai dan mengalami waktu tunggu.

**Masalah spesifik.**
1. *Waktu tunggu melebihi standar.* Standar waktu tunggu rawat jalan adalah ≤60 menit [1]. Di RS Tipe C Depok rerata waktu tunggu pasien JKN 86 menit, penyebab utamanya keterlambatan dokter spesialis [2]. Di RS Islam Siti Khadijah Palembang, 68% pasien BPJS menunggu lebih dari 60 menit, dengan penyebab jadwal dokter yang tidak konsisten [3].
2. *Rantai informasi terputus.* Di RS St. Carolus, dokter yang terlambat tidak memberi tahu petugas sehingga petugas tidak dapat menjelaskan kepada pasien [4]. Audit klinik di Inggris menemukan 54% sesi klinik dibatalkan, dengan penyebab terbesar ketidakhadiran dokter yang tidak dikomunikasikan ke tim penjadwalan, dan hanya sekitar 50% pasien diberi tahu sesuai protokol [5].
3. *Slot terbuang dan penjadwalan ulang yang mundur.* Sekitar 20% janji dibatalkan dan dijadwal ulang. Slot yang batal mendadak jarang terisi kembali, dan mayoritas jadwal ulang bergeser lebih lambat [9]. Pasien yang janjinya pernah ditunda lebih cenderung tidak hadir pada janji berikutnya [10]. Rata-rata ketidakhadiran pasien secara global sekitar 23% [6].

**Calon pengguna.**
- Pasien rawat jalan (termasuk pasien JKN dan lansia) yang membutuhkan kepastian waktu datang.
- Dokter yang membutuhkan cara memberi kabar tanpa menelepon atau mengetik.
- Petugas poliklinik/pendaftaran yang saat ini menginformasikan perubahan secara manual.

**Bukti kebutuhan.** Literatur di atas, ditambah [rencana: wawancara 5-10 pasien dan 3-5 dokter/petugas RS AR Fachrudin sebelum submit; hasilnya dicantumkan di sini].

**Target kinerja (diukur saat uji coba; baseline diambil dari data mitra).**
- Rerata waktu tunggu poliklinik uji coba turun menuju standar ≤60 menit. [baseline RS AR Fachrudin perlu ditanyakan ke mitra]
- ≥90% pasien terdampak menerima kabar perubahan sebelum berangkat. [asumsi target]
- Galat absolut rata-rata (MAE) prediksi jam mulai praktik ≤15 menit. [asumsi target]
- ≥30% slot batal terisi ulang. [asumsi target]

### 4.2 Solusi dan teknologi

**Cara kerja.**
1. **Prediksi jam mulai praktik (Lapis 1, otomatis).** Model membaca sinyal operasional dari SIMRS: status dan durasi berjalan operasi dokter di kamar operasi, sisa daftar visite rawat inap, serta riwayat ketepatan waktu dokter per hari dan jam. Keluaran berupa estimasi jam mulai beserta rentang keyakinan (mis. "10.15, rentang 10.05-10.30").
2. **Konfirmasi satu sentuhan (Lapis 3, hanya bila perlu).** Jika menjelang jam praktik tidak ada sinyal yang cukup, dokter menerima notifikasi berisi pilihan *Tepat waktu / +15 / +30 / +60 / Batal*. Notifikasi dibatasi agar tidak menimbulkan kelelahan notifikasi (*alert fatigue*) [14].
3. **Notifikasi personal ke pasien.** Estimasi jam mulai digabung dengan nomor antrean dan estimasi durasi konsultasi menjadi waktu panggil per pasien, dikirim via WhatsApp: "Dokter diperkirakan mulai 10.15, Anda dipanggil sekitar 11.30, disarankan berangkat 10.45."
4. **Realokasi slot otomatis.** Bila praktik batal atau slot kosong, sistem menawarkan alternatif (dokter lain di poli yang sama atau slot terdekat) dan menawarkan slot kosong ke daftar tunggu dengan urutan prioritas: urgensi kontrol, lama penundaan, dan riwayat penundaan.

**Rancangan sistem.** [gambar arsitektur di lampiran]
- Integrasi data: SIMRS mitra (baca-saja), standar HL7 FHIR (SATUSEHAT) dan bridging antrean BPJS bila tersedia.
- Layanan prediksi: Python (FastAPI), model *gradient boosting* dengan regresi kuantil untuk menghasilkan rentang prediksi.
- Layanan optimasi slot: algoritma penugasan berbasis skor prioritas (dapat dikembangkan ke *integer programming*).
- Antarmuka: aplikasi web progresif (Next.js) untuk dokter dan petugas, WhatsApp Business API untuk pasien.
- Basis data: PostgreSQL.

**Dasar ilmiah.**
- Pengingat melalui pesan seluler meningkatkan kehadiran pasien (RR 1,14; 95% CI 1,03-1,26; 7 RCT, 5.841 peserta) [7].
- Penjadwalan dinamis dengan mengalokasikan hanya 2% kapasitas secara fleksibel sudah meningkatkan kinerja klinik secara signifikan [8].
- Keterlambatan dokter (*provider lateness*) diakui sebagai faktor waktu tunggu dan telah dimodelkan dalam optimasi jadwal [12,13], tetapi prediksinya umumnya hanya memakai regresi dari data riwayat [12].

**Kebaruan dibanding solusi yang tersedia.**
| Solusi | Yang dilakukan | Batasan |
|---|---|---|
| Mobile JKN (BPJS) | Antrean online, jadwal praktik, estimasi waktu layanan | Bergantung pada pembaruan jadwal oleh RS |
| Chup (RSUD Bakti Pajajaran) [11] | Penyesuaian antrean dan notifikasi WhatsApp saat dokter terlambat | Reaktif, menunggu keterlambatan diketahui |
| Siagga, layanan chatbot WA klinik | Pengingat, daftar tunggu, notifikasi perubahan | Perubahan diinput manual oleh admin |
| Phreesia, Waitly AI (AS) | Pengisian slot batal dari daftar tunggu dengan AI | Tidak ada di Indonesia, tidak terhubung ke JKN, tidak memprediksi keterlambatan dokter |
| **KapanDok** | **Memprediksi keterlambatan dari sinyal operasional real-time, lalu otomatis menggerakkan notifikasi dan realokasi slot** | |

**Kelayakan.** Komponen teknologi (WhatsApp API, model *gradient boosting*, web progresif) sudah matang. Risiko utama ada pada akses data SIMRS dan penerimaan dokter. Mitigasinya: mulai dari data jadwal dan riwayat jam mulai praktik (ekspor sederhana), serta desain konfirmasi satu sentuhan yang minimal.

**Komponen lokal dan kekayaan intelektual.** Seluruh perangkat lunak dikembangkan mandiri oleh tim, model dilatih dengan data lokal mitra, dan dirancang terhubung ke ekosistem nasional (SATUSEHAT, JKN). Peluang KI: Hak Cipta program komputer (DJKI); metode prediksi berlapis dikaji untuk paten sederhana. [cek dengan sentra HKI UMS]

### 4.3 Kondisi awal dan TKT

**Kategori: Awal.**
- Sudah dicapai: kajian literatur, analisis solusi pesaing, rancangan alur dan arsitektur sistem.
- Disiapkan sebelum submit (bukti awal, lampiran): mockup antarmuka dokter, petugas, dan pesan WhatsApp pasien; diagram arsitektur; [opsional, sangat disarankan] simulasi sederhana prediksi jam mulai dengan data sintetis.
- TKT awal: 2 (konsep teknologi dirumuskan); 3 bila simulasi bukti konsep selesai.
- Target TKT 6 (April 2027): purwarupa diuji di lingkungan rumah sakit pada 1-2 poliklinik.
- Belum dibuktikan (asumsi): ketersediaan sinyal SIMRS mitra; besaran waktu tunggu dan frekuensi perubahan jadwal di RS AR Fachrudin.

### 4.4 Rencana kegiatan (Oktober 2026 - April 2027)

| Waktu | Tahapan | Keluaran | Ukuran keberhasilan |
|---|---|---|---|
| Okt-Nov 2026 | Pembekalan, pemetaan kebutuhan bersama mitra, hackathon | MVP: notifikasi WA, konfirmasi satu sentuhan, realokasi slot dasar | Demo alur end-to-end berjalan |
| Des 2026 | Pengumpulan data historis jadwal dan jam mulai praktik (anonim) | Dataset dan baseline waktu tunggu | Data ≥3 bulan terkumpul [asumsi] |
| Jan 2027 | Pelatihan dan validasi model prediksi | Model Lapis 1 | MAE ≤15 menit pada data uji |
| Feb-Mar 2027 | Uji coba terbatas di 1-2 poliklinik | Sistem berjalan di lingkungan RS | Target kinerja 4.1; survei kepuasan pasien dan dokter |
| Apr 2027 | Evaluasi, perbaikan, laporan, pendaftaran HKI | Laporan dan berkas HKI | Rekomendasi perluasan |

### 4.5 Dukungan mitra dan hilirisasi

- **Dukungan mitra:** sedang dikonfirmasi. Yang dibutuhkan: data jadwal dan riwayat jam mulai praktik (anonim), akses baca SIMRS atau ekspor berkala, izin uji coba di 1-2 poliklinik, dan narasumber petugas/dokter.
- **Calon pengguna awal/pilot:** RS AR Fachrudin UMS.
- **Rencana penerapan:** perluasan ke seluruh poliklinik, lalu ke jejaring rumah sakit Muhammadiyah/'Aisyiyah. [cek data jumlah RS jejaring]
- **Model keberlanjutan:** langganan per rumah sakit (SaaS) dengan biaya per poliklinik. [asumsi]
- **Dampak:** waktu dan biaya perjalanan pasien berkurang, kepuasan pasien meningkat, kapasitas dokter termanfaatkan lebih baik, dan indikator mutu waktu tunggu RS terbantu.

**Pertanyaan untuk mitra:** seberapa sering jadwal dokter berubah dan apa penyebab terbanyaknya; SIMRS yang digunakan; kanal yang dipakai pasien saat ini; jumlah pasien rawat jalan per hari; data waktu tunggu terakhir.

## 5. Pembagian Tugas dan Tanggung Jawab

| Anggota | Peran | Tugas | Keluaran |
|---|---|---|---|
| [Nama, ketua] | Koordinator teknis: model prediksi | Rekayasa fitur, pelatihan dan evaluasi model | Model Lapis 1, laporan akurasi |
| [Nama dosen] | Pembimbing ilmiah dan regulasi/etik data | Validasi metodologi, kepatuhan data pasien (UU PDP), izin penelitian | Protokol data, kajian etik |
| [Nama] | Teknis: backend dan integrasi | API, integrasi SIMRS/FHIR/WhatsApp, optimasi slot | Layanan backend |
| [Nama] | Teknis: antarmuka dan UX | Web progresif dokter/petugas, desain pesan pasien | Purwarupa antarmuka |
| [Nama] | Bisnis dan hilirisasi | Model bisnis, rencana penerapan, HKI | Rencana komersialisasi, berkas HKI |
| [Nama] | Validasi pengguna | Wawancara dan survei, uji kegunaan, koordinasi lapangan | Laporan validasi |

Pemantauan kemajuan: rapat mingguan, papan tugas bersama, dan laporan bulanan ke pembimbing.

## 6. Daftar Pustaka

1. Kementerian Kesehatan RI. Peraturan Menteri Kesehatan Nomor 30 Tahun 2022 tentang Indikator Nasional Mutu Pelayanan Kesehatan. [verifikasi teks resmi di JDIH Kemenkes]
2. [Penulis]. Faktor Determinan Waktu Tunggu Rawat Jalan Pasien Jaminan Kesehatan Nasional (BPJS): Studi Gerak Waktu di Rumah Sakit Tipe C Depok, Indonesia. Jurnal Promotif Preventif. 2026. https://journal.unpacti.ac.id/index.php/JPP/article/view/2220
3. Paganini MADR, Limisran L, Yulianto NP. Tinjauan Waktu Tunggu Pelayanan Pasien BPJS di Rawat Jalan Rumah Sakit Islam Siti Khadijah Palembang. 2024. [nama jurnal, volume, link asli]
4. [Penulis]. Tinjauan Lama Waktu Tunggu Pelayanan Pasien BPJS Rawat Jalan Klinik Saraf. [Jurnal, tahun]. https://journal.universitaspahlawan.ac.id/index.php/jkt/article/download/3823/2571
5. [Penulis]. Clinical audit on possible causes of hospital initiated clinic cancellations. [Jurnal, tahun]. https://pmc.ncbi.nlm.nih.gov/articles/PMC8769270/
6. Dantas LF, Fleck JL, Cyrino Oliveira FL, Hamacher S. No-shows in appointment scheduling: a systematic literature review. Health Policy. 2018;122(4):412-421. doi:10.1016/j.healthpol.2018.02.002
7. Gurol-Urganci I, de Jongh T, Vodopivec-Jamsek V, Atun R, Car J. Mobile phone messaging reminders for attendance at healthcare appointments. Cochrane Database Syst Rev. 2013;(12):CD007458. doi:10.1002/14651858.CD007458.pub3
8. Laan CM, van de Vrugt M, Olsman JG, Boucherie RJ. Static and dynamic appointment scheduling to improve patient access time. [Jurnal]. 2017.
9. [Herzog Warner J, dkk.]. [Judul studi penjadwalan dan pembatalan klinik spesialis]. University of Michigan CHEPS. https://cheps.engin.umich.edu/wp-content/uploads/sites/118/2018/06/MEND-AJMC-Paper-for-CHEPS-Website-1.pdf
10. Blæhr EE, Søgaard R, Kristensen T, Væggemose U. Observational study identifies non-attendance characteristics in two hospital out-patient clinics. Dan Med J. 2016.
11. Tribun Depok. Kurangi Antrian Pasien, RSUD Bakti Pajajaran Gandeng PT Chup Teknologi Indonesia. 1 November 2025.
12. Strahl J. Patient appointment scheduling system: with supervised learning prediction. [Tesis, institusi]. 2015.
13. Sozuer S, dkk. Simulation-based optimization of dynamic scheduling of outpatient appointments with patient no-shows and provider lateness. Proceedings of the Winter Simulation Conference. 2019. https://www.informs-sim.org/wsc19papers/289.pdf
14. Suandita IWN. Persepsi dan Pengalaman Dokter terhadap Notifikasi SIMRS untuk Meningkatkan Kepatuhan Pengisian Rekam Medis Rumah Sakit. 2026. https://e-journal.ivet.ac.id/index.php/ijheco/article/download/4426/2959/

## 7. Lampiran (di luar batas 3 halaman)
- CV ketua dan seluruh anggota.
- Pakta integritas bertanda tangan seluruh anggota (format dari template).
- Bukti desain awal: mockup antarmuka, diagram arsitektur, [simulasi bukti konsep].
