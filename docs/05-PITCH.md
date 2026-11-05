# 05 — PITCH & Demo

> Untuk demo day UMS Health Innovation Hackathon 2026 (tanggal dan durasi menyusul dari panitia). Kerangka dibuat saat setup; isi final menjelang demo. Penilaian demo: fungsionalitas 25%, kesesuaian masalah-solusi 20%, inovasi 15%, dampak 15%, komponen lokal & KI 10%, hilirisasi 10%, presentasi 5% (pedoman hlm. 13).

## 1. Alur Cerita (7 menit, menyesuaikan aturan panitia)
| Menit | Bagian | Isi |
|---|---|---|
| 0:00 | Hook | "Pagi ini dr. Rina masih di kamar operasi. 22 pasiennya sudah berangkat dari rumah." |
| 0:40 | Masalah | Jadwal berubah hampir setiap hari, kabar manual lewat WA (konfirmasi mitra); rerata tunggu di RS Indonesia melampaui standar 60 menit |
| 1:40 | Solusi | Prediksi jam mulai dari sinyal RS → konfirmasi dokter satu ketukan → jam datang pribadi per pasien |
| 2:30 | Demo | Mode demo P22: satu sesi diputar cepat (lihat §2) |
| 5:00 | Bukti | Cakupan interval, MAE, penurunan waktu tunggu (simulasi atau data mitra bila tersedia) |
| 5:45 | Dampak & bisnis | Waktu petugas dihemat, indikator mutu; langganan per poli |
| 6:30 | Langkah berikutnya | Pilot 1-2 poli sampai April 2027; jejaring RS Muhammadiyah |

## 2. Script Demo
| # | Aksi di layar | Kalimat yang diucapkan |
|---|---|---|
| 1 | P10 Hari ini, 08.30 simulasi | "Ini layar petugas poli. Semua sesi hari ini, yang perlu perhatian di atas." |
| 2 | Mode demo: operasi dr. Rina molor | "SIMRS memberi sinyal operasi di OK 2 lewat estimasi. KapanDok langsung memprediksi mulai 10.15." |
| 3 | HP juri menerima WA dokter, tekan "Sesuai prediksi" | "Dokter cukup satu ketukan." |
| 4 | HP juri menerima WA pasien | "Ibu Sri tidak perlu datang jam 10.50. Saran berangkat 10.45, dipanggil 11.30." |
| 5 | Tekan "Hadir pukul 11.30"; P11 status berubah | "Petugas melihat siapa yang sudah membaca dan membalas, tanpa menelepon." |
| 6 | dr. Agus batal; slot pengganti | "Kalau dokter batal, pasien langsung ditawari slot lain; yang tidak memilih masuk tindak lanjut petugas." |
| 7 | P15 Laporan | "Ini dampaknya pada waktu tunggu." |

**Cadangan:** video rekaman demo · mode demo lokal tanpa internet · simulator chat WA di web.

## 3. Outline Deck
1. KapanDok: jam datang yang pas untuk setiap pasien
2. Masalah (data mitra + jurnal)
3. Solusi (1 diagram alur sistem)
4. Demo
5. Bukti: akurasi prediksi dan waktu tunggu
6. Pembeda vs Mobile JKN, Chup, chatbot WA
7. Dampak, model bisnis, tim, rencana sampai April 2027

## 4. Persiapan Q&A
| Pertanyaan audiens | Jawaban (≤ 30 detik) | Penjawab |
|---|---|---|
| Bedanya dengan Chup/Mobile JKN? | Mereka bereaksi setelah ada kabar. Kami memprediksi dari sinyal operasional, lalu mengoptimasi jam datang tiap pasien dengan interval yang terkalibrasi. | ketua |
| Datanya dari mana kalau SIMRS rahasia? | Adapter sistem-agnostik (API/FHIR). Tanpa sinyal pun sistem jalan dari riwayat jam mulai + konfirmasi dokter. | backend |
| Seberapa akurat, dan bagaimana kalian tahu? | Interval 90% terkalibrasi conformal; pada uji sintetis cakupan 93,4%, MAE 16 menit. Kalau rentang lebar, sistem bertanya ke dokter, tidak menebak. | AI |
| Dokter mau pakai? | Hanya satu ketukan WA, hanya saat sinyal kurang. Kami akan mengukur tingkat respons saat uji coba. | validasi pengguna |
| Privasi data pasien? | Data minimal, nomor WA terenkripsi, halaman publik hanya pemegang kode, alasan medis tidak dibuka ke pasien; patuh UU PDP. | dosen |
| Kalau dipakai skala besar? | Model per RS dilatih pada pola dokter RS itu; layanan ringan berbasis CPU; biaya terbesar pesan WA per template. | bisnis |

## 5. Kartu Contekan
Ide 3 kalimat, angka kunci, dan kamus istilah ada di **01-PRD §3b**. Tambahan khusus presentasi:
- Selalu sebut **"data simulasi"** untuk angka yang belum dari RS.
- Format jam Indonesia: "sepuluh lima belas" untuk 10.15.
