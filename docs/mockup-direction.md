# Kontrak implementasi mockup

## Direction contract

THESIS: petugas memilih sesi yang membutuhkan perhatian; pasien membaca satu jam berangkat. Lima layar Fase 0, tanpa layanan nyata.

OWN-WORLD: mengikuti docs/08-DESIGN.md dan docs/design/preview-p10.png: putih, biru, panel abu kebiruan, badge pastel, Plus Jakarta Sans, angka ringan, tanpa bayangan panel.

STORY: sesi bermasalah ditemukan di Hari ini, antrean dan respons dibaca di detail, pasien melihat jadwal dan jam datang, admin membandingkan bukti simulasi.

FIRST VIEWPORT: rail 80px, bar pencarian dan akun, judul dua warna; grid 12 kolom dengan 3+3+3+3, 8+4, 7+5. Publik satu kolom maksimal 480px. Navigasi membuka label dan drawer; filter mempersempit data tanpa mengubah skenario.

FORM: struktur sudah ditetapkan user melalui spesifikasi layar dan preview; tidak dilakukan pengacakan visual atau pemilihan konsep baru. Motion 200ms dan reduced motion mengikuti dokumen, tanpa GSAP tambahan.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

DESIGN.md pada kontrak ini merujuk sumber resmi docs/08-DESIGN.md. Tidak mengganti sistem desain yang sudah disetujui. Data laporan ditranskripsikan otomatis dari lampiran ke JSON runtime bersama data seed, dengan pengujian kesesuaian sumber.

## Revisi pengguna
Referensi K-DASP dipakai untuk kanvas abu muda, kartu putih, hierarki tegas, sidebar klik yang mereflow konten. Identitas biru tetap. Tambahan dashboard `/app/dashboard` disetujui pengguna. Seluruh angka tetap bersumber pada seed.
