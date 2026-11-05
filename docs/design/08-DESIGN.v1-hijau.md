---
version: alpha
name: "KapanDok"
description: "Tenang, jelas, dan dapat dipercaya: jam yang penting tampil besar, sisanya diam."
colors:
  primary: "#0F5C55"
  on-primary: "#FFFFFF"
  secondary: "#E3EEEC"
  on-secondary: "#0F5C55"
  neutral: "#F5F3EE"
  surface: "#FFFFFF"
  on-surface: "#1C2629"
  on-surface-muted: "#56656B"
  outline: "#D9DED9"
  info: "#1B6AA3"
  success: "#1E7A46"
  warning: "#F2C46B"
  danger: "#B42318"
  on-danger: "#FFFFFF"
  focus-ring: "#0F5C55"
typography:
  display-time:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "28px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  headline-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "22px"
    fontWeight: 650
    lineHeight: 1.25
  title:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.35
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.2
  label-caps:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: "24px"
  margin: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "12px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-danger}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: "44px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: "44px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
  caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-sm}"
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
  badge-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-danger}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
  badge-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
  sim-label:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
  divider:
    backgroundColor: "{colors.outline}"
  focus-ring:
    backgroundColor: "{colors.focus-ring}"
---

# KapanDok Design System

> Sumber kebenaran untuk semua kerja UI. Format: [Google DESIGN.md spec](https://github.com/google-labs-code/design.md) (alpha). Token di YAML di atas adalah nilai resmi; jangan pakai warna, ukuran, radius, atau shadow di luar token.
> Status: Draf, menunggu ACC · Kemiripan referensi: belum diukur (tanpa preview) · Lint: 0 error, 0 warning (2026-10-12)

## Overview

Tenang, jelas, klinis tanpa terasa dingin, dan dapat dipercaya. Pengguna utama: **petugas poli** yang memantau banyak sesi sekaligus di komputer poli pada pagi yang sibuk, dan **pasien rawat jalan termasuk lansia** yang membuka halaman dari link WhatsApp di HP. Kesan yang dikejar: "jam yang saya perlukan langsung terlihat, dan saya percaya angkanya". Kepadatan **sedang** untuk dashboard, **lapang** untuk halaman pasien.

Mode permukaan: **Operate** (dashboard petugas/admin) dan **Read** yang sangat singkat (halaman pasien).

- **Referensi:** mockup WhatsApp proyek ini (`docs/riset/lampiran-c/mockup_wa.png`), yang menjadi titik awal nuansa: latar kertas hangat, teks besar, satu warna aksen hijau tua. Web tidak meniru WhatsApp; ia memakai hijau pinus yang berbeda dari hijau merek WhatsApp.
- **Dihindari:**
  - Gradasi ungu/biru khas aplikasi AI.
  - Kartu ikon + judul + teks yang sama besar sebagai struktur halaman.
  - Angka metrik raksasa tanpa konteks.
  - Glassmorphism.
  - Emoji sebagai ikon.
  - Label kecil di atas judul (eyebrow).
- **Mode:** light saja (dipakai di ruang poli yang terang dan di HP siang hari).

## Colors

Satu aksen hijau pinus untuk aksi; warna status hanya untuk status sesi dan pesan.

- **Primary (#0F5C55):** satu aksi utama per layar (mis. "Buka sesi", "Hadir pada jam ini"), item sidebar aktif, focus ring.
- **Secondary (#E3EEEC) / on-secondary (#0F5C55):** tombol sekunder, latar baris terpilih, pita "sesuai prediksi".
- **Neutral (#F5F3EE) / Surface (#FFFFFF):** latar halaman kertas hangat / panel dan tabel.
- **On-surface (#1C2629) / On-surface-muted (#56656B):** teks utama / teks pendukung (rentang prediksi, waktu pembaruan, ID).
- **Outline (#D9DED9):** divider dan border 1px.
- **Info (#1B6AA3):** rentang prediksi di grafik dan timeline, tautan.
- **Status:**
  - Success (#1E7A46): tepat waktu, hadir.
  - Warning (#F2C46B, teks gelap): terlambat, menunggu konfirmasi, label "Data simulasi".
  - Danger (#B42318): batal, gagal kirim.
- Warna masuk lewat data dan konten (status, rentang, grafik), bukan lewat tombol dan ikon dekoratif. Status selalu disertai teks atau ikon, tidak hanya warna.

## Typography

**Plus Jakarta Sans** (dirancang di Indonesia), dimuat lewat `next/font/google` sehingga di-host sendiri saat build, dengan fallback `ui-sans-serif, system-ui, sans-serif`. Satu keluarga font untuk semua; hierarki lewat ukuran, ketebalan, dan warna.

- **Semua jam dan angka memakai `font-variant-numeric: tabular-nums`** supaya kolom jam rata.
- **display-time (40px):** hanya untuk jam terpenting di layar, mis. "10.15" (mulai praktik) di P11 dan "10.45" (saran berangkat) di P4.
- **Headline:** judul halaman (`headline-lg`) dan judul panel (`headline-md`).
- **Body:** paragraf 16px; teks pendukung 14px `on-surface-muted`.
- **Label caps:** hanya untuk header kolom tabel; tidak pernah di atas judul.
- Format jam Indonesia: `10.15` (titik), rentang `10.05-10.30`.

## Layout

- **Grid & margin:** 12 kolom di desktop, gutter 24px, margin 32px; satu grid untuk semua layar.
- **Container:** dashboard max-width 1280px; halaman pasien max-width 480px, rata tengah.
- **Breakpoint & navigasi:**

| Nama | Lebar | Grid | Navigasi |
|---|---|---|---|
| Mobile | < 768px | 1 kolom, gutter 16px | Burger 44×44 + drawer |
| Tablet | 768-1199px | 2 kolom | Burger + drawer |
| Desktop | ≥ 1200px | 12 kolom, max 1280px | Sidebar terlihat (dapat diciutkan menjadi rail ikon) |

- **Drawer:** kiri, lebar ≤ 85vw, scrim; tutup lewat scrim, tombol tutup, Esc, atau memilih item; `aria-expanded` pada burger, fokus masuk ke drawer, terkunci, lalu kembali ke burger; scroll halaman terkunci.
- **Urutan konten mobile (dashboard):** sesi yang butuh perhatian, lalu sesi lain, lalu ringkasan pesan.
- **Target sentuh:** ≥ 44px di bawah 1200px, ≥ 36px di desktop. Body ≥ 16px di mobile. Tanpa scroll horizontal di 360px; tabel antrean berubah jadi daftar kartu baris di bawah 768px.
- **Kepadatan:** sedang di dashboard, lapang di halaman pasien. Elemen yang berkaitan dirapatkan (jam + rentang + alasan satu kelompok).
- **Label "Data simulasi":** komponen `sim-label`, selalu terlihat di pojok kanan atas header setiap halaman selama memakai data simulasi.

**Pola per jenis halaman:**

| Jenis halaman / layar | Tugas | Pola layout | Info utama (besar) | Info pendukung (kecil) |
|---|---|---|---|---|
| Dashboard (P10) | Tahu sesi mana yang butuh perhatian | Daftar baris sesi (bukan kartu grid); grup "Perlu perhatian" di atas, lalu "Berjalan normal" | Jam mulai prediksi + alasan satu kalimat | Jadwal resmi, rentang, konfirmasi dokter, progres pesan (terkirim/dibaca/hadir) |
| Detail (P11) | Pantau satu sesi | Kepala sesi (dokter, jam besar, alasan, aksi) + tabel antrean di bawah; kolom kanan sempit: timeline sinyal | "10.15" + rentang + alasan | Sumber sinyal, waktu pembaruan |
| Daftar (P12, P13, P16, P19) | Temukan dan tindak lanjuti item | Tabel dengan pencarian dan filter status di atas | Nama + masalah/status | ID, waktu, kontak |
| Form (P17, P20) | Ubah data | Satu kolom, label di atas input, tombol simpan di bawah; opsi lanjutan dilipat | Field wajib | Bantuan di bawah input |
| Laporan (P15) | Lihat apakah membaik | Baris angka ringkas (4 angka kecil-menengah, bukan raksasa) + grafik garis tren + tabel per poli | Tren rerata tunggu dan % > 60 mnt | Cakupan interval, MAE, periode |
| Pasien publik (P1, P4) | Tahu kapan berangkat | Satu kolom 480px; satu jam besar; tombol utama lebar penuh | Saran berangkat / perkiraan mulai | Dokter, poli, antrean, waktu pembaruan |
| Auth (P7) | Masuk | Panel tengah 400px di atas latar neutral | Kolom email & password | Nama RS |
| Kosong / error | Jelaskan dan beri jalan keluar | Teks singkat + satu aksi | Apa yang terjadi | Cara memperbaiki |

**Konten spesifik layar Fase 0** (data: `docs/seed/mockup-data.json`, snapshot 08.50, Senin 9 November 2026):
- **P10 Hari ini:**
  - Judul "Hari ini, Senin 9 November".
  - Grup **Perlu perhatian:**
    - dr. Agus Prasetyo (Bedah): batal, "9 dari 14 pasien sudah memilih slot pengganti".
    - dr. Dewi Anggraini (Anak): menunggu konfirmasi dokter, prediksi 10.20 (10.10-10.35), "Masih ada 6 pasien visite rawat inap".
    - dr. Rina Setyaningsih (Penyakit Dalam): terlambat terkonfirmasi, prediksi 10.15 (10.05-10.30), pesan 22 terkirim · 17 dibaca · 12 hadir · 1 jadwal ulang.
  - Grup **Berjalan normal:** dr. Bambang Hartono (Kebidanan, sudah mulai 08.05) dan dr. Lestari Wulandari (Mata, 09.30 tepat waktu).
- **P11 Detail sesi dr. Rina:**
  - Kepala: "Mulai 10.15" (display-time), "rentang 10.05-10.30", alasan "Tindakan di OK 2 berjalan 40 menit melewati estimasi", konfirmasi "Sesuai prediksi, dr. Rina 08.41".
  - Aksi utama "Kirim ulang ke 5 pasien yang belum membaca". Aksi sekunder di ⋯: ubah jam mulai, batalkan praktik.
  - Tabel 22 pasien: no, nama, jenis, slot awal, jam datang, perkiraan dipanggil, status pesan. Baris 12 Ibu Sri Wahyuni: 10.50 → 11.15, dipanggil 11.30, Hadir.
- **P1 Cek jadwal (390px):** daftar 5 dokter hari ini dengan perkiraan mulai; Bedah tampil "Praktik dibatalkan". Kolom cari poli. Tautan "Punya kode booking?".
- **P4 Jam datang `KD-4812` (390px):** "Saran berangkat 10.45" (display-time), "Perkiraan dipanggil 11.30", antrean 12, dr. Rina Setyaningsih, Sp.PD, Poli Penyakit Dalam. Status "Kehadiran tercatat" (sudah menekan Hadir di WA). Aksi sekunder "Jadwal ulang". Teks "Diperbarui 08.44".
- **P15 Laporan:** periode "Simulasi 300 sesi". Angka: rerata tunggu 35,5 → 16,8 menit; > 60 menit 20,2% → 4,6%; cakupan interval 93,4%; MAE 16,0 menit. Grafik batang 4 strategi (A, B1, B2, C) dengan warna dari palet, plus catatan "Data simulasi (sintetis), bukan data rumah sakit".

## Elevation & Depth

Datar dengan border tipis. Bayangan hanya untuk lapisan yang melayang:
- `sm: 0 1px 2px rgba(28,38,41,.06)` untuk panel.
- `md: 0 12px 32px -8px rgba(28,38,41,.18)` untuk popover, drawer, dan modal.

Tabel dan baris tidak memakai bayangan.

## Shapes

- **Radius:**
  - `sm` (6px): badge persegi dan label simulasi.
  - `md` (10px): tombol dan input.
  - `lg` (14px): panel.
  - `full`: badge status.
- **Ikon:** **lucide-react**, satu gaya outline, stroke 1.75, ukuran 16px (inline) dan 20px (navigasi). Ikon kunci:
  - `Clock` (prediksi), `Stethoscope` (dokter), `MessageCircle` (pesan), `CheckCheck` (dibaca), `CalendarClock` (jadwal ulang), `CircleAlert` (perlu perhatian), `BarChart3` (laporan).
  - Tanpa emoji sebagai ikon.
- **Gambar/ilustrasi:** tidak dipakai. Empty state cukup teks dan satu ikon 20px.

## Components

- **Sumber komponen:**
  - **shadcn/ui** untuk Button, Input, Table, Badge, Tabs, Dialog, DropdownMenu, Tooltip, Sheet (drawer mobile), Chart. Variabel tema shadcn dipetakan ke token di atas.
  - **Sidebar:** animated sidebar dari 21st.dev (Aceternity), diadaptasi ke token. Isinya:
    - Logo teks "KapanDok".
    - Menu petugas: Hari ini, Tindak lanjut (badge jumlah), Pasien.
    - Menu petugas juga memuat Riwayat.
    - Grup admin: Laporan, Dokter, Poli, Jadwal praktik, Pengguna, Pengaturan, Mode demo.
    - Kartu akun di bawah: nama + peran, menu Profil & keamanan, Keluar.
    - Jangan memakai sidebar shadcn dan jangan avatar bulat bergradasi.
  - Selebihnya ditulis sendiri.
- **Baris sesi (P10):** satu baris per dokter, berisi:
  - Kiri: nama dokter dan poli.
  - Tengah: jam prediksi (title, tabular) + rentang kecil + alasan satu kalimat.
  - Kanan: badge status + progres pesan sebagai teks "17 dari 22 dibaca", bukan progress ring.
  - Seluruh baris bisa diklik (`<a>`) menuju P11; focus ring terlihat.
- **Kepala sesi (P11):** jam display-time, rentang dan alasan di bawahnya, chip sumber (Model / Dokter), aksi utama di kanan.
- **Tabel antrean:**
  - Header label-caps, angka dan jam rata kanan dan tabular.
  - Status pesan memakai badge + ikon:
    - Hadir: success, `CheckCheck`.
    - Dibaca: info, `Eye`.
    - Terkirim: outline netral, `Check`.
    - Jadwal ulang: warning, `CalendarClock`.
  - Baris jadwal ulang punya tautan ke Tindak lanjut.
- **Button:** primary untuk satu aksi utama per layar, tidak kapital semua; label menyebut konsekuensi ("Kirim ulang ke 5 pasien").
  - Hover: gelapkan 6%.
  - Active: gelapkan 10%.
  - Focus: ring 2px `focus-ring` dengan offset 2px.
  - Disabled: opacity .5.
  - Loading: spinner, label tetap.
- **Input:** label selalu ada di atas; error memakai `danger` + pesan di bawah input yang menyebut cara memperbaiki.
- **Badge status:** teks singkat ("Batal", "Menunggu dokter", "Terlambat 75 mnt", "Tepat waktu").
- **Label "Data simulasi":** `sim-label`, ikon `FlaskConical` 16px + teks.
- **Halaman pasien:** tombol utama lebar penuh 52px; teks minimal 18px untuk jam pendukung; satu jam besar saja.
- **Toast:** konfirmasi aksi petugas, 4 detik, bisa ditutup.
- **Empty state:** "Belum ada sesi praktik hari ini." + aksi "Lihat jadwal minggu ini".
- **Skeleton:** baris abu-abu `outline` untuk tabel dan baris sesi saat loading.
- **Motion:**
  - 180ms, easing `cubic-bezier(0.2, 0.8, 0.2, 1)`, untuk drawer, popover, dan pembaruan jam (fade singkat saat angka berubah).
  - Hormati `prefers-reduced-motion`.
  - Tidak ada animasi masuk berulang di setiap bagian.

## Do's and Don'ts

**Prinsip UX (wajib, semua layar)**

| # | Prinsip | Penerapan di projek ini |
|---|---|---|
| 1 | Desain untuk sistem: tahan variasi konten | Nama dokter panjang ("dr. Bambang Hartono, Sp.OG") tidak memecah baris jam; sesi tanpa pasien; 60 pasien dalam satu sesi; rentang "sudah mulai" atau "batal" menggantikan jam |
| 2 | Konsisten | Satu grid, Plus Jakarta Sans saja, lucide saja; format jam selalu `10.15` |
| 3 | Hierarki | Jam prediksi paling besar; rentang dan sumber kecil `on-surface-muted`; judul tidak lebih besar dari jam penting |
| 4 | Info di titik keputusan | Alasan keterlambatan tepat di bawah jam; status pesan di baris pasien yang sama |
| 5 | Konsekuensi terlihat sebelum aksi | "Kirim ulang ke 5 pasien"; "Batalkan praktik: 22 pasien akan ditawari slot pengganti" di dialog konfirmasi |
| 6 | Kurangi hambatan | Aksi utama sesi selalu terlihat di kepala sesi; header tabel lengket saat scroll; pilihan cepat +15/+30/+60 sebelum input jam manual |
| 7 | Hapus yang berlebihan | Tidak ada "Status: Terlambat" bila badge sudah bilang "Terlambat"; tidak ada ID internal di layar petugas |
| 8 | Detail premium | Divider 1px `outline`; jarak antar-kelompok 24px, dalam kelompok 8px; label-caps hanya di header tabel |
| 9 | Aksi utama jelas tapi tidak agresif | Satu tombol primary per layar; aksi berbahaya (batal praktik) di menu ⋯ + dialog |

**Anti tampilan AI**

| # | Aturan | Penerapan |
|---|---|---|
| A1 | Tanpa emoji sebagai ikon | lucide-react saja |
| A2 | Tanpa warna bawaan AI | Hanya token; warna lewat status dan rentang, bukan dekorasi |
| A3 | Satu layar, satu tugas | P10 memilih sesi; P11 memantau satu sesi; P12 menindaklanjuti. Tidak menumpuk laporan di dashboard |
| A4 | Navigasi fokus | Sidebar petugas 3 item; admin di grup sendiri; profil di kartu akun |
| A5 | Elemen ramai dirapikan | Aksi sekunder di ⋯; jam rata kanan di tabel; kode booking kecil |
| A6 | Hapus elemen tanpa fungsi | Tidak ada kartu statistik dekoratif atau tombol "Lihat semua" yang tidak ke mana-mana |
| A7 | Wadah sesuai isi | Tambah pengguna dan ubah jam mulai = modal; opsi lanjutan pengaturan dilipat |
| A8 | Data yang kaya dan bisa dibandingkan | P11 timeline sinyal (operasi, visite, konfirmasi); P15 grafik garis tren + tabel per poli yang bisa diurutkan |
| A9 | Teks tanpa em-dash | Semua teks UI memakai titik, koma, titik dua, atau kurung; rentang `10.05-10.30` |
| A10 | Konten realistis | Nama dari `mockup-data.json` (Ibu Sri Wahyuni, dr. Rina Setyaningsih, Sp.PD); angka tidak bulat sempurna; tanpa kata pemasaran |
| A11 | Tinggi layar & font stabil | `min-h-[100dvh]`; font via `next/font` |

**Aksesibilitas**
- Do: kontras teks ≥ 4.5:1, teks besar/elemen UI ≥ 3:1; focus selalu terlihat; semua aksi bisa lewat keyboard; target sentuh sesuai Layout; label untuk setiap input; `aria-label` untuk ikon tanpa teks; tabel memakai `<th scope>`; status juga tertulis, bukan hanya warna; `lang="id"`.
- Don't: menyampaikan informasi hanya lewat warna; teks warning (#F2C46B) di atas putih (kontras rendah; pakai sebagai latar dengan teks gelap).

**Checklist review UI**
- [ ] Hanya memakai token dari file ini
- [ ] Semua state komponen ada (hover, focus, disabled, loading, empty, error)
- [ ] Responsif di 375px, 768px, 1440px tanpa scroll horizontal
- [ ] Lulus Prinsip UX 1-9 dan Anti tampilan AI A1-A11, diuji dengan konten ekstrem
- [ ] Label "Data simulasi" terlihat di setiap layar
- [ ] `lint` 0 error dan tanpa warning `contrast-ratio`

## Deviations from Reference

| Aspek | Referensi | Di sini | Alasan |
|---|---|---|---|
| Warna aksen | Hijau WhatsApp #008069 | Hijau pinus #0F5C55 | Tidak meniru merek WhatsApp; kontras lebih tinggi dengan putih |
| Font | Font sistem WhatsApp | Plus Jakarta Sans | Identitas produk sendiri; angka tabular |

## Implementation

Token tidak ditulis ulang di kode; hasilkan dari file ini (Windows: pakai alias `designmd`):

```bash
npx -p @google/design.md designmd lint docs/08-DESIGN.md
npx -p @google/design.md designmd export --format css-tailwind docs/08-DESIGN.md > web/src/styles/theme.css
```

Format lain: `json-tailwind` (Tailwind v3), `dtcg` (W3C tokens). Setelah mengubah token: jalankan ulang `lint` dan `export`, lalu `diff` terhadap versi sebelumnya.

Preview dan penyamaan referensi ≥95% bisa dijalankan nanti lewat skill `project-design`.

## Changelog

| Tanggal | Perubahan |
|---|---|
| 2026-10-12 | Dokumen awal, kemiripan belum diukur (tanpa preview). Lint resmi: 0 error, 0 warning. |
