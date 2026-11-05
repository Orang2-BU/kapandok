# Verifikasi mockup KapanDok

Tanggal: 12 Oktober 2026. Preview: http://127.0.0.1:3002/app/dashboard.

## Perubahan
- Dashboard tambahan, dengan ringkasan dari seed yang sama.
- Shell memenuhi lebar layar, sidebar klik 248/80 px mengubah lebar konten. Wordmark disembunyikan saat collapsed.
- Kanvas abu muda, panel putih, hierarki tipografi tegas, aksen biru dan navy mengikuti arahan K-DASP.
- Keenam layar memakai sistem visual yang sama, dengan tampilan pasien dioptimalkan untuk mobile.

## Pemeriksaan
| Cek | Perintah | Hasil |
|---|---|---|
| Test | pnpm test | 9 lulus |
| Build | pnpm build | Lulus |
| Typecheck | pnpm typecheck | Lulus |
| Lint | pnpm lint | Lulus |
| Dead code | pnpm dlx knip | Tidak ada temuan |
| Token desain | designmd lint docs/08-DESIGN.md | 0 error, 0 warning |
| Browser | pnpm shots | 23 pemeriksaan lulus, console bersih |
| Responsif | 6 halaman x 375/768/1440 | Tanpa overflow horizontal |

Bukti terperinci: verification.json. Screenshot: dashboard.png, p10-hari-ini.png, p11-detail-sesi.png, p01-cek-jadwal.png, p04-jam-datang.png, p15-laporan.png.

Interaksi: sidebar mengubah workspace dan menyembunyikan wordmark; drawer keyboard/Tab/Escape/restore focus; filter poli; pencarian dan filter antrean; empty/reset/sort; dialog kirim ulang simulasi; kode booking valid/tidak valid; pengurutan laporan.

## Batas verifikasi
Mockup statis: tidak ada autentikasi, SIMRS, ML live, atau pengiriman WhatsApp. Menu fase mendatang berlabel Segera. Screenshot full-page dari Chromium lokal, bukan data rumah sakit nyata. Review visual dilakukan pada screenshot desktop dan mobile, bukan audit aksesibilitas formal. Port 3000 sudah dipakai, sehingga preview terverifikasi memakai 3002.

Review terpisah: koreksi teks berulang pada laporan dinilai resolved pada screenshot terbaru; disposition ship untuk koreksi tersebut. Sistem desain tercatat di docs/08-DESIGN.md dan .impeccable/design.json.
