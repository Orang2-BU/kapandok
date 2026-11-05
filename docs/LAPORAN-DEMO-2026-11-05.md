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


## Pembaruan: animasi dan lokasi pasien
- Animasi masuk bertahap pada beranda/panel dashboard, hover tombol dan ikon; nonaktif saat prefers-reduced-motion.
- P4: alamat awal, tombol lokasi perangkat (diminta hanya saat ditekan), rute ke RS via Google Maps, durasi perjalanan dan parkir/jalan, serta hasil saran berangkat tambahan. Input diubah menghapus hasil lama agar tidak menyesatkan.
- Lokasi hanya state halaman, diteruskan ke Google Maps saat tautan diklik. Izin ditolak dan timeout menyediakan jalur manual.
- Jam seed tetap utuh. Perhitungan mengacu jam datang 11.15, bukan dipanggil 11.30; 30 menit perjalanan + 10 menit parkir menghasilkan 10.35. Jika melewati tengah malam, hasil ditandai hari sebelumnya.
- Durasi rute belum otomatis: pengguna mengambil durasi dari peta, lalu memasukkannya. Tidak ada routing API atau lalu lintas langsung. Sumber alamat: situs resmi https://rs.ums.ac.id/.
- Verifikasi ulang: 14 test, lint/typecheck/build/Knip lulus; 60 cek browser termasuk lokasi mock, penolakan izin, link origin, invalid input, reset dan reduced motion. Screenshot diperbarui. Uji GPS perangkat sungguhan belum dilakukan.
- Peringatan keamanan Next.js bawaan tetap muncul pada build. Tidak ada push.


## Revisi terbaru: Pantara/AquaSeq dan rute otomatis
Bagian ini menggantikan keterbatasan input durasi manual pada pembaruan sebelumnya.

### Perubahan
- Dashboard: Onest, menu aktif pil, kartu dengan tekstur ringan, sorotan kanan, akun bawah sidebar, area menu yang bisa bergulir. Struktur mengikuti Pantara; isi dan identitas KapanDok dipertahankan.
- Beranda: Manrope, hero lebar membulat, heading dengan dua bobot, tombol gelap dengan lingkaran panah, transisi masuk blur/fade. Struktur mengacu AquaSeq; tidak memakai foto/isi produk lain. Ini adaptasi visual, bukan klaim pixel-identik dengan dua situs berbeda.
- P4: GPS atau lokasi rumah simulasi langsung memanggil OSRM Route API, tanpa input durasi manual. Koordinat RS diperiksa dari peta yang ditautkan https://rs.ums.ac.id/ dan disimpan di seed/travel-config.json.
- Saran berangkat diperbarui pada kartu utama dan pratinjau WhatsApp. Pesan menyebut jadwal resmi dan prediksi baru, jam dipanggil, target datang, durasi rute, serta rekomendasi berangkat.
- Hasil lama dihapus saat menghitung ulang atau rute gagal. Tidak ada durasi palsu saat layanan gagal; GPS ditolak ditangani. Tidak menyimpan lokasi; koordinat dikirim ke OSRM hanya setelah aksi pengguna.

### Pemeriksaan
| Cek | Perintah (web/) | Hasil |
|---|---|---|
| Test | corepack pnpm@10.20.0 test | 17 passed |
| Lint | corepack pnpm@10.20.0 lint | Lulus |
| Typecheck | corepack pnpm@10.20.0 typecheck | Lulus |
| Build | corepack pnpm@10.20.0 build | Lulus setelah pengingat keamanan, peringatan Next.js tetap |
| Dead code | corepack pnpm@10.20.0 dlx knip | Tanpa temuan |
| Browser | BROWSER_PATH=/opt/brave-bin/brave corepack pnpm@10.20.0 shots | 60 cek, 15 PNG, konsol bersih |
| Rute nyata | Browser tanpa mock ke OSRM | 6,7 km, 9 menit, saran 10.51, target 11.15 |
| Visual | 375/768/1440, reduced motion | Tidak overflow; sidebar mobile, fokus dan navigasi diuji ulang |

### Analisis dan batasan
Alur frontend kini menghitung perjalanan sistem, bukan meminta pasien menaksir menit. Estimasi mobil dibulatkan ke atas dan diberi cadangan 5 menit serta parkir/jalan 10 menit. Nilai tersebut adalah asumsi demo, bukan jaminan tidak telat. Routing menggunakan server demo OSRM/OpenStreetMap dan bergantung jaringan, tanpa kemacetan langsung atau SLA produksi. Untuk produksi perlu penyedia rute yang disepakati, persetujuan penggunaan lokasi, dan worker pengiriman/rekomputasi saat sinyal dokter berubah.

WhatsApp belum dikirim nyata. Tidak ada backend, penyimpanan lokasi pasien, atau trigger otomatis dari SIMRS. Lokasi rumah adalah contoh, uji GPS memakai mock; uji izin GPS fisik pengguna belum dilakukan. Tidak ada push/deploy. Peringatan keamanan Next.js bawaan tetap perlu ditangani sebelum publikasi.

Preview: http://127.0.0.1:3000, /app/dashboard, /k/KD-4812. Bukti tambahan: mockup/p04-rute-otomatis.png dan mockup/rute-contoh-osrm.json. Rumus: jam datang ke poli dikurangi estimasi rute, cadangan dan parkir; tidak memakai jam dipanggil sebagai target tiba.
