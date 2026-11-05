# 04 — TODO: Progres Build

> AI wajib memperbarui file ini setiap status task berubah. ID sama dengan 03-ARCHITECTURE.

**Legenda:** ⬜ Todo · 🟦 In Progress · ✅ Done · ⛔ Blocked · ✂️ Dipotong (scope cut)

**Target:** Fase 0 sebelum **15 Okt 2026 23.59 WIB** (proposal) · Fase 1-2 selama pembekalan 26 Okt-4 Nov 2026 · Fase 3 saat hackathon · **Update terakhir:** 2026-11-05

## Task
| ID | Task | Pemilik | Prioritas | Status | Bukti verifikasi / Catatan |
|---|---|---|---|---|---|
| T1 | Scaffold web + token + font | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T2 | Data mockup + tipe TS | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T3 | Shell: sidebar + header publik + label "Data simulasi" | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T4 | P10 Hari ini | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T5 | P11 Detail sesi dr. Rina | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T6 | P1 Cek jadwal (mobile) | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T7 | P4 Jam datang `KD-4812` (mobile) | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T8 | P15 Laporan dampak | Codex | Should (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T9 | Script screenshot → `docs/mockup/*.png` | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T10 | Review konsistensi + checklist UI | Codex | Must (Fase 0) | ✅ | Build/test/typecheck/lint/Knip lulus; 23 cek browser, docs/mockup/verification.json |
| T11 | Postgres + Drizzle + seed | — | Must | ⬜ | — |
| T12 | Auth + peran + guard | — | Must | ⬜ | — |
| T13 | FastAPI Model 1 + eval | — | Must | ⬜ | — |
| T14 | Optimizer jam datang | — | Must | ⬜ | — |
| T15 | WhatsApp Cloud API + webhook | — | Must | ⬜ | — |
| T16 | P10/P11 live | — | Must | ⬜ | — |
| T17 | P12 Tindak lanjut | — | Must | ⬜ | — |
| T18 | P1/P3/P4 live | — | Must | ⬜ | — |
| T19 | P5 Slot pengganti | — | Must (demo) | ⬜ | Gelombang 1 |
| T20 | P15 Laporan live | — | Must (demo) | ⬜ | Gelombang 1 |
| T21 | Admin: P20 Pengaturan (gelombang 1), P16-P19, P29, P30 (gelombang 2) | — | Should | ⬜ | P20 dikerjakan dulu |
| T22 | P22 Mode demo | — | Must (demo) | ⬜ | Gelombang 1, inti demo day |
| T23 | Adapter SIMRS dummy + kontrak FHIR + P21 Integrasi | — | Must (demo) | ⬜ | Gelombang 1 (arahan mitra) |
| T24 | P6, P23, P24 | — | Should | ⬜ | — |
| T25 | Hackathon: data mitra + latihan demo | — | Must | ⬜ | — |
| T26 | Pengingat H-1 (F15) | — | Could | ⬜ | Fitur kecil bernilai besar |
| T27 | Mode teks besar halaman pasien (F16) | — | Could | ⬜ | Fitur kecil bernilai besar |
| T28 | Salin kode booking / bagikan link jam datang ke keluarga | — | Could | ⬜ | Fitur kecil bernilai besar |
| T29 | Riwayat pesan + ekspor CSV (F14) | — | Could | ⬜ | — |
| T30 | Modal M1-M3 di P11 | — | Must | ⬜ | — |
| T31 | P28 Riwayat sesi + P27 Log aktivitas | — | Should | ⬜ | — |
| T32 | P31 Asisten petugas (mockup statis) | Claude | Should (Fase 0) | ✅ | typecheck/lint/test 11/build/knip lulus; 1440/768/375/360 tanpa overflow, target sentuh lulus, konsol bersih |
| T33 | Fungsi asisten baca + analisis + cek hak akses | — | Should | ⬜ | Gelombang 1 setelah alur inti |
| T34 | Usulan + jalankan + jeda batal WA + log | — | Should | ⬜ | Test tanpa konfirmasi → ditolak |
| T35 | Integrasi LLM + P31 live + eval 40 + 10 | — | Should | ⬜ | 0 aksi tanpa konfirmasi |
| T36 | P0 beranda demo + penyelarasan frontend Pantara/21st.dev | Codex | Must (presentasi) | ✅ | 11 test, build/typecheck/lint/Knip lulus; 58 cek browser, 15 PNG; lihat LAPORAN-DEMO-2026-11-05.md |

## Alur Inti Check
| Langkah | Status | Dicek |
|---|---|---|
| 1. Sinyal masuk (adapter) | ⬜ | — |
| 2. Prediksi + konfirmasi dokter | ⬜ | — |
| 3. Optimasi jam datang | ⬜ | — |
| 4. WA pasien + balasan tombol | ⬜ | — |
| 5. Dashboard + tindak lanjut | ⬜ | — |

## Halaman
> Dari 01-PRD §5. Fase 0: selesai = layar statis sesuai skenario + responsif + screenshot. Fase 1+: selesai = data nyata + semua state + responsif.

| # | Halaman | Prioritas | Status | Catatan |
|---|---|---|---|---|
| P1 | Cek jadwal dokter | Must | ⬜ | Fase 0 |
| P2 | Detail jadwal dokter | Should | ⬜ | — |
| P3 | Masukkan kode booking | Must | ⬜ | — |
| P4 | Jam datang saya | Must | ⬜ | Fase 0 |
| P5 | Pilih slot pengganti | Should | ⬜ | — |
| P6 | Kebijakan privasi | Should | ⬜ | — |
| P7 | Masuk | Must | ⬜ | — |
| P8 | Lupa password | Could | ⬜ | — |
| P9 | Profil & keamanan | Could | ⬜ | — |
| P10 | Hari ini | Must | ⬜ | Fase 0 |
| P11 | Detail sesi | Must | ⬜ | Fase 0 |
| P12 | Tindak lanjut | Must | ✅ | Fase 0: halaman dan aksi lokal; backend T17 belum |
| P13 | Pasien hari ini | Should | ⬜ | — |
| P14 | Riwayat pesan | Could | ⬜ | — |
| P15 | Laporan dampak | Should | ⬜ | Fase 0 |
| P16 | Dokter | Should | ⬜ | — |
| P17 | Form dokter | Should | ⬜ | — |
| P18 | Poli & jadwal praktik | Should | ⬜ | — |
| P19 | Pengguna | Should | ⬜ | — |
| P20 | Pengaturan sistem | Should | ⬜ | — |
| P21 | Integrasi | Could | ⬜ | — |
| P22 | Mode demo | Should | ⬜ | — |
| P23 | Tidak ditemukan | Should | ⬜ | — |
| P24 | Galat server | Should | ⬜ | — |
| P25 | Akses ditolak | Must | ⬜ | — |
| P26 | Bantuan pasien | Should | ⬜ | — |
| P27 | Log aktivitas | Could | ⬜ | — |
| P28 | Riwayat sesi | Should | ⬜ | — |
| P29 | Detail dokter | Should | ⬜ | — |
| P30 | Poli | Should | ⬜ | — |
| P31 | Asisten petugas | Should | ✅ | Fase 0 (mockup), live di T33-T35 |
| M1-M5 | Modal (01-PRD §5d) | Must/Should | ⬜ | — |

## Scope Cut
| Fitur/task | Alasan dipotong | Tanggal |
|---|---|---|

## Log
| Tanggal | Ringkasan |
|---|---|
| 2026-10-12 | TODO dibuat |
| 2026-11-05 | Pengguna menetapkan Pantara sebagai referensi tambahan dan 21st.dev sebagai sumber komponen frontend; arahan dicatat di 09-MOCKUP-FASE0. Implementasi belum dimulai; status task tetap. |
| 2026-10-12 | Logo Plus Waktu dipasang di web; P31 Asisten petugas (mockup) + F17 ditambahkan atas permintaan pengguna |



## Revisi desain 12 Oktober 2026
Dashboard `/app/dashboard` ditambahkan sesuai permintaan pengguna. Sidebar klik mengubah lebar workspace, wordmark tersembunyi saat menciut. Acuan K-DASP dengan identitas biru. Enam halaman diuji pada 375/768/1440 px.

## Revisi navigasi dan Jadwal publik
- 🟦 Mockup halaman seluruh menu tanpa label Segera.
- 🟦 Jadwal publik responsif, menu berikon, filter poli dan booking.
- Validasi menyeluruh berjalan; task backend tetap berstatus semula.

## Persiapan presentasi 5 November 2026
- Target tetap frontend statis; tidak mengerjakan layanan model, database, auth, atau WhatsApp nyata.
- T36: beranda demo, navigasi dan panel konsisten dengan referensi Pantara; sumber komponen Aceternity/21st.dev dicatat.
- Commit lokal per kelompok perubahan atas izin pengguna; push menunggu review pengguna.

- Verifikasi T36 selesai: 58 cek browser pada 15 layar, screenshot diperbarui, konsol bersih. Preview http://127.0.0.1:3000. Peringatan keamanan Next.js dicatat untuk tindak lanjut sebelum publikasi.

## Improvement lokasi dan gerakan, 5 November 2026
- ✅ T37: animasi ringan beranda/dashboard/tombol dan estimasi berangkat di P4 dari lokasi atau durasi manual, atas permintaan pengguna. Angka seed tetap sebagai tampilan awal; hasil pribadi hanya state lokal.

- T37 diverifikasi: 14 test, build/typecheck/lint/Knip lulus; 60 cek browser, konsol bersih. Lokasi tidak menghitung durasi otomatis: durasi diambil pengguna dari Google Maps, lalu dipakai kalkulator lokal.

## Revisi referensi dan rute otomatis
- ✅ T38: komponen beranda AquaSeq/dashboard Pantara lebih dekat (Onest/Manrope, navigasi pil, kartu, motion blur/fade) serta rute OSRM otomatis dan pratinjau pesan perubahan jadwal. Menggantikan input menit manual T37, atas koreksi pengguna.

- Bukti T38: 17 test, lint/typecheck/build/Knip lulus; 60 cek browser dan 15 PNG; uji OSRM nyata dari browser berhasil 6,7 km/9 menit/berangkat 10.51. Peringatan keamanan Next.js tetap dicatat. Belum push.

## Pemisahan POV notifikasi pasien dan petugas
- ✅ T39: hapus pratinjau WhatsApp pada P4; tampilkan di notifikasi P11 milik petugas, memakai koordinat alamat rumah terdaftar (simulasi), bukan GPS petugas/pasien. Fungsi pasien lainnya tetap.

- T39: 17 test, build/typecheck/lint/Knip lulus; 61 cek browser. Bukti: p11-notifikasi-pasien.png dan p04-rute-otomatis.png.

## T40: interaksi pencarian, navigasi dan demo
- ✅ Fokus pencarian menyatu dengan wadah; scrollbar sidebar disembunyikan dengan kemampuan scroll dipertahankan.
- ✅ P12 frontend statis tersedia di /app/tindak-lanjut; semua pintu masuk diarahkan ke halaman tersebut. Tandai selesai/filter/atur ulang hanya state lokal; T17 backend tetap belum selesai.
- ✅ Mode demo kini punya visual POV petugas/WhatsApp dokter/pasien dan aksi konfirmasi/balas, bukan sekadar teks timeline. Tidak ada pengiriman nyata.

- T40: 17 test, build/typecheck/lint/Knip lulus; 67 cek browser pada 16 layar. Demo visual, fokus pencarian, scrollbar dan aksi P12 terverifikasi.
