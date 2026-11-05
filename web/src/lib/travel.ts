import { menit } from './format';

export function departureTime(arrival: string, travel: number, buffer: number) {
  if (!Number.isInteger(travel) || travel < 1 || travel > 720 || !Number.isInteger(buffer) || buffer < 0 || buffer > 120) throw new Error('Durasi tidak valid');
  const total = menit(arrival) - travel - buffer;
  const normalized = ((total % 1440) + 1440) % 1440;
  return { time: `${String(Math.floor(normalized / 60)).padStart(2, '0')}.${String(normalized % 60).padStart(2, '0')}`, previousDay: total < 0 };
}
