import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, Users, Stethoscope, MessageCircle } from 'lucide-react';
import data from '@/data/mockup-data.json';
import { Panel, StatusBadge } from '@/components/shared';

export function Overview() {
  const rina = data.sesi[0];
  const response = data.ringkasan_pesan_rina;
  const stats = [
    { label: 'Sesi praktik', value: data.sesi.length, note: 'Terjadwal hari ini', icon: CalendarDays },
    { label: 'Pasien terjadwal', value: data.sesi.reduce((sum, sesi) => sum + sesi.pasien, 0), note: 'Tersebar di 5 poli', icon: Users },
    { label: 'Perlu perhatian', value: data.sesi.filter(s => !['berjalan', 'tepat_waktu'].includes(s.status)).length, note: '2 terlambat · 1 batal', icon: Stethoscope },
    { label: 'Konfirmasi hadir', value: response.konfirmasi_hadir, note: 'Dari 22 pasien dr. Rina', icon: MessageCircle },
  ];
  return <><div className="page-heading"><div><h1>Dashboard</h1><p className="overview-subtitle">Pantau praktik hari ini. Bantu pasien datang di waktu yang tepat.</p></div><span className="pill"><Clock3 />9 November 2026 · {data.snapshot}</span></div><div className="bento">
    {stats.map(item => <div className="panel summary-panel span3" key={item.label}><div className="summary-label">{item.label}<item.icon /></div><strong className="metric">{item.value}</strong><small>{item.note}</small></div>)}
    <Panel title="Dari sinyal rumah sakit ke jam datang pasien" className="span12"><div className="flow-steps">{[{ title: 'Sinyal diterima', text: 'Aktivitas dokter diperbarui', time: '08.40' }, { title: 'Prediksi dikonfirmasi', text: 'dr. Rina menyetujui estimasi', time: '08.41' }, { title: 'Pasien diberi kabar', text: '22 pesan simulasi terkirim', time: '08.43' }, { title: 'Jam datang pribadi', text: 'Sesuai urutan antrean pasien', time: '22 pasien' }].map((step, i) => <div className="flow-step" key={step.title}><span>0{i + 1} / {step.time}</span><b>{step.title}</b><small>{step.text}</small></div>)}</div></Panel>
    <section className="panel overview-hero span4"><span className="badge info">Sorotan sesi · Penyakit Dalam</span><h2>Jam praktik berubah.<br />Pasien sudah diberi kabar.</h2><p className="muted">{rina.dokter}</p><div><small>Perkiraan mulai praktik</small><p className="display-time">{rina.prediksi_mulai}</p><small>Rentang {rina.rentang} · dikonfirmasi 08.41</small></div><p>{response.belum_dibaca} pasien belum membaca informasi jam datang terbaru.</p><Link className="button" href="/app/sesi/s-pd-rina">Pantau sesi dr. Rina<ArrowUpRight /></Link></section>
    <Panel title="Aktivitas poli" className="span8 alt overview-clinics" aside={<Link className="badge info" href="/app">Semua sesi <ArrowRight /></Link>}><div className="overview-grid">{data.sesi.slice(1).map(s => <div className="clinic-card" key={s.id}><StatusBadge status={s.status} /><h3>{s.poli}</h3><small>{s.dokter}</small><p className="clinic-time">{s.status === 'batal' ? 'Praktik dibatalkan' : s.prediksi_mulai}</p><small>{s.pasien} pasien · Jadwal {s.jadwal}</small></div>)}</div></Panel>
    <Panel title="Respons pasien dr. Rina" className="span5" aside={<small>22 pasien</small>}><p><strong className="metric">{response.konfirmasi_hadir}</strong> <span className="muted">pasien konfirmasi hadir</span></p><div className="response-bar" aria-hidden="true"><span style={{ flex: response.konfirmasi_hadir }} /><span style={{ flex: response.belum_dibaca }} /><span style={{ flex: rina.pasien - response.konfirmasi_hadir - response.belum_dibaca }} /></div><div className="response-list"><div><span>Sudah membaca pesan</span><b>{response.sudah_dibaca_total}</b></div><div><span>Belum membaca</span><b>{response.belum_dibaca}</b></div><div><span>Minta jadwal ulang</span><b>{response.minta_jadwal_ulang}</b></div></div></Panel>
    <Panel title="Langkah berikutnya" className="span7"><Link className="overview-link" href="/app/sesi/s-pd-rina?status=jadwal_ulang"><span><b>Tindak lanjuti permintaan jadwal ulang</b><small>1 pasien pada sesi dr. Rina</small></span><ArrowUpRight /></Link><Link className="overview-link" href="/app"><span><b>Pantau konfirmasi dokter dan sesi batal</b><small>dr. Dewi menunggu konfirmasi · dr. Agus batal praktik</small></span><ArrowUpRight /></Link><Link className="overview-link" href="/admin/laporan"><span><b>Pelajari dampak pengaturan jam datang</b><small>Perbandingan 4 strategi dari 300 sesi simulasi</small></span><ArrowUpRight /></Link></Panel>
  </div></>;
}
