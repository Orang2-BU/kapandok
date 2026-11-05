# KapanDok · Panduan Logo (ringkas)

## 1. Logo
- **Ide:** tanda plus kesehatan yang di kuadran kanan atasnya berjalan seperempat putaran jam. Artinya: layanan kesehatan yang waktunya sudah diperhitungkan.
- **Versi:** horizontal (utama) · bertumpuk · simbol saja · wordmark saja.
- **Konstruksi simbol (kanvas 256):** dua batang plus lebar 50, panjang 212, ujung bulat penuh (rx 25), berpusat di 128. Sapuan seperempat lingkaran R 106 / r 74, berjarak 13 dari tepi batang.
- **Potongan kecil** (`final/kapandok-symbol-small.svg`): batang lebih tebal (64) dan sapuan berupa juring penuh. Dipakai otomatis untuk favicon, ikon aplikasi, dan ukuran di bawah 32 px.

## 2. File
| Kebutuhan | File |
|---|---|
| Master (hitam, untuk diolah) | `final/kapandok-symbol.svg`, `final/kapandok-horizontal.svg`, `final/kapandok-stacked.svg`, `final/kapandok-wordmark.svg` |
| Warna penuh (simbol biru, teks gelap) | `kit/color/*.svg` dan `*.png` (1200 px) |
| Satu warna: hitam, putih, biru | `kit/symbol/`, `kit/horizontal/`, `kit/stacked/` (`-black`, `-white`, `-mono-2f66e0`) |
| Web & aplikasi | `kit/symbol/favicon.ico`, `favicon.svg`, `favicon-16/32/48.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `maskable-512.png`, `site.webmanifest`, `head-snippet.html` |
| Ikon aplikasi di ubin biru | `kit/symbol/kapandok-symbol-app-icon.svg` |
| Presentasi & mockup | `presentation.html`, `slides/slide-01..05.png` |

Semua teks di logo sudah berupa path (tidak butuh font terpasang). Untuk cetak, ekspor SVG ke PDF/CMYK di aplikasi desain.

## 3. Ruang kosong
Sisakan ruang minimal **1 × x** di semua sisi, dengan **x = lebar batang plus**. Ruang ini ikut membesar dan mengecil bersama logo.

## 4. Ukuran minimum
| Versi | Layar | Cetak |
|---|---|---|
| Horizontal | 120 px lebar | 30 mm lebar |
| Bertumpuk | 72 px lebar | 18 mm lebar |
| Simbol | 16 px (pakai potongan kecil / favicon) | 6 mm |

## 5. Warna
| Nama | HEX | RGB | CMYK (perkiraan) |
|---|---|---|---|
| Biru KapanDok (`primary`) | #2F66E0 | 47 102 224 | 79 54 0 12 |
| Teks gelap (`on-surface`) | #252527 | 37 37 39 | 5 5 0 85 |
| Putih | #FFFFFF | 255 255 255 | 0 0 0 0 |

Pantone terdekat sekitar 2727 C; cocokkan dengan swatch fisik sebelum cetak.

**Pasangan logo dan latar yang disetujui:** warna penuh di atas putih atau `surface` (#F7F8FA) · putih di atas biru #2F66E0 · putih di atas gelap #252527 · hitam di atas putih. Di atas foto, pakai versi putih atau hitam di area yang tenang.

## 6. Tipografi
- Wordmark dan UI: **Plus Jakarta Sans** (wordmark = Bold 700, sudah diubah jadi path).
- Lisensi: SIL Open Font License 1.1 (`fonts/OFL.txt`), boleh untuk logo dan penggunaan komersial.

## 7. Jangan
Jangan ditarik atau dipipihkan · jangan diberi warna di luar palet · jangan diputar · jangan diberi bayangan, garis tepi, gradasi, atau efek · jangan memindah sapuan ke kuadran lain · jangan mengubah ukuran atau jarak simbol dan teks di lockup · jangan mengetik ulang "KapanDok" dengan font lain · jangan menaruh di latar ramai tanpa wadah.

## 8. Catatan
- Logo ini belum melalui penelusuran merek. Sebelum dipakai di luar lomba, cek pangkalan data merek DJKI (pdki-indonesia.dgip.go.id) dan pencarian gambar terbalik; tanda plus generik dipakai banyak pihak, jadi kekuatan pembedanya ada di sapuan jam.
- Tanda plus sengaja dibuat biru, bukan merah: palang merah dilindungi hukum (UU 1/2018 tentang Kepalangmerahan), jadi logo jangan pernah dibuat merah di atas putih.
