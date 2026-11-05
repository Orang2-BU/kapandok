import config from '../data/travel-config.json';
import { menit } from './format';

export function departureTime(arrival: string, travel: number, buffer: number) {
  if (!Number.isInteger(travel) || travel < 1 || travel > 720 || !Number.isInteger(buffer) || buffer < 0 || buffer > 120) throw new Error('Durasi tidak valid');
  const total = menit(arrival) - travel - buffer;
  const normalized = ((total % 1440) + 1440) % 1440;
  return { time: `${String(Math.floor(normalized / 60)).padStart(2, '0')}.${String(normalized % 60).padStart(2, '0')}`, previousDay: total < 0 };
}

export function routeEstimate(payload: unknown) {
  if (!payload || typeof payload !== 'object' || !('code' in payload) || payload.code !== 'Ok' || !('routes' in payload) || !Array.isArray(payload.routes)) throw new Error('Rute tidak ditemukan');
  const route: unknown = payload.routes[0];
  if (!route || typeof route !== 'object' || !('duration' in route) || !('distance' in route) || typeof route.duration !== 'number' || !Number.isFinite(route.duration) || route.duration < 0 || typeof route.distance !== 'number' || !Number.isFinite(route.distance) || route.distance < 0) throw new Error('Data rute tidak valid');
  const minutes = Math.max(1, Math.ceil(route.duration / 60));
  if (minutes > 720) throw new Error('Perjalanan lebih dari 12 jam. Hubungi petugas untuk merencanakan kunjungan.');
  return { minutes, kilometers: route.distance / 1000 };
}

export async function readRoadRoute(point: { latitude: number; longitude: number }, signal: AbortSignal) {
  const url = `https://router.project-osrm.org/route/v1/driving/${point.longitude},${point.latitude};${config.destination.longitude},${config.destination.latitude}?overview=false`;
  const response = await fetch(url, { signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
  if (!response.ok) throw new Error('Layanan rute belum tersedia. Coba lagi.');
  return routeEstimate(await response.json());
}
