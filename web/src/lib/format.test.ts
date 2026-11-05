import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { formatJam, menit, statusInfo } from './format';
import data from '../data/mockup-data.json';
describe('format jam dan status', () => {
  it('mempertahankan jam Indonesia dan mengubah format kolon', () => {
    expect(formatJam('10:15')).toBe('10.15'); expect(formatJam('00.00')).toBe('00.00'); expect(menit('10.15') - menit('09.00')).toBe(75);
  });
  it.each(['24:00', '10:60', 'batal', '9:05'])('menolak jam tidak valid %s', value => expect(() => formatJam(value)).toThrow());
  it('setiap status data memiliki badge teks dan ikon', () => {
    for (const status of [...data.sesi.map(s => s.status), ...data.antrean_rina.map(p => p.status_pesan)]) {
      expect(statusInfo(status).label.length).toBeGreaterThan(0); expect(statusInfo(status).icon.length).toBeGreaterThan(0);
    }
    expect(statusInfo('batal').tone).toBe('danger'); expect(statusInfo('hadir').tone).toBe('success'); expect(() => statusInfo('asing')).toThrow();
  });
});
describe('konsistensi skenario', () => {
  it('mempertahankan seluruh seed tanpa mengubah angka', () => {
    const { laporan, administrasi, asisten, ...seed } = data;
    expect(seed).toEqual(JSON.parse(readFileSync('../docs/seed/mockup-data.json', 'utf8')));
    expect(administrasi).toEqual(JSON.parse(readFileSync('../docs/seed/administrasi-mockup.json', 'utf8')));
    expect(asisten).toEqual(JSON.parse(readFileSync('../docs/seed/asisten-mockup.json', 'utf8')));
    expect(laporan.strategi.map(s => s.rerata)).toEqual([35.5, 15.7, 27.7, 16.8]);
  });
  it('jumlah status antrean sama dengan ringkasan', () => {
    const count = (status: string) => data.antrean_rina.filter(p => p.status_pesan === status).length;
    expect(data.antrean_rina).toHaveLength(22);
    expect(count('hadir')).toBe(data.ringkasan_pesan_rina.konfirmasi_hadir);
    expect(count('jadwal_ulang')).toBe(1); expect(count('dibaca')).toBe(4); expect(count('terkirim')).toBe(5);
    expect(data.sesi.reduce((n, s) => n + s.pasien, 0)).toBe(90);
  });
  it('jam pribadi Ibu Sri sesuai lampiran WA', () => {
    expect(data.antrean_rina.find(p => p.kode_booking === 'KD-4812')).toMatchObject({ antrean: 12, saran_berangkat: '10.45', jam_datang: '11.15', perkiraan_dipanggil: '11.30', status_pesan: 'hadir' });
  });
});
