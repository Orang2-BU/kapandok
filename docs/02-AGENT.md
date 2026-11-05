# 02 — AGENT: Instruksi untuk AI

> Konvensi yang harus diikuti AI (dan developer manusia) di projek ini.

## 1. Konteks Singkat
- **Aplikasi:** KapanDok, sistem AI yang memprediksi jam mulai praktik dokter dan memberi pasien jam datang pribadi lewat WhatsApp (tantangan RS-01, RS AR Fachrudin UMS).
- **Stack:** Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui + lucide-react di `web/`; FastAPI + scikit-learn di `ml/` (Fase 1+); PostgreSQL + Drizzle (Fase 1+).
- **Fase sekarang:** Fase 0, mockup statis 5 layar dari `web/src/data/mockup-data.json`.

## 2. Struktur Folder
```
docs/                    dokumen projek (sumber kebenaran)
  seed/mockup-data.json  data skenario demo (data simulasi)
  riset/                 riset lomba, draf proposal, lampiran C (simulasi, mockup WA)
  mockup/                PNG hasil screenshot Fase 0
web/                     Next.js
  src/app/(publik)/      jadwal, cek, k/[kode], privasi
  src/app/(app)/app/     dashboard petugas: page.tsx (P10), sesi/[id], tindak-lanjut, pasien
  src/app/(app)/admin/   laporan, dokter, jadwal, pengguna, pengaturan, demo
  src/components/        komponen bersama (ui/ dari shadcn, app-sidebar, sim-label, ...)
  src/data/              data statis Fase 0
  src/lib/               helper (format jam, tipe)
  src/styles/theme.css   hasil export token 08-DESIGN (jangan diedit manual)
ml/                      FastAPI (Fase 1+): app/, eval/, tests/
```
- **Rute halaman:** persis seperti kolom "Rute" di 01-PRD §5a. Nama folder rute dalam bahasa Indonesia, kebab-case.

## 3. Gaya Koding
- **Penamaan:** variabel/fungsi camelCase, komponen PascalCase, file kebab-case, konstanta UPPER_SNAKE. Istilah domain dalam bahasa Indonesia sesuai model data (`sesi`, `kunjungan`, `jamDatang`).
- **Prinsip:** fungsi kecil, satu tanggung jawab, solusi paling sederhana yang benar. Server Components secara default; `"use client"` hanya untuk interaksi.
- **Typing:** TypeScript `strict`, tanpa `any`; tipe data dari `src/lib/types.ts`.
- **Error handling:** halaman memakai `error.tsx`/`not-found.tsx`; pesan error menyebut masalah dan cara memperbaiki.
- **Formatter / linter:** ESLint (config Next.js) + Prettier; Python: Ruff.

## 4. Gaya Komentar
- Komentar menjelaskan **kenapa**, bukan **apa**. Bahasa komentar: Indonesia.
- Tidak ada kode yang di-comment-out.

## 5. Testing
- **Framework:** Vitest (web), Pytest (ml).
- **Lokasi:** `*.test.ts` di samping file; `ml/tests/`.
- **Wajib ditest:** helper format jam, logika ambang (kirim konfirmasi dokter, kirim pembaruan ≥ 10 mnt), guard peran, model (cakupan interval).
- Fase 0: cukup test helper format jam dan pemetaan status → badge.

## 6. Dependency
- Tambah dependency hanya bila jelas lebih sederhana dari menulis sendiri; sebutkan alasannya.
- Dependency yang sudah disetujui: next, react, tailwindcss, shadcn/ui (dan Radix di bawahnya), lucide-react, recharts, playwright (screenshot), vitest; Fase 1+: drizzle-orm, next-auth (Auth.js), fastapi, numpy, scikit-learn.
- Package manager: pnpm (web), uv (ml).

## 7. Git
- **Format commit:** Conventional Commits (`feat: ...`, `fix: ...`, `docs: ...`). Commit hanya bila user mengizinkan.
- **Branch:** `main` + branch fitur `feat/<nama>`.

## 8. Lain-lain
- Bahasa UI: Indonesia. `lang="id"`. Format jam `10.15`, tanggal "Senin, 9 November 2026".
- Semua layar Fase 0 menampilkan label "Data simulasi".
- Jangan pernah memakai data pasien asli. Jangan menampilkan alasan medis dokter di halaman pasien.
