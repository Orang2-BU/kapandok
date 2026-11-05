'use client';
import { useRef, useState } from 'react';
import { LocateFixed, MapPin, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { departureTime } from '@/lib/travel';

export function TravelPlanner({ arrival }: { arrival: string }) {
  const [origin, setOrigin] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const request = useRef(0);
  const [result, setResult] = useState<ReturnType<typeof departureTime> | null>(null);
  const params = new URLSearchParams({ api: '1', destination: 'RS UMS A.R. Fachrudin, Jalan Adi Sucipto 167, Surakarta', travelmode: 'driving' });
  if (origin) params.set('origin', origin);
  function locate() {
    if (!navigator.geolocation) { setStatus('Lokasi tidak didukung. Isi lokasi awal atau durasi perjalanan sendiri.'); return; }
    setLoading(true); setStatus('Mencari lokasi perangkat…');
    const version = ++request.current;
    navigator.geolocation.getCurrentPosition(position => {
      if (version !== request.current) return;
      setOrigin(`${position.coords.latitude},${position.coords.longitude}`);
      setStatus('Lokasi siap. Buka rute untuk melihat durasi perjalanan, lalu isi durasinya di bawah.'); setLoading(false);
    }, error => {
      if (version !== request.current) return;
      setLoading(false); setStatus(error.code === 1 ? 'Izin lokasi ditolak. Anda tetap bisa mengisi lokasi awal atau durasi sendiri.' : 'Lokasi belum tersedia. Coba lagi atau isi durasi sendiri.');
    }, { timeout: 10000, maximumAge: 60000 });
  }
  return <section className="panel travel-planner" aria-labelledby="travel-title">
    <h2 id="travel-title"><MapPin aria-hidden="true" />Rencanakan perjalanan</h2>
    <p>Tujuan: RS UMS A.R. Fachrudin, Jl. Adi Sucipto No. 167, Surakarta.</p>
    <label htmlFor="travel-origin">Lokasi awal atau alamat</label>
    <input id="travel-origin" value={origin} onChange={e => { request.current++; setLoading(false); setOrigin(e.target.value); setStatus(''); }} placeholder="Contoh: rumah atau nama jalan" />
    <Button variant="secondary" onClick={locate} disabled={loading}><LocateFixed aria-hidden="true" />{loading ? 'Mencari lokasi…' : 'Gunakan lokasi saya'}</Button>
    <a className="button secondary" href={`https://www.google.com/maps/dir/?${params}`} target="_blank" rel="noopener noreferrer">Lihat rute di Google Maps<ArrowUpRight aria-hidden="true" /></a>
    <p className="small muted">Lokasi disimpan selama halaman terbuka. Saat membuka rute, lokasi awal diteruskan ke Google Maps.</p>
    <p role="status">{status}</p>
    <form onChange={() => setResult(null)} onSubmit={e => { e.preventDefault(); const fields = new FormData(e.currentTarget); setResult(departureTime(arrival, Number(fields.get('travel')), Number(fields.get('buffer')))); }}>
      <label htmlFor="travel-duration">Durasi perjalanan dari peta (menit)</label>
      <input id="travel-duration" name="travel" type="number" min="1" max="720" step="1" required placeholder="Contoh: 30" />
      <label htmlFor="travel-buffer">Waktu parkir dan berjalan ke poli (menit)</label>
      <input id="travel-buffer" name="buffer" type="number" min="0" max="120" step="1" required defaultValue="10" />
      <Button type="submit">Hitung saran berangkat</Button>
    </form>
    {result && <div className="travel-result" role="status"><p>Saran berangkat berdasarkan perjalanan Anda</p><strong className="metric">{result.time} WIB</strong>{result.previousDay && <p>Berangkat pada hari sebelumnya.</p>}<p>Agar tiba di poli pukul {arrival}. Estimasi ini memakai durasi yang Anda isi, belum memperbarui lalu lintas otomatis.</p><button type="button" className="button ghost" onClick={() => setResult(null)}>Hapus perhitungan</button></div>}
  </section>;
}
