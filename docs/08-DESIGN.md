---
version: alpha
name: "KapanDok"
description: "Bento padat yang terang dan tenang: biru sebagai warna utama, abu kebiruan lembut, angka ringan yang mudah dibaca."
colors:
  primary: "#2F66E0"
  on-primary: "#FFFFFF"
  primary-soft: "#EAF1FF"
  on-primary-soft: "#1E4FBF"
  secondary: "#EEF2F8"
  on-secondary: "#252527"
  neutral: "#F3F5F8"
  surface: "#FFFFFF"
  inverse: "#142D57"
  on-inverse: "#FFFFFF"
  surface-alt: "#EEF2F8"
  on-surface: "#252527"
  on-surface-muted: "#5C5D63"
  on-surface-subtle: "#696B73"
  outline: "#E4E8EF"
  chart-1: "#2F66E0"
  chart-2: "#7A8699"
  success-soft: "#E7F6EC"
  on-success-soft: "#166534"
  warning-soft: "#FFF4DB"
  on-warning-soft: "#8A5A00"
  danger-soft: "#FDECEA"
  on-danger-soft: "#B42318"
  danger: "#D92D20"
  on-danger: "#FFFFFF"
  focus-ring: "#2F66E0"
typography:
  display-title:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  display-time:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "44px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  metric:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.35
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
  label-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.2
  caption:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
  label-caps:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  xs: "4px"
  sm: "10px"
  md: "16px"
  lg: "22px"
  xl: "28px"
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  panel: "20px"
  gutter: "14px"
  margin: "28px"
components:
  dashboard-highlight:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "16px"
    height: "46px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: "46px"
  button-icon:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: "44px"
  nav-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: "44px"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-danger}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: "46px"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    height: "34px"
  chip:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    height: "34px"
  tag-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
  tag-soft:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.on-primary-soft}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
  input:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    height: "46px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.panel}"
  panel-alt:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.panel}"
  panel-alt-muted:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-sm}"
  panel-alt-time:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.primary}"
    typography: "{typography.display-time}"
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
  page-title-subtle:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.display-title}"
  caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-sm}"
  time-highlight:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.display-time}"
  badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.on-success-soft}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
  badge-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.on-warning-soft}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
  badge-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.on-danger-soft}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
  badge-neutral:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
  sim-label:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.on-warning-soft}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
  chart-series-1:
    backgroundColor: "{colors.chart-1}"
    rounded: "{rounded.xs}"
  chart-series-2:
    backgroundColor: "{colors.chart-2}"
    rounded: "{rounded.xs}"
  divider:
    backgroundColor: "{colors.outline}"
  focus-ring:
    backgroundColor: "{colors.focus-ring}"
---

# KapanDok Design System

