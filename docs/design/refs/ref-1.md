# Ref 1: dashboard "Health Records" (screenshot Dribbble, 1200×900)

Sumber: gambar dari user (`ref-1.png`). Diambil: feel keseluruhan, tipografi, layout bento. Aksen hijau-lime **diganti biru elektrik** (permintaan user). Ukuran diestimasi dari screenshot (lebar aplikasi ±1080 px di gambar, dianggap ±0,83× ukuran asli 1440 px).

| Aspek | Nilai | Sumber | Keyakinan |
|---|---|---|---|
| Latar luar (bingkai presentasi) | `#E0E4E7` | piksel | pasti (tidak dipakai di app) |
| Latar aplikasi | `#FFFFFF` | piksel | pasti |
| Panel/kartu | `#FAFAFA` | piksel | pasti |
| Panel tingkat 2, rail, pil abu | `#F1F2F6`, `#ECEDF1` | piksel | pasti |
| Hitam grafit (bar, tombol utama) | `#2E2F34` / `#2F3035` | piksel | pasti |
| Teks utama | `#252527` | piksel | pasti |
| Teks abu judul dua-warna | `#ADADAF` | piksel | pasti (kontras 2,2:1, gagal AA) |
| Label kecil abu | `#A6A6A6`-`#C7C7C7` | piksel | pasti (gagal AA) |
| Aksen lime (diganti biru) | `#D6FF61`, tag `#D5F475`/`#DAFF73` | piksel | pasti |
| Font | geometris grotesk, angka tipis lebar: kandidat Plus Jakarta Sans / Manrope / General Sans | bentuk huruf | perkiraan |
| Judul halaman dua baris | ~35 px di gambar → ~42-44 px, weight 400, abu + hitam | estimasi | perkiraan |
| Angka besar | ~30 px → ~36-40 px, weight 300-400, tracking rapat | estimasi | perkiraan |
| Judul panel | ~13 px → ~16 px, weight 500, diawali kotak aksen 12 px radius 3 | estimasi | perkiraan |
| Label kecil kapital | ~8 px → ~10 px (terlalu kecil) | estimasi | perkiraan |
| Radius panel | ~18-20 px → ~24 px | estimasi | perkiraan |
| Radius kontainer aplikasi | ~24 px → ~28 px | estimasi | perkiraan |
| Kontrol pil (tanggal, Weekly, rentang) | tinggi ~38 px → ~46-48 px, radius penuh | estimasi | perkiraan |
| Tombol ikon bulat | ~44 px, border tipis abu | estimasi | perkiraan |
| Chip filter | radius ~8 px → ~10 px, aktif berisi aksen, lain putih + border | estimasi | perkiraan |
| Tag perubahan (↗ 16%) | pil kecil aksen, teks gelap 10-11 px | estimasi | perkiraan |
| Bar grafik | pil penuh, grafit; bar terpilih aksen + tooltip putih | gambar | pasti |
| Jarak antar panel | ~14 px → ~16 px; padding panel ~16 px → ~20-24 px | estimasi | perkiraan |
| Elevasi | panel tanpa bayangan (tonal + border sangat halus); kontainer aplikasi bayangan lebar lembut | gambar | pasti |
| Ikon | outline 1,5 px, beberapa filled (hati, dumbbell) | gambar | pasti (campur) |

**Ciri non-angka:** bento panel berbeda ukuran; kepadatan sedang-lapang; banyak ruang putih; angka besar sebagai pusat perhatian; satu warna aksen terang untuk sorotan; hitam grafit sebagai "berat" visual; ilustrasi 3D/foto di beberapa panel.

## Audit UX referensi (Prinsip 1-9)
| # | Temuan | Dampak di KapanDok |
|---|---|---|
| 1 | Label abu `#ADADAF` dan label kecil 8-10 px tidak terbaca di layar poli | Teks abu dinaikkan ke varian yang lolos AA; label minimal 12 px |
| 2 | Ikon campur outline dan filled (hati, dumbbell filled) | Satu gaya: lucide outline |
| 3 | Banyak angka raksasa berebut perhatian (19,365.29, 139, 97.5%, 89 bpm) tanpa konteks | Satu angka terpenting per panel; panel lain angka sedang |
| 4 | Angka metrik jauh dari maknanya ("KCAL Totally" kecil di bawah) | Label makna tepat di samping/atas angka, ukuran cukup |
| 6 | Kontrol tanggal/rentang dan CTA "Weekly" terpisah dari panel yang dipengaruhinya | Kontrol periode ditempatkan di header panel terkait |
| 7 | Panel promosi/dekoratif ("Get more exposure", "Take a breath", "blockchain") | Tidak disalin; setiap panel harus membantu tugas layar |
| 8 | Kotak warna di depan judul panel tanpa makna | Dipakai, tetapi warnanya bermakna (status panel) |
