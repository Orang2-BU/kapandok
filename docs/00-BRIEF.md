# 00 — BRIEF: KapanDok

> Sumber kebenaran untuk ide asli, tujuan, dan batasan. Prioritas: 07-RULES > instruksi user > dokumen ini > dokumen lain.

## 1. Ide Asli
> Disusun dari percakapan perencanaan (12 Oktober 2026), memakai kata-kata user sejauh mungkin.
>
> "sekarang untuk web aku mau bikin di AI lain, buatkan aku plan, design md, dan prd nya dalam bentuk md di folder D:\Aplikasi\KapanDok"
> "kasih file md prompt juga biar AI codex bisa langsung memahami kita bikin apa dll"
> "aku cuma buttuh mockup nya doang, buat aku cantumin ke proposal dulu sementara"
>
> Konteks ide (dari riset dan proposal, lihat `docs/riset/`): KapanDok adalah sistem AI untuk tantangan **RS-01 UMS Health Innovation Hackathon 2026** (mitra: RS AR Fachrudin UMS, "Informasi Jadwal Dokter dan Notifikasi Perubahan untuk Pasien"). Sistem memprediksi jam mulai praktik dokter dari sinyal operasional rumah sakit (operasi, visite, riwayat), meminta konfirmasi satu ketukan dari dokter lewat WhatsApp bila sinyal kurang, lalu mengoptimasi jam datang setiap pasien dan mengirimnya lewat WhatsApp dengan konfirmasi dua arah. Pesan WhatsApp untuk pasien dan dokter sudah dibuat mockup-nya (`docs/riset/lampiran-c/mockup_wa.png`). Web dibangun untuk petugas poli, admin RS, dan pasien (cek jadwal dan jam datang pribadi).

## 2. Ringkasan
- **Masalah inti:** jadwal dokter rawat jalan berubah hampir setiap hari (operasi melebihi estimasi, visite rawat inap, tindakan darurat) dan petugas mengabari pasien manual lewat WhatsApp [riset: balasan mitra via panitia, Okt 2026]. Pasien menunggu lama atau datang di waktu yang salah.
- **Untuk siapa:** petugas poli dan admin RS AR Fachrudin UMS (pengguna web), pasien rawat jalan termasuk lansia (penerima WA dan halaman publik), dokter (via WA).
- **Hasil yang diharapkan sekarang:** **mockup web 5 layar** untuk Lampiran C proposal (deadline 15 Oktober 2026 pukul 23.59 WIB). Setelah lolos seleksi: aplikasi berfungsi untuk demo day.

## 3. Projek
| Item | Isi |
|---|---|
| Jenis | Produk (kompetisi hackathon, rencana hilirisasi ke RS) |
| Target waktu | **Fase 0 (mockup statis):** sebelum 15 Okt 2026 · **Fase 1-3 (aplikasi):** pembekalan 26 Okt-4 Nov 2026 + hackathon 3 hari (awal-pertengahan Nov 2026) |
| Dipresentasikan | Ya, demo day UMS HI Hackathon 2026 (tanggal menyusul dari panitia) |
| Platform | Web (desktop untuk petugas/admin, mobile web untuk pasien) + WhatsApp Business (pesan) |
| Budget & hosting | Gratis/murah: Vercel + layanan Python gratis atau lokal saat demo [asumsi] |

## 4. Tim
Tim **Hadi Sudah Membaik**, 6 orang, ketua **Krisna Panca Dewa**. Semua anggota multi-skill [dari user]. Ada 1 dosen pembimbing (syarat lomba). Nama dan peran anggota lain belum dirinci.

| Nama | Skill | Peran |
|---|---|---|
| Krisna Panca Dewa | multi-skill | Ketua |
| (5 anggota lain) | multi-skill | lihat pembagian di proposal: AI, dosen pembimbing, backend, antarmuka, bisnis, validasi pengguna |

## 5. Batasan & Asumsi
- **Batasan:**
  - Stack **bukan Laravel dan bukan Flutter** [dari user].
  - **Data simulasi**, bukan data RS; semua layar diberi label "Data simulasi" [dari user]. Data pasien asli butuh izin mitra (pedoman lomba hlm. 7) dan UU PDP.
  - SIMRS mitra internal dan vendornya konfidensial; integrasi wajib **sistem-agnostik** lewat API/HL7 FHIR [riset: balasan mitra].
  - Dokter berinteraksi lewat **WhatsApp**, bukan web [keputusan percakapan].
  - Konsisten dengan proposal (`docs/riset/draft-proposal-RS01-KapanDok.md`) dan mockup WA.
- **Asumsi:**
  - Login petugas/admin: email + password, akun dibuat admin [asumsi].
  - WhatsApp asli lewat nomor uji WhatsApp Cloud API (Meta) untuk demo [asumsi, cek ketentuan terbaru Meta].
  - Tanggal skenario demo: Senin 9 November 2026, snapshot 08.50 [asumsi].

## 6. Pertanyaan Terbuka
| # | Pertanyaan | Asumsi sementara | Status |
|---|---|---|---|
| P1 | Apakah mitra akan memberi data historis jadwal (anonim) dan akses SIMRS? | Data sintetis sampai ada izin | terbuka |
| P2 | Batas penerima nomor uji WhatsApp Cloud API dan proses verifikasi bisnis | Cukup untuk demo ke juri | terbuka, cek docs Meta |
| P3 | Tanggal pasti demo day dan durasi presentasi | Awal-pertengahan Nov 2026, 3 hari | terbuka |
| P4 | Siapa anggota yang mengerjakan web | Dikerjakan dengan bantuan AI (Codex) | terbuka |
