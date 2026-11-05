import { describe, expect, it } from 'vitest';
import data from '../data/mockup-data.json';
describe('skenario asisten P31', () => {
  it('rekap belum konfirmasi hadir cocok dengan ringkasan pesan dr. Rina', () => {
    const r = data.ringkasan_pesan_rina;
    const belum = data.antrean_rina.filter(p => p.status_pesan !== 'hadir');
    expect(belum).toHaveLength(r.terkirim_total - r.konfirmasi_hadir);
    expect(belum.filter(p => p.status_pesan === 'jadwal_ulang')).toHaveLength(r.minta_jadwal_ulang);
    expect(belum.filter(p => p.status_pesan === 'dibaca')).toHaveLength(r.dibaca_belum_membalas);
    expect(belum.filter(p => p.status_pesan === 'terkirim')).toHaveLength(r.belum_dibaca);
  });
  it('pasien yang dijadwal ulang memang minta jadwal ulang dan slot usulan tersedia', () => {
    const { analisis } = data.asisten;
    expect(data.antrean_rina.find(p => p.kode_booking === analisis.kode_booking)?.status_pesan).toBe('jadwal_ulang');
    expect(analisis.slot.map(s => s.id)).toContain(analisis.usulan.slot_id);
  });
});
