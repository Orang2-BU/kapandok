# Deploy mockup statis ke Dokploy

Aplikasi ini hanya frontend Next.js. Build menghasilkan `web/out/` berisi HTML, CSS, dan JavaScript statis. Dockerfile memakai Node hanya saat build, lalu Nginx port 80 untuk melayani hasilnya. Tidak butuh database, API, atau environment variable. Rute yang tersedia sudah diprarender saat build; kode booking contoh hanya `KD-4812` dan detail sesi hanya `s-pd-rina`. Fitur demo lokal di browser, bukan backend bersama. Penghitung perjalanan opsional mengakses layanan OSRM eksternal saat pengguna menekan tombol.

## GitHub Actions

`.github/workflows/ci.yml` memeriksa test, typecheck, lint, Knip, build, dan keberadaan HTML hasil export di setiap pull request serta push `main`. GitHub tidak melakukan deploy otomatis. Agar cek wajib sebelum merge, tetapkan job `check` sebagai required status check di pengaturan branch protection/ruleset `main`.

## Dokploy (deploy manual)

1. Setelah perubahan ini di-review dan di-push dengan izin pemilik repo, buat Application dengan source GitHub `Orang2-BU/kapandok`, branch `main`. Pastikan Dokploy punya izin membaca repository.
2. Build Type: `Dockerfile`; Dockerfile Path: `Dockerfile`; Docker Context Path: `.` (root repository); Docker Build Stage: kosong/default (`runner` merupakan tahap terakhir).
3. Domain: domain milik Anda, port container/domain `80`, HTTPS aktif. Tidak perlu environment variable, database, volume, atau start command khusus. Satu replika cukup untuk mockup.
4. Matikan `Auto Deploy` di Dokploy dan jangan pasang webhook repo. Sesudah workflow `Frontend CI / check` hijau untuk commit yang hendak dirilis, tekan `Deploy` manual di dashboard Dokploy. Pastikan revision yang ditampilkan adalah commit yang lulus CI. Jangan deploy branch `main` jika sudah ada push lebih baru yang belum diuji.
5. Verifikasi HTTPS: `/`, `/jadwal/`, `/app/`, `/app/sesi/s-pd-rina/`, `/k/KD-4812/`, `/admin/laporan/`; cek juga tautan internal, filter `?status=hadir`, dan rute tak dikenal menghasilkan 404. Jika rilis bermasalah, gunakan deployment sebelumnya/commit sebelumnya dari dashboard Dokploy sesuai kontrol versi yang tersedia.

Docker Desktop/daemon harus aktif untuk uji `docker build -t kapandok:local .` dan `docker run --rm -p 127.0.0.1:3101:80 kapandok:local`; tanpa itu file Docker belum diverifikasi sebagai image berjalan. Jangan kirim data pasien asli: halaman admin/petugas saat ini publik tanpa autentikasi.

Referensi Dokploy: https://docs.dokploy.com/docs/core/applications/build-type dan https://docs.dokploy.com/docs/core/auto-deploy.
