# Laporan persiapan demo, 5 November 2026

## Perubahan
- P0 `/`: beranda presentasi dengan identitas KapanDok, jalur ke dashboard dan jadwal publik, pratinjau dr. Rina dan KD-4812, tiga langkah alur, dan tautan laporan.
- Acuan Pantara diadaptasi pada hierarki panel, tombol pil, dan pembuka demo. Sidebar Aceternity/21st.dev yang sudah ada dipertahankan. Tidak menambahkan dependency komponen baru atau mengklaim seluruh tampilan berasal dari 21st.dev.
- PRODUCT.md: tombol dokter diselaraskan menjadi Sesuai prediksi / Ubah jam mulai / Batal praktik. Desain hijau ditandai arsip.
- Label aksesibel Kecepatan pada pemutar demo diperbaiki. Screenshot mencakup beranda dan asisten.
- Identitas commit lokal: ByLucKyra <rama85625@gmail.com>. Perubahan dicatat per kelompok; belum di-push.

## Pemeriksaan
| Cek | Perintah (di web/) | Hasil |
|---|---|---|
| Test | corepack pnpm@10.20.0 test | 11 passed |
| Build | corepack pnpm@10.20.0 build | Lulus; 17 halaman diproses |
| Typecheck | corepack pnpm@10.20.0 typecheck | Lulus |
| Lint | corepack pnpm@10.20.0 lint | Lulus |
| Dead code | corepack pnpm@10.20.0 dlx knip | Lulus, tanpa temuan |
| Browser | BROWSER_PATH=/opt/brave-bin/brave corepack pnpm@10.20.0 shots | 58 cek lulus, 15 PNG, konsol bersih |
| Responsif | Browser 375/768/1440 | Tanpa overflow; label simulasi tampil |
| UI A1-A11 | Review visual dan pemeriksaan browser | Token biru, ikon lucide, font Jakarta, tanpa em-dash; beranda desktop/mobile diperiksa visual |

Bukti browser: mockup/verification.json. Pengujian mencakup filter, pencarian, sorting, booking valid/tidak valid, sidebar/drawer dan fokus, form admin lokal, pengaturan, jadwal, riwayat, serta mulai/jeda/reset pemutar demo. Ini bukan audit aksesibilitas menyeluruh.

## Preview dan urutan presentasi
Server production lokal: http://127.0.0.1:3000

1. `/`: jelaskan masalah dan alur.
2. `/app/dashboard` lalu `/app`: ringkasan dan sesi perlu perhatian.
3. `/app/sesi/s-pd-rina`: prediksi 10.15, antrean, status pesan dan dialog simulasi.
4. `/k/KD-4812`: saran berangkat 10.45 dan dipanggil 11.30.
5. `/app/asisten`: contoh percakapan statis, bukan model aktif.
6. `/admin/laporan`: dampak berdasarkan simulasi sintetis.

Menyalakan kembali: `cd web && corepack pnpm@10.20.0 start` setelah build. Browser hanya dapat mengakses URL lokal saat proses server berjalan di komputer ini.

## Analisis dan batasan
Frontend siap untuk demonstrasi mockup statis dengan data simulasi. Alur utama dan menu tambahan sudah diverifikasi; beranda baru memberi pembuka presentasi yang sebelumnya tidak tersedia. Model, backend, autentikasi, database, WhatsApp dan SIMRS belum diintegrasikan. Form admin berubah di state lokal dan kembali saat halaman dimuat ulang.

Build menampilkan peringatan bahwa Next.js 16.4.0 yang dibawa repo terkena kerentanan yang diketahui. Build ulang berhasil dengan peringatan tersebut. Detail advisori belum diaudit pada pekerjaan ini; pembaruan keamanan perlu ditangani sebelum publikasi. Tidak ada push atau deployment dalam pekerjaan ini.
