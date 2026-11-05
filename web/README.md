# KapanDok mockup

Enam layar statis dengan data simulasi dari dokumen proyek. Jalankan `pnpm install` lalu `pnpm dev`.

Rute: `/app/dashboard`, `/app`, `/app/sesi/s-pd-rina`, `/jadwal`, `/k/KD-4812`, `/admin/laporan`.

Pemeriksaan: `pnpm test`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm dlx knip`, `pnpm shots`. Screenshot tersimpan di `docs/mockup`. Gunakan `BASE_URL` bila server bukan port 3000 serta `BROWSER_PATH` jika Chrome/Edge terpasang di lokasi lain.

`pnpm data:sync` menyinkronkan seed dan tabel hasil simulasi dari dokumen. Tidak ada backend, autentikasi, atau pengiriman WhatsApp nyata.
