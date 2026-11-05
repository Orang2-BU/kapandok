# KapanDok

> Instruksi untuk semua AI coding assistant (Codex, Claude, dll.). Dibuat oleh setup-project-00: 2026-10-12.
> Sumber kebenaran ada di `docs/`. File ini ringkasannya. Prompt untuk memulai: `PROMPT-CODEX.md`.

## WAJIB sebelum ngoding pertama kali
Jika kamu AI yang belum pernah bekerja di projek ini, baca **seluruh** file di `docs/` (00 sampai 08) secara berurutan satu kali, lalu `docs/seed/mockup-data.json`, lalu ikuti aturannya. Setelah itu cukup rujuk file ini.

## Aplikasi
KapanDok memprediksi jam mulai praktik dokter dari sinyal rumah sakit, meminta konfirmasi satu ketukan dari dokter via WhatsApp, lalu memberi setiap pasien jam datang pribadi lewat WhatsApp (tantangan RS-01, RS AR Fachrudin UMS, UMS Health Innovation Hackathon 2026). Web untuk petugas poli, admin RS, dan pasien.
**Fase sekarang: Fase 0, mockup statis 5 layar (P10 Hari ini, P11 Detail sesi, P1 Cek jadwal, P4 Jam datang, P15 Laporan) untuk proposal, deadline 15 Okt 2026.** Di luar scope: SIMRS, billing, aplikasi mobile native, halaman dokter, LLM. Ide asli: `docs/00-BRIEF.md`.

## Stack & Perintah Verifikasi
- **Stack:** Next.js (App Router) + TypeScript strict + Tailwind v4 + shadcn/ui + lucide-react (`web/`); Fase 1+: FastAPI + scikit-learn (`ml/`), PostgreSQL + Drizzle, Auth.js, WhatsApp Cloud API.
- **Test:** `cd web && pnpm test` · **Build:** `pnpm build` · **Typecheck:** `pnpm typecheck` · **Lint:** `pnpm lint` · **Dead code:** `pnpm dlx knip`

## Aturan Wajib (ringkas, lengkapnya di docs/07-RULES.md)
- Tuntaskan setiap permintaan sesuai aturan projek.
- Setiap perubahan kode: jalankan test, build, typecheck, lint, cek dead code, dan cek halaman terkait di browser.
- Error → cari akar penyebab, perbaiki, ulangi semua pemeriksaan sampai hijau.
- Dilarang skip pemeriksaan, melemahkan test, atau klaim selesai tanpa bukti.
- Pemeriksaan yang tidak bisa dijalankan → jelaskan dengan jujur.
- Projek harus bersih dari dead code.
- Solusi paling sederhana yang benar (YAGNI, fitur bawaan dulu, dependency baru harus izin).
- Kerja UI: ikuti `docs/08-DESIGN.md` termasuk Standar UI anti tampilan AI (A1-A11) + checklist UI/UX (responsif 375/768/1440, kontras AA, keyboard, semua state).
- Selesai kerja → laporkan perubahan, pemeriksaan, dan hasilnya (format 07-RULES §10).

## Aturan Main (ringkas, lengkapnya di docs/06-WORKFLOW.md)
- **Otonomi:** boleh mengerjakan task 04-TODO dan memperbaiki error sendiri.
- **Wajib minta izin:** dependency baru di luar daftar 02-AGENT §6, mengubah angka skenario, halaman di luar PRD, push/deploy/kirim WA, memotong scope.
- **Selesai =** kriteria di 03 terpenuhi + semua cek hijau + 04-TODO diupdate + laporan.

## Konvensi (ringkas, lengkapnya di docs/02-AGENT.md)
- Rute persis 01-PRD §5a; folder rute bahasa Indonesia kebab-case.
- TypeScript strict, tanpa `any`; Server Components default.
- Data Fase 0 hanya dari `web/src/data/mockup-data.json`.
- Bahasa UI Indonesia, jam `10.15`, label "Data simulasi" di setiap layar.
- Token desain di-export dari 08-DESIGN, tidak ditulis tangan; font Plus Jakarta Sans via `next/font`.
- Sidebar: animated sidebar 21st.dev (Aceternity) diadaptasi; bukan sidebar shadcn.
- Tanpa emoji, tanpa em-dash di teks UI, tanpa data pasien asli, tanpa alasan medis di halaman pasien.

## Kapan baca docs
- Mulai task baru → bagian terkait di `docs/03-ARCHITECTURE.md`
- Status task berubah → update `docs/04-TODO.md` (wajib)
- Pitch & script demo → `docs/05-PITCH.md`
- Ragu scope → `docs/01-PRD.md`
- Kerja UI (halaman, komponen, warna, font) → docs/08-DESIGN.md (wajib, jangan pakai nilai di luar token); acuan visual: docs/design/preview.html
- Membangun layar mockup Fase 0 → `docs/09-MOCKUP-FASE0.md`
- Membuat/mengubah halaman → "Peta Halaman" di `docs/01-PRD.md` + `docs/08-DESIGN.md`
- Riset, proposal, simulasi, mockup WA → `docs/riset/`
- Konflik aturan → prioritas: 07-RULES > instruksi user > 00-BRIEF > 01-PRD > 08-DESIGN (untuk UI) > 06-WORKFLOW > 03-ARCHITECTURE > 02-AGENT
