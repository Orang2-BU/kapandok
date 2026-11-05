'use client';
import { useEffect, useRef, useState } from 'react';
import { LocateFixed, MapPin, ArrowUpRight, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { departureTime, routeEstimate, readRoadRoute } from '@/lib/travel';
import config from '@/data/travel-config.json';
import type { Pasien } from '@/lib/types';

type Point = { latitude: number; longitude: number };
type Estimate = ReturnType<typeof routeEstimate> & ReturnType<typeof departureTime>;
export function TravelPlanner({ pasien, onDeparture }: { pasien: Pasien; onDeparture: (time: string | null) => void }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState<Point | null>(null);
  const [result, setResult] = useState<Estimate | null>(null);
  const [example, setExample] = useState(false);
  const request = useRef(0);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => { request.current++; abort.current?.abort(); }, []);
  function begin() { const id = ++request.current; abort.current?.abort(); setResult(null); onDeparture(null); setLoading(true); return id; }
  async function calculate(point: Point, id: number) {
    if (id !== request.current) return;
    setOrigin(point); setStatus('Menghitung rute jalan ke rumah sakit…');
    const controller = new AbortController(); abort.current = controller;
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const route = await readRoadRoute(point, controller.signal);
      if (id !== request.current) return;
      const departure = departureTime(pasien.jam_datang, route.minutes, config.parkingMinutes + config.roadBufferMinutes);
      setResult({ ...route, ...departure }); onDeparture(departure.time);
      setStatus('Rute selesai dihitung. Rekomendasi berangkat sudah diperbarui.');
    } catch (error) {
      if (id !== request.current) return;
      setStatus(error instanceof Error && error.name !== 'AbortError' ? error.message : 'Perhitungan rute belum berhasil. Periksa koneksi lalu coba lagi.');
    } finally { clearTimeout(timeout); if (id === request.current) setLoading(false); }
  }
  function locate() {
    const id = begin(); setExample(false); setOrigin(null);
    if (!navigator.geolocation) { setLoading(false); setStatus('Perangkat belum mendukung lokasi. Gunakan lokasi simulasi untuk mencoba alurnya.'); return; }
    setStatus('Mencari lokasi perangkat…');
    navigator.geolocation.getCurrentPosition(p => { void calculate(p.coords, id); }, error => {
      if (id !== request.current) return;
      setLoading(false); setStatus(error.code === 1 ? 'Izin lokasi ditolak. Izinkan lokasi di browser atau coba lokasi simulasi.' : 'Lokasi belum tersedia. Coba lagi atau gunakan lokasi simulasi.');
    }, { timeout: 10000, maximumAge: 60000 });
  }
  const maps = new URLSearchParams({ api: '1', destination: `${config.destination.latitude},${config.destination.longitude}`, travelmode: 'driving' });
  if (origin) maps.set('origin', `${origin.latitude},${origin.longitude}`);
  return <section className="panel travel-planner" aria-labelledby="travel-title" aria-busy={loading}>
    <span className="badge info"><Navigation aria-hidden="true" />Perjalanan ke rumah sakit</span>
    <h2 id="travel-title">Kami hitungkan jam berangkat Anda.</h2>
    <p>Durasi rute dari lokasi Anda dipadukan dengan jam datang ke poli, agar tidak datang terlalu awal atau terlambat.</p>
    <p className="small muted">Dengan menekan tombol lokasi, koordinat diteruskan ke layanan rute OSRM. Lokasi tidak disimpan oleh aplikasi.</p>
    <Button onClick={locate} disabled={loading}><LocateFixed aria-hidden="true" />{loading ? 'Sedang menghitung…' : 'Hitung dari lokasi saya'}</Button>
    <Button variant="secondary" onClick={() => { const id = begin(); setExample(true); void calculate(config.example, id); }} disabled={loading}>Coba lokasi rumah simulasi</Button>
    <p role="status">{status}</p>
    <div className="travel-destination"><MapPin aria-hidden="true" /><span><b>{config.destination.name}</b><small>{config.destination.address}</small></span></div>
    {result && <>
      <div className="travel-result" role="status"><span className="badge info">{example ? 'Lokasi simulasi' : 'Lokasi perangkat'} · Mobil</span><p>Saran berangkat</p><strong className="metric">{result.time} WIB</strong>{result.previousDay && <p>Berangkat pada hari sebelumnya.</p>}<dl><div><dt>Jarak rute</dt><dd>{result.kilometers.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</dd></div><div><dt>Estimasi perjalanan</dt><dd>{result.minutes} menit</dd></div><div><dt>Cadangan perjalanan</dt><dd>{config.roadBufferMinutes} menit</dd></div><div><dt>Parkir dan jalan ke poli</dt><dd>{config.parkingMinutes} menit</dd></div><div><dt>Target tiba di poli</dt><dd>{pasien.jam_datang} WIB</dd></div></dl><p className="small muted">Estimasi rute mobil dari OSRM/OpenStreetMap. Belum memperhitungkan kemacetan langsung; tidak menjamin waktu tiba.</p></div>

    </>}
    <a className="button ghost" href={`https://www.google.com/maps/dir/?${maps}`} target="_blank" rel="noopener noreferrer">Lihat rute di Google Maps<ArrowUpRight aria-hidden="true" /></a>
  </section>;
}
