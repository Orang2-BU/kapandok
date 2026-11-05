import { describe, expect, it } from 'vitest';
import { departureTime } from './travel';
describe('saran berangkat', () => {
  it('mengurangi perjalanan dan persiapan dari jam datang ke poli', () => {
    expect(departureTime('11.15', 30, 10)).toEqual({ time: '10.35', previousDay: false });
  });
  it('menandai keberangkatan hari sebelumnya', () => {
    expect(departureTime('00.15', 30, 0)).toEqual({ time: '23.45', previousDay: true });
  });
  it('menolak durasi kosong, negatif, pecahan dan tak hingga', () => {
    for (const n of [0, -1, 1.5, NaN, Infinity, 721]) expect(() => departureTime('11.15', n, 0)).toThrow();
  });
});
