export function formatJam(value: string) {
  if (!/^([01]\d|2[0-3])[.:][0-5]\d$/.test(value)) throw new Error('Jam tidak valid');
  return value.replace(':', '.');
}
export function menit(value: string) {
  const [jam, menit] = formatJam(value).split('.').map(Number);
  return jam * 60 + menit;
}
export function desimal(value: number) { return value.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); }
const statuses = {
  hadir: { label: 'Hadir', tone: 'success', icon: 'checks' },
  dibaca: { label: 'Dibaca', tone: 'info', icon: 'eye' },
  terkirim: { label: 'Terkirim', tone: 'neutral', icon: 'check' },
  jadwal_ulang: { label: 'Jadwal ulang', tone: 'warning', icon: 'calendar' },
  terlambat_terkonfirmasi: { label: 'Terlambat 75 mnt', tone: 'warning', icon: 'clock' },
  menunggu_konfirmasi: { label: 'Menunggu dokter', tone: 'warning', icon: 'clock' },
  berjalan: { label: 'Sudah mulai', tone: 'success', icon: 'check' },
  tepat_waktu: { label: 'Tepat waktu', tone: 'success', icon: 'check' },
  batal: { label: 'Batal praktik', tone: 'danger', icon: 'cancel' },
} as const;
export function statusInfo(status: string) {
  if (!(status in statuses)) throw new Error(`Status tidak dikenal: ${status}`);
  return statuses[status as keyof typeof statuses];
}
