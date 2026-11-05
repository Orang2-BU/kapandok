# Riset Lomba: UMS Health Innovation Hackathon 2026

Posisi terakhir: Langkah 3 selesai (guidebook dibaca), menunggu konfirmasi user dan pilihan tantangan.

## Sumber
- Laman resmi: https://ihub.ums.ac.id/hackathon
- Pedoman peserta (16 hlm): https://ums.id/PEDOMANUMSHIHACK26
- Template proposal: https://ums.id/PROPOSALUMSHIHACK26
- Pendaftaran: https://ihub.ums.ac.id/hackathon/daftar

## Ringkasan guidebook
- Hackathon berbasis **tantangan mitra** (bukan tema bebas). Satu tim = satu proposal = satu tantangan. Pendekatan teknologi boleh beda dari contoh asal menjawab kebutuhan mitra. Penekanan pada deeptech.
- Seleksi proposal memilih 15 tim. Demo day memilih 5 pemenang (3 kategori Lanjutan, 2 kategori Awal).
- Kategori pengembangan: **Awal** (konsep/desain/simulasi) dan **Lanjutan** (sudah ada purwarupa).

### Tantangan
| Kode | Mitra | Tantangan |
|---|---|---|
| RS-01 | RS AR Fachrudin UMS | Info jadwal dokter + notifikasi perubahan untuk pasien |
| ARB-01 | CV Arbain | Agen AI untuk pemasaran & penjualan B2B ke apotek/minimarket |
| ARB-02 | CV Arbain | Integrasi data pelanggan, aktivitas sales, dan stok |
| LKPI-01 | PT LKPI | Formulasi disinfektan dengan aroma sesuai kebutuhan pengguna |
| LKPI-02 | PT LKPI | Purwarupa otomatisasi peralatan produksi disinfektan |
| UMS-01 | DPM DRPPS UMS | Solusi untuk mempertemukan produk kesehatan hasil riset UMS dengan calon pengguna/mitra usaha |

### Penilaian proposal (skor 1-4, ambang NP >= 2,80; 2,60-2,79 dapat revisi)
| Aspek | Bobot |
|---|---|
| Kesesuaian masalah dan solusi | 20% |
| Kesesuaian tema dan kedalaman teknologi (deeptech) | 22% |
| Inovasi dan kelayakan rancangan | 28% |
| Rencana hilirisasi dan dampak | 20% |
| Komponen lokal dan kekayaan intelektual | 10% |

Nilai akhir pemenang = 20% nilai proposal + 80% nilai demo day.

### Syarat penting
- Tim 3-6 orang, **wajib minimal 1 dosen tetap** (NIDN/NIDK/NUPTK di PDDIKTI). Mahasiswa hanya boleh di 1 tim.
- Satu PDF maks 10 MB: proposal (bagian 1-6 maks 3 halaman A4, Tahoma 11, spasi 1,15), CV semua anggota, pakta integritas bertanda tangan semua anggota, **bukti purwarupa/desain awal (wajib)**.
- Karya asli dan belum pernah menang lomba lain.
- Angka tanpa data harus ditandai sebagai asumsi.

### Timeline
- **Deadline proposal: 15 Oktober 2026, 23.59 WIB**
- Seleksi 16-24 Okt; pembekalan 26 Okt-4 Nov; hackathon + demo day awal-pertengahan Nov (3 hari); pendampingan sampai April 2027.

## Tantangan terpilih: RS-01
Sumber: https://ihub.ums.ac.id/hackathon/tantangan/rs-01-informasi-jadwal-dokter-dan-notifikasi-perubahan-untuk-pasien
- Latar belakang (dari mitra): perubahan jadwal dokter dapat menyebabkan pasien datang pada waktu yang kurang sesuai dan mengalami waktu tunggu.
- Arah solusi awal: penyampaian informasi jadwal + notifikasi perubahan kepada pasien.
- Dukungan mitra: masih dikonfirmasi.
- Pertanyaan untuk mitra (belum terjawab): seberapa sering jadwal berubah dan penyebabnya; sistem jadwal yang dipakai sekarang (SIMRS? manual?); kanal yang dipakai pasien (WA, Mobile JKN, telepon); data jumlah pasien rawat jalan per hari.

## Profil tim
- Nama tim: Hadi Sudah Membaik. Ketua: Krisna Panca Dewa (+62 859 5089 8273). Anggota lain belum dirinci.
- 6 orang (penuh), ada dosen. Semua anggota multi-skill. Stack: bebas, **bukan Laravel dan bukan Flutter**.
- Akses khusus: "banyak" (belum dirinci).
- Belum ada purwarupa → kategori **Awal**. Bukti desain awal (mockup/rancangan) tetap wajib sebelum 15 Okt.

