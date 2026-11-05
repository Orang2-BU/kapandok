'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCheck, ChevronDown, Clock3, Eye, Stethoscope } from 'lucide-react';
import data from '@/data/mockup-data.json';
import type { Sesi } from '@/lib/types';
import { menit } from '@/lib/format';
import { Panel, StatusBadge } from '@/components/shared';
import { Button } from '@/components/ui/button';

function SesiRow({ sesi }: { sesi: Sesi }) {
  const content = <><div className="doctor"><h3>{sesi.dokter}</h3><small>{sesi.poli} · {sesi.jadwal} · {sesi.pasien} pasien</small></div><div><div className="session-time">{sesi.status === 'batal' ? 'Batal' : sesi.prediksi_mulai}{sesi.status !== 'batal' && <small>{sesi.rentang}</small>}</div><p className="reason">{sesi.pindah_slot ?? sesi.alasan}</p>{sesi.id === 's-pd-rina' && <small className="row-detail">Dikonfirmasi dokter 08.41 · 17 dari 22 dibaca · 12 hadir</small>}</div><StatusBadge status={sesi.status} /></>;
  return sesi.id === 's-pd-rina' ? <Link className="session-row interactive-row" href="/app/sesi/s-pd-rina">{content}<ArrowUpRight className="row-arrow" /></Link> : <div className="session-row">{content}</div>;
}
function DelayChart() {
  const ids = ['s-og-bambang', 's-m-lestari', 's-pd-rina', 's-a-dewi', 's-b-agus'];
  const series = ids.map(id => data.sesi.find(s => s.id === id)!);
  return <div className="delay-bars" aria-label="Keterlambatan mulai per dokter">{series.map(sesi => {
    const delay = sesi.status === 'batal' ? null : Math.max(0, menit(sesi.prediksi_mulai) - menit(sesi.jadwal.slice(0, 5)));
    return <div className="delay-bar-row" key={sesi.id}><span>{sesi.dokter.split(' ')[1]}</span><div><span style={{ width: `${delay === null ? 0 : delay / 80 * 100}%` }} /></div><b>{delay === null ? 'Batal' : `${delay} mnt`}</b></div>;
  })}</div>;
}
export function Dashboard() {
  const [poli, setPoli] = useState('Semua poli');
  const summary = data.ringkasan_pesan_rina; const rina = data.sesi[0];
  const perhatian = ['s-b-agus', 's-a-dewi', 's-pd-rina'].map(id => data.sesi.find(s => s.id === id)!).filter(s => poli === 'Semua poli' || s.poli === poli);
  const normal = data.sesi.filter(s => ['berjalan', 'tepat_waktu'].includes(s.status) && (poli === 'Semua poli' || s.poli === poli));
  return <><div className="page-heading"><h1><span>Senin, 9 November</span>Hari ini</h1><div className="controls"><label className="select-pill"><Stethoscope /><select aria-label="Filter poli" value={poli} onChange={e => setPoli(e.target.value)}><option>Semua poli</option>{data.sesi.map(s => <option key={s.id}>{s.poli}</option>)}</select><ChevronDown /></label><span className="pill updated"><Clock3 />Diperbarui {data.snapshot}</span><Button asChild><Link href="/app/tindak-lanjut">Tindak lanjut ({summary.minta_jadwal_ulang})<span className="circle"><ArrowRight /></span></Link></Button></div></div><div className="bento">
    {[{ label: 'Sesi hari ini', value: data.sesi.length, note: '2 terlambat · 1 batal', href: '#perhatian' }, { label: 'Pasien terjadwal', value: data.sesi.reduce((n, s) => n + s.pasien, 0), note: 'di 5 poli', href: '/app/sesi/s-pd-rina' }, { label: 'Menunggu konfirmasi dokter', value: data.sesi.filter(s => s.status === 'menunggu_konfirmasi').length, note: 'dr. Dewi Anggraini, dikirim 08.47', href: '#perhatian' }, { label: 'Perlu tindak lanjut', value: summary.minta_jadwal_ulang, note: '1 pasien minta jadwal ulang', href: '/app/tindak-lanjut' }].map(item => <Link className="panel summary-panel span3" href={item.href} key={item.label}><div className="summary-label">{item.label}<span className="circle"><ArrowUpRight /></span></div><div className="metric">{item.value}</div><small>{item.note}</small></Link>)}
    <Panel title="Perlu perhatian" tone="warning" className="span8" id="perhatian" aside={<small>{perhatian.length} dari {data.sesi.length} sesi</small>}>{perhatian.length ? perhatian.map(sesi => <SesiRow key={sesi.id} sesi={sesi} />) : <p className="empty">Tidak ada sesi yang memerlukan perhatian di poli ini.</p>}</Panel>
    <Panel title="Sesi paling terdampak" className="span4 alt" aside={<Link className="icon-button" aria-label="Buka sesi dr. Rina" href="/app/sesi/s-pd-rina"><ArrowUpRight /></Link>}><p className="muted small">dr. Rina Setyaningsih, mulai diperkirakan</p><div className="time-line"><span className="display-time">{rina.prediksi_mulai}</span><span className="badge primary"><ArrowUpRight />75 mnt</span></div><p className="small muted">Rentang {rina.rentang} · dikonfirmasi dokter 08.41</p><hr /><p><span className="metric">{summary.konfirmasi_hadir}</span><span className="small muted"> dari {rina.pasien} pasien konfirmasi hadir</span></p><div className="tags"><span className="badge info"><Eye />{summary.sudah_dibaca_total} dibaca</span><span className="badge neutral">{summary.belum_dibaca} belum dibaca</span><Link className="badge warning" href="/app/tindak-lanjut">{summary.minta_jadwal_ulang} jadwal ulang</Link></div></Panel>
    <Panel title="Keterlambatan mulai per dokter" className="span7" aside={<div className="chips"><span className="chip selected">Hari ini</span><Link className="chip" href="/app/riwayat">Riwayat sesi</Link></div>}><DelayChart /></Panel>
    <Panel title="Berjalan normal" tone="success" className="span5" aside={<small>{normal.length} sesi</small>}>{normal.length ? normal.map(sesi => <div key={sesi.id} className="normal-row"><div className="doctor"><h3>{sesi.dokter}</h3><small>{sesi.poli} · {sesi.pasien} pasien</small>{sesi.status === 'tepat_waktu' && <small>{sesi.prediksi_mulai} ({sesi.rentang})</small>}</div><StatusBadge status={sesi.status} label={sesi.status === 'berjalan' ? `Sudah mulai ${sesi.prediksi_mulai}` : undefined} /></div>) : <p className="empty">Belum ada sesi berjalan normal di poli ini.</p>}<p className="normal-note"><CheckCheck />Informasi sesi diperbarui dari sinyal rumah sakit.</p></Panel>
  </div></>;
}
