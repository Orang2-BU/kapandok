# 06 — WORKFLOW: Aturan Main

> Prinsip: alur inti selalu bisa jalan. Lebih baik sedikit fitur yang stabil daripada banyak fitur setengah jadi. Fase sekarang: **Fase 0 (mockup statis)**; jangan mengerjakan Fase 1+ tanpa diminta.

## 1. Alur per Task
1. Ambil task dari 04-TODO sesuai prioritas → 🟦.
2. Baca bagian terkait di 03-ARCHITECTURE dan 08-DESIGN; ambigu → tanya, jangan menebak.
3. Implementasi minimal yang memenuhi kriteria selesai.
4. Verifikasi sesuai 07-RULES, termasuk cek alur inti (Fase 0: 5 layar cocok dengan skenario).
5. Update 04-TODO; laporkan. Commit hanya bila user mengizinkan.

## 2. Boleh Jalan Sendiri
- Mengerjakan task di 04-TODO, menjalankan semua pemeriksaan, memperbaiki error dari perubahan sendiri.
- Menambah komponen shadcn yang dibutuhkan halaman di 01-PRD.
- Memperbaiki data contoh di `web/src/data/` selama tetap konsisten dengan `docs/seed/mockup-data.json`.

## 3. Wajib Minta Izin
- Menambah dependency di luar daftar 02-AGENT §6, atau mengganti stack/database.
- Mengubah angka skenario (jam, jumlah pasien, nama) yang sudah dipakai di proposal dan mockup WA.
- Fitur atau halaman di luar 01-PRD §5, atau mengubah alur inti.
- Push, deploy, aksi ke layanan eksternal (termasuk mengirim WA), menghapus data.
- Memotong scope (✂️): usulkan dengan alasan, user memutuskan.

## 4. Prioritas
- Fase 0 urutan: T1 → T2 → T3 → T4 (P10) → T5 (P11) → T7 (P4) → T6 (P1) → T9 (screenshot) → T8 (P15) → T10.
- Kalau task jauh lebih rumit dari perkiraan, usulkan versi lebih sederhana yang tetap memenuhi alur inti.

## 5. Definition of Done
- [ ] Kriteria selesai di 03-ARCHITECTURE terpenuhi
- [ ] Semua pemeriksaan di 07-RULES hijau dengan bukti
- [ ] Alur inti masih jalan (Fase 0: 5 layar sesuai skenario)
- [ ] Tidak ada dead code / debug log tersisa
- [ ] 04-TODO diupdate, laporan diberikan

## 6. Prioritas Saat Konflik
07-RULES > instruksi user > 00-BRIEF > 01-PRD > 08-DESIGN (untuk UI) > 06-WORKFLOW > 03-ARCHITECTURE > 02-AGENT
