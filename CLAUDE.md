# KapanDok

> Dibuat oleh skill setup-project-00 (2026-10-12). File ini dimuat otomatis setiap sesi,
> jadi tidak perlu membaca ulang docs/ kecuali dibutuhkan (lihat bagian "Kapan baca docs").

## Aplikasi Ini
KapanDok memprediksi jam mulai praktik dokter dari sinyal rumah sakit (operasi, visite, riwayat), meminta konfirmasi satu ketukan dari dokter via WhatsApp, lalu memberi setiap pasien jam datang pribadi lewat WhatsApp dengan tombol Hadir/Jadwal ulang. Untuk tantangan RS-01 UMS Health Innovation Hackathon 2026 (mitra RS AR Fachrudin UMS). Web untuk petugas poli, admin RS, dan pasien (cek jadwal, jam datang via kode booking).
**Fase sekarang: Fase 0, mockup statis 5 layar (P10, P11, P1, P4, P15) untuk Lampiran C proposal, deadline 15 Okt 2026.** Di luar scope: SIMRS, billing, aplikasi mobile native, halaman dokter, LLM. Ide asli ada di `docs/00-BRIEF.md`. Prompt mulai kerja: `PROMPT-CODEX.md`.

## Stack & Perintah
- **Stack:** Next.js (App Router) + TypeScript strict + Tailwind v4 + shadcn/ui + lucide-react (`web/`); Fase 1+: FastAPI + scikit-learn (`ml/`), PostgreSQL + Drizzle, Auth.js, WhatsApp Cloud API.
- **Test:** `cd web && pnpm test` · **Build:** `pnpm build` · **Typecheck:** `pnpm typecheck` · **Lint:** `pnpm lint` · **Dead code:** `pnpm dlx knip`

## Konvensi Singkat (dari docs/02-AGENT.md)
- Rute dan nama halaman persis seperti 01-PRD §5a; folder rute bahasa Indonesia kebab-case.
- TypeScript strict, tanpa `any`; Server Components default.
- Data Fase 0 hanya dari `web/src/data/mockup-data.json` (salinan `docs/seed/`); jangan ubah angka skenario tanpa izin.
- Bahasa UI Indonesia, jam format `10.15`, label "Data simulasi" di setiap layar.
- UI wajib ikut `docs/08-DESIGN.md` termasuk Standar UI anti tampilan AI (A1-A11); token di-export, bukan ditulis tangan.
- Sidebar: animated sidebar 21st.dev (Aceternity) diadaptasi; bukan sidebar shadcn.
- Jangan tampilkan alasan medis dokter di halaman pasien; jangan pakai data pasien asli.

## Aturan Wajib
@docs/07-RULES.md

## Aturan Main
@docs/06-WORKFLOW.md

## Kapan baca docs
- Mulai task baru → bagian task terkait di `docs/03-ARCHITECTURE.md`
- Status task berubah → update `docs/04-TODO.md` (wajib)
- Pitch & script demo → `docs/05-PITCH.md`
- Ragu soal scope fitur → `docs/01-PRD.md`
- Kerja UI (halaman, komponen, warna, font) → docs/08-DESIGN.md (wajib, jangan pakai nilai di luar token); acuan visual: docs/design/preview.html
- Membangun layar mockup Fase 0 → `docs/09-MOCKUP-FASE0.md`
- Membuat/mengubah halaman → bagian "Peta Halaman" di `docs/01-PRD.md` + `docs/08-DESIGN.md`
- Detail konvensi koding → `docs/02-AGENT.md`
- Latar belakang riset, proposal, simulasi, mockup WA → `docs/riset/`
