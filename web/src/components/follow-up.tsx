'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, CheckCheck, RotateCcw } from 'lucide-react';
import data from '@/data/mockup-data.json';
import { Panel, StatusBadge } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { DemoAction } from '@/components/demo-action';

export function FollowUp() {
  const [filter, setFilter] = useState('jadwal_ulang');
  const [done, setDone] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const rows = data.antrean_rina.filter(p => p.status_pesan === filter);
  return <><div className="page-heading"><div><h1>Tindak lanjut</h1><p className="overview-subtitle">Tangani permintaan jadwal ulang dan pasien yang belum membaca pesan.</p></div></div>
    <Panel title="Pasien yang perlu dihubungi"><div className="chips">{[{value:'jadwal_ulang',label:'Minta jadwal ulang'}, {value:'terkirim',label:'Belum membaca'}].map(item => <button className={`chip ${filter === item.value ? 'selected' : ''}`} aria-pressed={filter === item.value} key={item.value} onClick={() => { setFilter(item.value); setSelected(''); }}>{item.label} ({data.antrean_rina.filter(p => p.status_pesan === item.value && !done.includes(p.kode_booking)).length})</button>)}</div>
      {rows.filter(p => !done.includes(p.kode_booking)).map(p => <article className="followup-row" key={p.kode_booking}><div><h2>{p.nama}</h2><p className="muted">{p.kode_booking} · Antrean {p.antrean} · {data.sesi[0].dokter}</p><StatusBadge status={p.status_pesan} /></div><div className="form-actions"><Link className="button secondary" href={`/app/sesi/s-pd-rina?q=${p.kode_booking}`}>Buka pasien<ArrowUpRight /></Link><Button onClick={() => setSelected(selected === p.kode_booking ? '' : p.kode_booking)}>Tinjau tindak lanjut</Button></div>
        {selected === p.kode_booking && <div className="followup-review"><p>{filter === 'jadwal_ulang' ? 'Hubungi pasien untuk menyepakati salah satu slot berikut sebelum menandai selesai.' : 'Pastikan pasien sudah menerima informasi jam datang sebelum menandai selesai.'}</p>{filter === 'jadwal_ulang' && <ul>{data.asisten.analisis.slot.map(slot => <li key={slot.id}>{slot.hari}, {slot.jam} · {slot.catatan}</li>)}</ul>}<DemoAction title="Hubungi pasien" message="Nomor telepon tidak ditampilkan pada data simulasi. Pada aplikasi operasional, petugas menghubungi nomor terdaftar pasien.">Hubungi pasien</DemoAction><Button variant="secondary" onClick={() => { setDone([...done, p.kode_booking]); setSelected(''); }}><CheckCheck />Tandai selesai pada demo</Button></div>}
      </article>)}
      {rows.every(p => done.includes(p.kode_booking)) && <div className="empty" role="status"><h2>Tindak lanjut pada daftar ini selesai</h2><p>Perubahan hanya berlaku selama halaman ini terbuka.</p><Button variant="secondary" onClick={() => setDone([])}><RotateCcw />Atur ulang demo</Button></div>}
    </Panel><p className="small muted table-note">Data simulasi. Menandai selesai tidak mengubah booking atau mengirim pesan.</p></>;
}