> Sumber kebenaran untuk semua kerja UI. Format: [Google DESIGN.md spec](https://github.com/google-labs-code/design.md) (alpha). Token di YAML di atas adalah nilai resmi; jangan pakai warna, ukuran, radius, atau shadow di luar token.
> Status: revisi visual disetujui pengguna, 12 Oktober 2026. Dokumentasi diselaraskan dengan implementasi; hasil pemeriksaan versi sebelumnya bukan bukti validasi revisi ini.

## Overview

**Creative North Star: "Koordinasi poli yang tenang"**

Kanvas abu muda dengan kartu putih, hierarki tegas, dan area kerja penuh lebar mengikuti revisi pengguna dengan acuan layout K-DASP. **Biru adalah warna utama**: tombol utama, menu yang dipilih, chip terpilih, jam prediksi terpenting, dan seri data utama di grafik. Kartu putih berada di atas kanvas abu kebiruan yang lembut supaya serasi dengan biru dan nyaman dilihat lama di layar poli. Status memakai badge pastel dengan teks gelap, bukan warna pekat. Angka besar berbobot tegas menjadi pusat perhatian di setiap panel. K-DASP memberi acuan struktur; identitas layanan kesehatan KapanDok tetap biru.

**Key Characteristics:**
- Kanvas abu muda, kartu putih, status pastel.
- Sidebar klik yang mengubah lebar area kerja.
- Angka tegas dan informasi operasional yang mudah dipindai.

Pengguna: **petugas poli** di komputer poli pada pagi yang sibuk (Operate) dan **pasien termasuk lansia** di HP (Read singkat).

- **Referensi:** R1 dashboard "Health Records" (`docs/design/refs/ref-1.png`, analisis di `ref-1.md`). Diambil:
  - Feel keseluruhan.
  - Tipografi.
  - Layout bento yang padat.
  - Bentuk pil dan tombol ikon bulat.
- **Diubah dari referensi atas permintaan user:**
  - Lime dan hitam diganti **biru sebagai warna utama**.
  - Warna dibuat lebih lembut.
  - Grafik memakai **bentuk standar** (bar persegi dengan sumbu dan garis bantu), bukan bar pil bergaya.
- **Dihindari:**
  - Panel promosi atau dekoratif.
  - Ilustrasi 3D dan foto stok.
  - Angka tanpa makna.
  - Teks abu yang gagal kontras.
  - Warna status pekat.
  - Emoji sebagai ikon.
  - Label kecil di atas judul.
  - Gradasi dan glassmorphism.
- **Mode:** light.

## Colors

Satu warna utama (biru), lapisan abu kebiruan, dan status pastel.

- **Primary (#2F66E0):**
  - Pil aksi utama (satu per layar) dan ikon navigasi aktif. Item sidebar aktif memakai permukaan putih dan ikon biru; token `nav-active` tetap tersedia untuk varian pil.
  - Chip terpilih, jam prediksi terpenting, dan seri utama grafik.
  - Focus ring.
- **Primary-soft (#EAF1FF) / on-primary-soft (#1E4FBF):** tag halus ("17 dibaca"), latar baris terpilih, dan hover item navigasi.
- **Secondary (#EEF2F8):** pil kontrol (filter poli, waktu pembaruan) dan input.
- **Neutral / Surface / Surface-alt:** masing-masing kanvas abu muda, kartu putih, dan lapisan abu kebiruan; nilai resmi mengikuti frontmatter. **Inverse / on-inverse:** panel sorotan dashboard navy dengan teks putih.
- **On-surface (#252527) / On-surface-muted (#5C5D63) / On-surface-subtle:**
  - Teks utama dan teks pendukung.
  - Teks abu terang hanya untuk baris pertama judul dua-warna, di latar putih, dengan ukuran ≥ 24px.
- **Outline (#E4E8EF):** border 1px dan divider.
- **Grafik:**
  - `chart-1` (#2F66E0): seri utama, mis. KapanDok atau "hari ini".
  - `chart-2` (#7A8699): seri pembanding.
  - Selalu ada legenda tertulis.
- **Status (pastel, teks gelap):**
  - Success-soft: tepat waktu, hadir.
  - Warning-soft: terlambat, menunggu konfirmasi, label "Data simulasi".
  - Danger-soft: batal, gagal kirim.
  - Danger pekat (#D92D20) hanya untuk tombol aksi berbahaya di dialog.

## Typography

**Plus Jakarta Sans** (dirancang di Indonesia), lewat `next/font/google`. Fallback: `ui-sans-serif, system-ui, sans-serif`.

- **Judul halaman** (`display-title`): judul utama tegas; konteks tanggal bila ada memakai teks pendukung kecil di atasnya. Dashboard memakai judul langsung dan deskripsi di bawah. Ukuran dan bobot resmi mengikuti frontmatter.
- **display-time** (44px/600): satu jam terpenting per layar, warna `primary`. Contoh: "10.15" di P10/P11, "10.45" di P4.
- **metric** (30px/600): angka utama panel lain.
- **title** (15px/500): judul panel (implementasi memakai bobot 600), diawali penanda kotak 6px radius 3px dengan warna bermakna (biru = data/AI, kuning = perlu perhatian, hijau = normal).
- **caption** (12px/500, minimal): satuan dan keterangan di samping angka.
- **label-caps:** header kolom tabel saja.
- Semua jam/angka memakai `tabular-nums`. Format jam `10.15`, rentang `10.05-10.30`.

## Layout

- **Bingkai:**
  - Kanvas abu muda `neutral`, kartu putih `surface`.
  - Sidebar desktop terbuka 248px secara default, diciutkan menjadi rail 80px lewat tombol klik. Tidak terbuka karena hover.
  - Area kerja mengambil seluruh lebar tersisa dan ikut bergeser saat sidebar beralih; tidak memakai batas lebar tengah 1360px atau 1500px.
  - Bar atas: pil cari di kiri; `sim-label` dan pil akun di kanan.
  - Padding horizontal area kerja: 32px desktop, 24px tablet, 16px mobile.
- **Grid bento desktop:** 12 kolom, gap `spacing.md`, tanpa max-width; panel radius 22px, padding 20px. Kepadatan **sedang-padat** seperti referensi: banyak panel kecil-menengah, ruang putih di dalam panel tetap ada.
- **Header halaman:**
  - Kiri: judul tegas dengan konteks pendukung bila dibutuhkan.
  - Kanan: pil kontrol + satu pil biru aksi utama.
  - Kontrol yang hanya memengaruhi satu panel ditaruh di header panel itu.
- **Breakpoint & navigasi:**

| Nama | Lebar | Grid | Navigasi |
|---|---|---|---|
| Mobile | < 768px | 1 kolom, gutter 16px | Burger 44×44 + drawer |
| Tablet | 768-1199px | 2 kolom bento | Burger + drawer |
| Desktop | ≥ 1200px | 12 kolom bento, penuh lebar tersisa | Sidebar 248px / rail 80px dengan tombol |

- **Drawer mobile/tablet saja:** kiri, ≤ 85vw, scrim; tutup lewat scrim, tombol tutup, Esc, atau pilih item; `aria-expanded`; fokus masuk, terkunci, lalu kembali; scroll terkunci.
- **Target sentuh:** ≥ 44px di bawah 1200px, ≥ 36px di desktop. Body ≥ 16px di mobile. Tanpa scroll horizontal di 360px; tabel antrean menjadi daftar baris di bawah 768px.

**Penempatan bento per layar Fase 0** (kolom dari 12; isi lengkap di `docs/09-MOCKUP-FASE0.md`):

| Layar | Baris 1 | Baris 2 | Baris 3 |
|---|---|---|---|
| Dashboard `/app/dashboard` | 4 ringkasan (3 kol masing-masing) | Alur sinyal ke jam datang (12 kol), lalu sorotan navy (4 kol) + aktivitas poli (8 kol) | Respons pasien (5 kol) + langkah berikutnya (7 kol) |
| P10 Hari ini | 4 panel ringkas (3 kol masing-masing): Sesi hari ini · Pasien terjadwal · Menunggu dokter · Perlu tindak lanjut. Setiap panel adalah tautan ke daftar terkait | **Perlu perhatian** (8 kol) · **Sesi paling terdampak** (4 kol, `panel-alt`) | **Keterlambatan mulai per dokter** (7 kol, grafik bar standar) · **Berjalan normal** (5 kol) |
| P11 Detail sesi | **Kepala sesi** (8 kol) · **Respons pasien** (4 kol, `panel-alt`) | **Antrean** (8 kol, tabel + chip filter) · **Timeline sinyal** (4 kol) | — |
| P15 Laporan | 4 panel angka (3 kol) | **Rerata tunggu per strategi** (8 kol, bar standar satu seri) · **Tabel strategi** (4 kol) | Catatan konsekuensi (12 kol) |
| P1, P4 (HP) | Satu kolom 480px: header, panel jam besar (`panel-alt`), panel detail, pil biru penuh | — | — |

**Pola jenis halaman berikutnya:**

| Jenis | Pola | Info utama | Info pendukung |
|---|---|---|---|
| Daftar (P12, P13, P16, P19, P30) | Panel lebar penuh: chip filter + tabel | Nama + status | ID, waktu |
| Detail (P29) | Bento 8 + 4: data utama + grafik pola | Pola keterlambatan | Kontak, jadwal |
| Form (P17, P20) | Panel 8 kol, input pil, opsi lanjutan dilipat | Field wajib | Bantuan |
| Auth (P7) | Panel 420px di tengah, judul dua-warna | Email, password | Nama RS |
| Kosong / error | Panel teks + satu pil aksi | Apa yang terjadi | Cara memperbaiki |

## Elevation & Depth

Tonal. Panel tanpa bayangan; dibedakan warna (`surface`, `surface-alt` di atas kanvas `neutral`). Bayangan hanya untuk lapisan melayang:
- Tooltip grafik: `0 6px 16px -4px rgba(37,37,39,.12)`.
- Popover, drawer, dan modal: `0 24px 48px -12px rgba(37,37,39,.20)`.

## Shapes

- **Radius:**
  - `full`: tombol, pil, input, tag.
  - `lg` (22px): panel.
  - `xl` (28px): modal dan drawer.
  - `sm` (10px): chip dan item sidebar.
  - `xs` (4px): sudut atas bar grafik.
  - Penanda judul panel: 3px.
- **Tombol ikon:** lingkaran 44px, latar putih, border 1px `outline`. Sidebar memakai item bersudut `sm`, permukaan putih saat aktif, dan ikon biru; hover berupa `primary-soft`.
- **Ikon:** **lucide-react**, outline, stroke 1.75, 18px di tombol bulat dan 16px inline.
- **Logo:** "Plus Waktu" dari `docs/brand/`. Sidebar dan header memakai `kit/color/kapandok-horizontal-color.svg` (tinggi 28-32px); favicon dan ikon PWA dari `kit/symbol/` (salin `head-snippet.html`). Simbol tidak pernah berwarna merah. Aturan lengkap: `docs/brand/PANDUAN-LOGO.md`.

## Components

- **Sumber komponen:**
  - **shadcn/ui** (Button, Input, Table, Badge, Tabs, Dialog, DropdownMenu, Tooltip, Sheet, Chart), variabel tema dipetakan ke token. `--primary` = biru; `--radius` = `rounded.lg`; tombol dan input dioverride ke `full`.
  - **Rail navigasi:** animated sidebar 21st.dev (Aceternity), diadaptasi.
    - Desktop default: label penuh pada sidebar 248px. Tombol mengubahnya ke rail 80px, menyembunyikan wordmark, label, dan tautan publik. Area kerja ikut mereflow.
    - Diciutkan: ikon tetap memiliki nama aksesibel; item aktif putih dengan ikon biru.
    - Mobile/tablet: drawer modal dengan scrim, Escape, perangkap fokus, pengembalian fokus, dan penguncian scroll.
    - Transisi lebar dan margin desktop 220ms ease; reduced motion meniadakan transisi.
    - Isinya:
      - Logo "KapanDok".
      - Menu petugas: Dashboard, Hari ini, Tindak lanjut (badge biru), Pasien, Riwayat.
      - Grup admin: Laporan, Dokter, Poli, Jadwal praktik, Pengguna, Pengaturan, Mode demo.
    - Bukan sidebar shadcn.
  - **Bar atas:** pil cari "Cari pasien atau kode booking"; `sim-label`; **pil akun** berisi inisial dalam lingkaran, nama, peran, dan chevron yang membuka menu Profil & keamanan / Keluar.
- **Pil kontrol:** `button-secondary`, ikon dalam lingkaran putih 30px di kiri, label, dan chevron untuk dropdown.
- **Pil aksi utama:** `button-primary` biru, label + ikon panah dalam lingkaran putih 30px. Satu per layar.
- **Panel bento:** judul `title` dengan penanda kotak bermakna; aksi panel (tombol ikon bulat 32px atau ⋯) di kanan; satu angka/jam utama dengan keterangan di sampingnya.
- **Panel ringkas (P10 baris 1):**
  - Isi: label `body-sm` muted, angka `metric`, dan keterangan `caption`.
  - Seluruh panel adalah tautan ke daftar terkait.
  - Bukan dekorasi: hanya angka yang dipakai petugas untuk memilih pekerjaan berikutnya.
- **Baris sesi:**
  - Nama dokter `title`, poli + jadwal `caption`.
  - Jam prediksi `metric` + rentang `caption`.
  - Alasan `body-sm` muted.
  - Badge pastel di kanan.
  - Seluruh baris adalah tautan ke P11.
- **Grafik (bentuk standar, Recharts):**
  - Bar persegi dengan sudut atas `xs`.
  - Garis bantu horizontal tipis `outline` (putus-putus), sumbu Y dengan satuan, label sumbu X.
  - Label nilai di atas bar.
  - Legenda tertulis bila lebih dari satu seri. Satu seri = `chart-1`; pembanding = `chart-2`.
  - Jangan menggabungkan satuan berbeda (menit dan %) dalam satu grafik.
  - Garis ambang opsional (mis. 30 menit) berupa garis putus-putus `on-surface-muted` dengan label.
  - Nilai non-angka (mis. "Batal") ditulis sebagai teks di posisi bar.
  - Tidak ada bar pil, sorotan neon, atau tooltip dekoratif yang selalu tampil.
- **Tag:** `tag-soft` (mis. "17 dibaca") atau `tag-primary` (mis. "+75 mnt"), dengan ikon panah 12px.
- **Chip filter:** `chip` (border outline) / `chip-selected` (biru).
- **Badge status:**
  - Pastel + ikon + teks.
  - Hadir: success `CheckCheck`.
  - Dibaca: `tag-soft` `Eye`.
  - Terkirim: neutral `Check`.
  - Jadwal ulang dan terlambat: warning `CalendarClock`/`Clock`.
  - Batal: danger `XCircle`.
- **Tabel antrean:** di dalam panel, header `label-caps` muted, jam rata kanan tabular, baris 48px.
- **Input:** pil `surface-alt`, label di atas, error memakai `on-danger-soft` + pesan.
- **Button state:**
  - Hover: biru 8% lebih gelap; pil abu memakai `primary-soft`.
  - Active: skala 0.98.
  - Focus: ring 2px `focus-ring`, offset 3px.
  - Disabled: opacity .5.
  - Loading: spinner + label tetap.
- **Halaman pasien:**
  - Panel jam `panel-alt` berisi "Saran berangkat" + `display-time` biru.
  - Pil biru penuh 52px.
  - Teks pendukung ≥ 16px.
- **Asisten petugas (P31):**
  - Pesan petugas: gelembung `primary` + `on-primary`, rata kanan, maks 520px.
  - Pesan asisten: tanpa gelembung, avatar simbol logo di lingkaran `primary-soft`, lalu pil jejak fungsi (`surface-alt`, caption) yang menyebut data yang dibaca.
  - Hasil data: tabel bergaris `outline` radius `sm`; di bawah 768px status pindah ke bawah nama sehingga tabel tetap dua kolom tanpa gulir samping.
  - Usulan aksi: kartu bergaris putus-putus `primary` berisi perubahan sebelum → sesudah dan batas berlaku. Struk aksi: kartu `success-soft` + tombol batal selama WA tertahan.
  - Angka, nama, dan status selalu dirender dari data, bukan dari teks LLM.
- **Toast, empty state, skeleton:**
  - Toast berupa pil gelap #252527 di bawah tengah, 4 detik.
  - Empty state: teks + satu pil.
  - Skeleton: blok `surface-alt`.
- **Motion:** 200ms `cubic-bezier(0.2, 0.8, 0.2, 1)`; hormati `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** gunakan kanvas abu muda dan kartu putih dengan aksen biru KapanDok.
- **Do** biarkan area kerja memenuhi lebar tersisa dan mereflow saat sidebar desktop ditoggle.
- **Do** pertahankan label Data simulasi, fokus terlihat, dan navigasi keyboard.

### Don't:
- **Don't** ubah sidebar desktop menjadi overlay atau membuka label hanya karena hover.
- **Don't** menyalin identitas warna K-DASP; referensinya adalah struktur layout.
- **Don't** memakai bayangan panel, gradasi, atau glassmorphism.

**Prinsip UX (wajib, semua layar)**

| # | Prinsip | Penerapan di projek ini |
|---|---|---|
| 1 | Desain untuk sistem | Panel tahan nama dokter panjang, sesi tanpa pasien, 60 pasien, status "batal" menggantikan jam |
| 2 | Konsisten | Satu grid bento, satu font, lucide outline, semua kontrol pil, satu warna utama |
| 3 | Hierarki | Satu angka/jam utama per panel; biru hanya untuk hal terpenting; status pastel tidak berebut perhatian |
| 4 | Info di titik keputusan | Alasan keterlambatan tepat di bawah jam; satuan di samping angka |
| 5 | Konsekuensi terlihat sebelum aksi | "Kirim ulang ke 5 pasien"; dialog batal: "22 pasien akan ditawari slot pengganti" |
| 6 | Kurangi hambatan | Pil aksi utama di header; panel ringkas langsung membuka daftar terkait; pilihan +15/+30/+60 sebelum input manual |
| 7 | Hapus yang berlebihan | Tanpa panel dekoratif; tanpa label "Status:" bila badge sudah jelas |
| 8 | Detail premium | Divider 1px `outline`; penanda kotak judul panel; jarak antar-panel `spacing.md` |
| 9 | Aksi utama jelas tapi tidak agresif | Satu pil biru per layar; aksi berbahaya di menu ⋯ + dialog |

**Anti tampilan AI**

| # | Aturan | Penerapan |
|---|---|---|
| A1 | Tanpa emoji | lucide outline |
| A2 | Tanpa warna bawaan AI | Hanya token; satu biru, abu kebiruan, status pastel |
| A3 | Satu layar, satu tugas | Bento padat, tapi setiap panel membantu tugas layar (P10: memilih pekerjaan berikutnya) |
| A4 | Navigasi fokus | Sidebar petugas 5 item termasuk Dashboard; admin di grup sendiri |
| A5 | Elemen ramai dirapikan | Aksi sekunder di ⋯; angka rata kanan di tabel |
| A6 | Hapus elemen tanpa fungsi | Panel ringkas adalah tautan; penanda kotak bermakna; tanpa tombol tanpa aksi |
| A7 | Wadah sesuai isi | Modal untuk ubah jam dan tambah pengguna |
| A8 | Data bisa dibandingkan | Grafik bar standar dengan sumbu, garis bantu, label nilai, dan legenda; tabel yang bisa diurutkan |
| A9 | Teks tanpa em-dash | Rentang `10.05-10.30` |
| A10 | Konten realistis | Data dari `mockup-data.json` |
| A11 | Tinggi layar & font stabil | `min-h-[100dvh]`; `next/font` |

**Aksesibilitas**
- Do:
  - Kontras teks ≥ 4.5:1, elemen grafik ≥ 3:1.
  - Focus terlihat dan semua aksi bisa lewat keyboard.
  - `aria-label` untuk tombol ikon.
  - Grafik punya label nilai dan padanan teks; status tertulis; `lang="id"`.
- Don't:
  - Memakai `on-surface-subtle` untuk teks < 24px.
  - Membedakan seri grafik hanya dengan warna tanpa legenda.

**Checklist review UI**
- [ ] Hanya memakai token dari file ini
- [ ] Semua state komponen ada (hover, focus, disabled, loading, empty, error)
- [ ] Responsif di 375px, 768px, 1440px tanpa scroll horizontal
- [ ] Lulus Prinsip UX 1-9 dan Anti tampilan AI A1-A11
- [ ] Label "Data simulasi" terlihat di setiap layar
- [ ] `lint` 0 error dan tanpa warning `contrast-ratio`

## Deviations from Reference

| Aspek | Referensi | Di sini | Alasan |
|---|---|---|---|
| Warna utama | Lime #D6FF61 + hitam untuk aksi/aktif | Biru #2F66E0 untuk aksi, aktif, dan sorotan | Permintaan user |
| Nuansa warna | Abu netral, status cerah | Abu kebiruan lembut, status pastel | Permintaan user: lebih nyaman dilihat |
| Grafik | Bar pil gelap + sorotan lime + tooltip melayang | Bar standar dengan sumbu, garis bantu, label nilai, legenda | Permintaan user: grafik normal agar tidak membingungkan; A8 |
| Teks abu | #ADADAF (2,2:1), label 8-10px | `on-surface-subtle` hanya untuk judul besar; teks kecil `on-surface-muted`; minimal 12px | Kontras AA; Prinsip UX 1 |
| Ikon | Outline + filled campur | lucide outline | Prinsip UX 2 |
| Panel | Ada panel promosi/dekoratif | Hanya panel yang dipakai untuk keputusan | Prinsip UX 7; A3, A6 |
| Bingkai luar | Kanvas abu + kontainer berbayang | Aplikasi penuh layar | Bingkai hanya presentasi |
| Font | Grotesk geometris (tidak teridentifikasi pasti) | Plus Jakarta Sans | Self-host, karakter mirip |

## Implementation

```bash
npx -p @google/design.md designmd lint docs/08-DESIGN.md
npx -p @google/design.md designmd export --format css-tailwind docs/08-DESIGN.md > web/src/styles/theme.css
```

Setelah mengubah token: `lint`, `export`, lalu `designmd diff` terhadap versi sebelumnya. Preview: `docs/design/preview.html`.

## Changelog

| Tanggal | Perubahan |
|---|---|
| 2026-10-12 | v1: gaya hijau pinus tanpa referensi (`docs/design/08-DESIGN.v1-hijau.md`) |
| 2026-10-12 | v2: mengikuti referensi R1, aksen biru elektrik, tombol grafit. Kemiripan ±90% |
| 2026-10-12 | v3: biru jadi warna utama (aksi, navigasi aktif), warna dilembutkan (abu kebiruan, status pastel), grafik standar, bento lebih padat. Lint 0 error, 0 warning. Kemiripan ±93% |

## Revisi visual disetujui pengguna, 12 Oktober 2026
Acuan terbaru adalah proyek K-DASP: kanvas abu muda, kartu putih, tipografi tegas, sidebar berkelompok yang dapat diciutkan dengan tombol. Area kerja memenuhi lebar tersisa dan ikut berubah saat sidebar beralih. Wordmark hilang pada rail. Identitas tetap biru, sorotan memakai navy inverse. Dashboard tambahan di `/app/dashboard` memakai data seed yang sama. Ketentuan revisi ini menggantikan ketentuan layout rail overlay sebelumnya.
