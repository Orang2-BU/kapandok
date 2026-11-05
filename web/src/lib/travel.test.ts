import { describe, expect, it } from 'vitest';
import { departureTime, routeEstimate } from './travel';
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

describe('durasi otomatis dari rute', () => {
  it('membulatkan detik ke menit agar tidak menyarankan berangkat terlambat', () => {
    expect(routeEstimate({ code: 'Ok', routes: [{ duration: 503, distance: 6717.8 }] })).toEqual({ minutes: 9, kilometers: 6.7178 });
  });
  it('tidak mengarang estimasi saat rute tidak tersedia atau payload rusak', () => {
    for (const payload of [null, {}, { code: 'NoRoute' }, { code: 'Ok', routes: [] }, { code: 'Ok', routes: [{duration: -1, distance: 4}] }, { code: 'Ok', routes: [{duration: Infinity, distance: 4}] }]) expect(() => routeEstimate(payload)).toThrow();
  });
  it('menolak perjalanan lebih dari 12 jam', () => {
    expect(() => routeEstimate({ code: 'Ok', routes: [{ duration: 50000, distance: 900000 }] })).toThrow();
  });
});