## Riset (Langkah 5) - sumber terverifikasi
1. Waktu tunggu rawat jalan RI melebihi standar <=60 menit (Permenkes 30/2022; dulu Kepmenkes 129/2008), penyebab utama keterlambatan/perubahan jadwal dokter.
   - RS Tipe C Depok: rerata 86 menit, penyebab utama keterlambatan dokter spesialis (Jurnal Promotif Preventif, 2026) https://journal.unpacti.ac.id/index.php/JPP/article/view/2220
   - RS Islam Siti Khadijah Palembang: 68% dari 97 pasien BPJS menunggu >60 menit, rerata 1 jam 24 menit, penyebab jadwal dokter tidak konsisten (Paganini dkk., 2024)
   - RS St. Carolus klinik saraf: 62% >60 menit; dokter terlambat tidak memberi tahu petugas sehingga petugas tidak bisa menjelaskan ke pasien (Jurnal Kesehatan Tambusai) https://journal.universitaspahlawan.ac.id/index.php/jkt/article/download/3823/2571
2. Celah komunikasi dokter → bagian jadwal → pasien.
   - Audit UK: 54% klinik dibatalkan; penyebab terbesar dokter tidak tersedia yang tidak dikomunikasikan ke tim booking; hanya ~50% pasien diberi tahu sesuai protokol. https://pmc.ncbi.nlm.nih.gov/articles/PMC8769270/
3. No-show dan pengingat.
   - Rata-rata no-show global ~23%; prediktor terkuat lead time panjang dan riwayat no-show. Dantas dkk., 2018, Health Policy, doi:10.1016/j.healthpol.2018.02.002 (PMID 29482948)
   - SMS reminder meningkatkan kehadiran RR 1,14 (95% CI 1,03-1,26), 7 RCT, 5.841 peserta. Gurol-Urganci dkk., 2013, Cochrane, doi:10.1002/14651858.CD007458.pub3 (PMID 24310741)
   - Polandia 2025: 14% no-show; alasan utama lupa (42,3%) dan hambatan komunikasi (27,5%). Olearczyk dkk., 2026, Med Sci Monit, doi:10.12659/msm.951944
4. Penjadwalan ulang dan slot kosong.
   - ~20% janji dibatalkan & dijadwal ulang; slot yang batal mendadak jarang terisi ulang; mayoritas jadwal ulang mundur jauh. (Univ. Michigan CHEPS, studi klinik spesialis) https://cheps.engin.umich.edu/wp-content/uploads/sites/118/2018/06/MEND-AJMC-Paper-for-CHEPS-Website-1.pdf
   - Pasien yang janjinya pernah ditunda lebih cenderung tidak datang (Blæhr dkk., 2016, Danish Medical Journal)
   - Prediksi no-show dengan ML masih sulit: dari 50 studi hanya 2 yang akurasinya melebihi show rate. Carreras-García dkk., 2020, Entropy, doi:10.3390/e22060675
5. Pesaing: Mobile JKN (antrean online, jadwal praktik, estimasi waktu layanan; RS wajib update jadwal). Ulasan pengguna mengeluhkan antrean dibatalkan mendadak.

