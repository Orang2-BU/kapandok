'use client';
import { useEffect, useRef, useState } from 'react';
import { Bell, MapPin, MessageCircle } from 'lucide-react';
import data from '@/data/mockup-data.json';
import config from '@/data/travel-config.json';
import { departureTime, readRoadRoute } from '@/lib/travel';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/shared';

export function StaffNotification() {
  const [result, setResult] = useState<(Awaited<ReturnType<typeof readRoadRoute>> & ReturnType<typeof departureTime>) | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  const pasien = data.antrean_rina.find(p => p.kode_booking === config.savedPatientAddress.bookingCode);
  const sesi = data.sesi[0];
  if (!pasien) throw new Error('Alamat simulasi tidak cocok dengan pasien.');
  async function calculate() {
    if (!pasien) return;
    controller.current?.abort();
    const current = new AbortController(); controller.current = current;
    const timeout = setTimeout(() => current.abort(), 12000);
    setLoading(true); setResult(null); setStatus('Menghitung perjalanan dari alamat pasien…');
    try {
      const route = await readRoadRoute(config.savedPatientAddress, current.signal);
      if (current.signal.aborted) return;
      setResult({ ...route, ...departureTime(pasien.jam_datang, route.minutes, config.parkingMinutes + config.roadBufferMinutes) });
      setStatus('Saran dari alamat pasien siap ditinjau.');
    } catch (error) {
      if (controller.current === current) setStatus(error instanceof Error && error.name !== 'AbortError' ? error.message : 'Perhitungan belum berhasil. Coba lagi.');
    } finally { clearTimeout(timeout); if (controller.current === current) setLoading(false); }
  }
  return <Panel id="notifikasi-pasien" title="Notifikasi pasien" className="span12 staff-notifications" aside={<span className="badge info"><Bell aria-hidden="true" />Saran perjalanan</span>}>
    <details>
      <summary className="notification-summary"><span><b>Perubahan jadwal · {pasien.nama}</b><small>{pasien.kode_booking} · Antrean {pasien.antrean} · Tinjau saran dari alamat terdaftar</small></span></summary>
      <div className="notification-content">
        <p><MapPin aria-hidden="true" />{config.savedPatientAddress.label}</p>
        <p className="muted">Perhitungan memakai titik alamat rumah yang tersimpan pada data simulasi, tanpa meminta lokasi perangkat pasien atau petugas.</p>
        <Button variant="secondary" onClick={calculate} disabled={loading}>{loading ? 'Menghitung perjalanan…' : 'Hitung dari alamat pasien'}</Button>
        <p role="status">{status}</p>
        {result && <>
          <p className="badge info">Saran berangkat {result.time} WIB{result.previousDay ? ' (hari sebelumnya)' : ''} · Perjalanan {result.minutes} menit</p>
          <p className="small muted">Target tiba {pasien.jam_datang}. Termasuk cadangan {config.roadBufferMinutes} menit dan parkir/jalan {config.parkingMinutes} menit. Estimasi mobil, tanpa kemacetan langsung.</p>
          <section className="patient-message" aria-labelledby="staff-message-title"><h3 id="staff-message-title"><MessageCircle aria-hidden="true" />Pratinjau WhatsApp pasien</h3><p>{pasien.nama}, jadwal praktik {sesi.dokter} berubah dari {sesi.jadwal.slice(0, 5)} menjadi perkiraan {sesi.prediksi_mulai} WIB.</p><p>Anda diperkirakan dipanggil {pasien.perkiraan_dipanggil}. Datang ke poli pukul {pasien.jam_datang}. Berdasarkan alamat rumah Anda, perjalanan sekitar {result.minutes} menit. Kami sarankan berangkat {result.time} WIB{result.previousDay ? ' pada hari sebelumnya' : ''}, termasuk waktu cadangan dan parkir.</p><p>Periksa pembaruan sebelum berangkat. Nomor antrean {pasien.antrean} · {pasien.kode_booking}.</p><small>Pratinjau simulasi untuk petugas, belum dikirim ke WhatsApp.</small></section>
        </>}
      </div>
    </details>
  </Panel>;
}