## Brainstorming (Langkah 6)
- User memilih sudut masalah #2 (informasi perubahan jadwal macet) + #4 (slot batal tidak terisi, jadwal ulang mundur).
- Sudut A (notifikasi + estimasi personal) dan B (slot pengganti + waitlist) digabung.
- Cek pesaing: dasar A+B SUDAH ADA.
  - Chup (RSUD Bakti Pajajaran, Nov 2025): auto reschedule + WA saat dokter telat. https://depok.tribunnews.com/news/47282/kurangi-antrean-pasien-rsud-bakti-pajajaran-gandeng-pt-chup-teknologi-indonesia
  - Siagga (https://www.siagga.com/solusi/klinik/), Rekan.ai, Wazapbro: reminder WA, waitlist; perubahan jadwal masih diinput admin.
  - Phreesia Appointment Accelerator, Waitly AI (AS): isi slot batal dari waitlist dengan AI berdasarkan urgensi klinis.
  - Semuanya reaktif (menunggu kabar dokter/admin).
- Pembeda yang dipilih: **prediksi keterlambatan dokter secara proaktif**.
  - Lapis 1: sinyal internal RS (status ruang operasi, sisa visite rawat inap, riwayat keterlambatan dokter).
  - Lapis 3: ping satu tap ke dokter (On time/+15/+30/+60/Batal) hanya bila tidak ada sinyal menjelang jam praktik.
  - Lapis 2 (ETA dari HP dokter) DIBUANG: pertimbangan privasi (UU PDP) dan penerimaan dokter.
- Risiko diketahui: penerimaan dokter (Suandita, 2026: keberhasilan notifikasi SIMRS bergantung persepsi kemudahan/kegunaan, waspada alert fatigue). https://e-journal.ivet.ac.id/index.php/ijheco/article/download/4426/2959/
- Klaim kebaruan "prediksi keterlambatan dokter jarang diteliti" BELUM diverifikasi mendalam.

## Upgrade ide (deep & presisi), disetujui user
- Otak 1: distribusi jam mulai praktik dokter (quantile model + conformal prediction, update real-time dari sinyal RS & tap dokter). Angelopoulos & Bates, arXiv:2107.07511
- Otak 2: durasi konsultasi per pasien (Golmohammadi dkk., Omega 2023) + peluang no-show/telat terkalibrasi (Dantas 2018).
- Otak 3: optimasi stokastik dua tahap jam datang seluruh antrean (Denton & Gupta, IIE Trans 2003, doi:10.1080/07408170304395), diselesaikan dengan Sample Average Approximation (Sozuer, WSC 2019), optimasi ulang bergulir; batasan waktu tempuh, stabilitas, keadilan, prioritas.
- Pengaman presisi: coverage/MAE/pinball/Brier, backtest, pesan konservatif saat ragu, alasan prediksi terlihat.
- Tambalan: (1) fitur dasar "cek jadwal dokter" via WA/web; (2) justifikasi kenapa optimasi perlu + pembagian lingkup hackathon vs sampai April 2027.
- Klaim kebaruan dipertajam: provider lateness sudah dimodelkan (Strahl 2015; Sozuer 2019), tapi belum ditemukan yang memakai sinyal operasional real-time + terhubung notifikasi pasien + diterapkan di RS Indonesia.

## Simulasi juri (Langkah 7)
- Skor sekarang: S1 3, S2 3, S3 3, S4 2, S5 3 → NP 2,80 (tepat di ambang).
- Target setelah perbaikan: S1 3, S2 4, S3 4, S4 3, S5 3 → NP 3,50.
- Perbaikan prioritas: kontak mitra/minta pernyataan minat; wawancara pasien & dokter; simulasi bukti konsep (optimizer vs FCFS, data sintetis); diagram arsitektur + mockup.

## Proposal (Langkah 8)
- Template resmi terisi: D:\VIDIOO\Film\Proposal_NamaTim_KapanDok.docx (template asli tidak diubah).
- Bagian 1-6 pas 3 halaman (dicek lewat Word). Jeda halaman template sebelum bagian 5 dihapus agar muat.
- Masih harus diisi tim: identitas dan nama anggota, nama tim, hasil wawancara, status dukungan mitra, pustaka bertanda [ ], tanda tangan pakta.
- TKT awal 3 HANYA valid bila simulasi bukti konsep dilampirkan (Lampiran C); kalau tidak, ganti ke TKT 2.

## Nama aplikasi
- Dipilih user: **KapanDok** (dari pertanyaan pasien "kapan dok?"). Cek 2026-10-12: tidak ditemukan aplikasi kesehatan bernama sama; github.com/kapandok kosong; kapandok.id/.com tidak merespons (belum pasti kosong, cek registrar). "Kapandok" = kata Bikol (Filipina) "mirip", tidak relevan.
- Kandidat lain yang dipertimbangkan: Etta, Ondot, Vernier, Nowcast, Wardcast, Wayah (ditolak user: terlalu lokal).

## Kontak mitra
- 2026-10-12: email pertanyaan RS-01 dikirim dari krisnadewa6565@gmail.com ke umsihub.official@gmail.com atas nama Hadi Akram Ramadhan (SALAH). Ralat dikirim di utas yang sama: ketua yang benar Krisna Panca Dewa, WA +62 859 5089 8273. Tim: Hadi Sudah Membaik. Isi: frekuensi/penyebab perubahan jadwal, SIMRS yang dipakai, kanal info ke pasien. Tidak meminta data pasien.
- Narasi dukungan mitra di proposal: opsi A (rencana + data sintetis). Bila dibalas sebelum 15 Okt, tambahkan kalimat bahwa pertanyaan awal telah diajukan.

## Balasan mitra (via panitia, Okt 2026)
- Jadwal dokter berubah hampir setiap hari; penyebab: tindakan darurat, operasi melebihi estimasi, visite rawat inap, agenda lain.
- SIMRS internal, nama/vendor konfidensial; disarankan solusi modular/sistem-agnostik via API.
- Kanal ke pasien: WhatsApp, dikirim manual oleh petugas setelah konfirmasi dokter.
- Arah yang disarankan: otomatisasi notifikasi, konfirmasi dua arah + opsi jadwal ulang, integrasi fleksibel.
- Sudah dimasukkan ke proposal v2 (bukti kebutuhan lokal, sinyal Model 1, konfirmasi dua arah, adapter sistem-agnostik, dukungan mitra). Bagian 1-6 tetap 3 halaman.

## Keputusan user
- Tim sudah punya dosen (syarat terpenuhi).
- Memilih tantangan RS-01.
