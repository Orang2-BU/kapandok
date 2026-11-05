'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Pause, Pencil, Play, Plus, RotateCcw, Search, X } from 'lucide-react';
import data from '@/data/mockup-data.json';
import { Button } from '@/components/ui/button';
import { Panel, StatusBadge } from '@/components/shared';

function Heading({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return <div className="page-heading"><div><h1>{title}</h1><p className="overview-subtitle">{description}</p></div>{children}</div>;
}

type RecordItem = { id: string; nama: string; detail: string; aktif: boolean };
export function Directory({ kind }: { kind: 'dokter' | 'poli' | 'pengguna' }) {
  const title = { dokter: 'Dokter', poli: 'Poli', pengguna: 'Pengguna' }[kind];
  const initial: RecordItem[] = kind === 'pengguna' ? data.administrasi.pengguna.map(p => ({ id: p.id, nama: p.nama, detail: p.peran, aktif: true })) : data.sesi.map(s => ({ id: s.id, nama: kind === 'dokter' ? s.dokter : s.poli, detail: kind === 'dokter' ? s.poli : s.dokter, aktif: true }));
  const [records, setRecords] = useState(initial);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [notice, setNotice] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = records.filter(r => `${r.nama} ${r.detail}`.toLowerCase().includes(query.toLowerCase()));
  function edit(record: RecordItem | null) { setEditing(record); dialog.current?.querySelector('form')?.reset(); dialog.current?.showModal(); }
  return <><Heading title={title} description={kind === 'dokter' ? 'Daftar dokter dan poli tempat praktik.' : kind === 'poli' ? 'Atur layanan poli dan dokter penanggung jawab.' : 'Kelola akses petugas poli dan administrator rumah sakit.'}><Button onClick={() => edit(null)}><Plus />Tambah {kind}</Button></Heading>
    <Panel title={`Daftar ${kind}`} aside={<small>{records.filter(r => r.aktif).length} aktif dari {records.length}</small>}><label className="search management-search"><Search /><input aria-label={`Cari ${kind}`} placeholder={`Cari ${kind}`} value={query} onChange={e => setQuery(e.target.value)} /></label>
      <div className="directory-list">{shown.map(r => <article className="directory-row" key={r.id}><span className="directory-avatar">{r.nama.replace('dr. ', '').slice(0, 1)}</span><div className="directory-name"><h3>{r.nama}</h3><p className="muted">{r.detail}</p></div><span className={`badge ${r.aktif ? 'success' : 'neutral'}`}>{r.aktif ? 'Aktif' : 'Nonaktif'}</span><Button variant="secondary" onClick={() => edit(r)} aria-label={`Ubah ${r.nama}`}><Pencil />Ubah</Button></article>)}</div>
      {!shown.length && <div className="empty"><h2>Tidak ada hasil</h2><p>Coba kata pencarian lain.</p><Button variant="secondary" onClick={() => setQuery('')}>Hapus pencarian</Button></div>}
    </Panel><p className="save-notice" role="status">{notice}</p>
    <dialog className="dialog" ref={dialog} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><div className="dialog-head"><h2>{editing ? 'Ubah' : 'Tambah'} {kind}</h2><button className="icon-button" aria-label="Tutup formulir" onClick={() => dialog.current?.close()}><X /></button></div>
      <form key={editing?.id ?? 'new'} className="management-form" onSubmit={e => { e.preventDefault(); const fields = new FormData(e.currentTarget); const nama = String(fields.get('nama')).trim(); const detail = String(fields.get('detail')).trim(); if (!nama || !detail) return; const item = { id: editing?.id ?? crypto.randomUUID(), nama, detail, aktif: fields.get('aktif') === 'on' }; setRecords(old => editing ? old.map(r => r.id === item.id ? item : r) : [...old, item]); setNotice(`${nama} berhasil disimpan pada sesi tampilan ini.`); dialog.current?.close(); }}>
        <label>Nama {kind}<input name="nama" defaultValue={editing?.nama ?? ''} required maxLength={100} /></label>
        <label>{kind === 'pengguna' ? 'Peran' : kind === 'dokter' ? 'Poli' : 'Dokter penanggung jawab'}{kind === 'pengguna' ? <select name="detail" defaultValue={editing?.detail ?? 'Petugas poli'}><option>Petugas poli</option><option>Admin RS</option></select> : kind === 'dokter' ? <select name="detail" defaultValue={editing?.detail ?? data.sesi[0].poli}>{data.sesi.map(s => <option key={s.id}>{s.poli}</option>)}</select> : <input name="detail" defaultValue={editing?.detail ?? ''} required maxLength={100} />}</label>
        <label className="check-field"><input type="checkbox" name="aktif" defaultChecked={editing?.aktif ?? true} />Aktif</label><Button type="submit"><Check />Simpan</Button>
      </form>
    </dialog>
  </>;
}

export function PracticeSchedule() {
  const [rows, setRows] = useState(data.sesi.map(s => ({ ...s, mulai: s.jadwal.slice(0, 5).replace('.', ':'), selesai: s.jadwal.slice(6).replace('.', ':') })));
  const [notice, setNotice] = useState('');
  return <><Heading title="Jadwal praktik" description="Atur jam praktik dokter untuk Senin, 9 November 2026." /><form onSubmit={e => { e.preventDefault(); setNotice('Jadwal berhasil disimpan pada sesi tampilan ini.'); }}><Panel title="Jadwal Senin" aside={<small>{rows.length} dokter</small>}><div className="schedule-rows">{rows.map((r, i) => <div className="schedule-row" key={r.id}><div><h3>{r.dokter}</h3><p className="muted">Poli {r.poli} · {r.pasien} pasien terjadwal</p></div><label>Mulai<input aria-label={`Mulai ${r.dokter}`} type="time" required value={r.mulai} max={r.selesai} onChange={e => { setNotice(''); setRows(old => old.map((v, n) => n === i ? { ...v, mulai: e.target.value } : v)); }} /></label><label>Selesai<input aria-label={`Selesai ${r.dokter}`} type="time" required value={r.selesai} min={r.mulai} onChange={e => { setNotice(''); setRows(old => old.map((v, n) => n === i ? { ...v, selesai: e.target.value } : v)); }} /></label></div>)}</div><div className="form-actions"><Button type="submit"><Check />Simpan jadwal</Button></div></Panel></form><p className="save-notice" role="status">{notice}</p></>;
}

export function Settings() {
  const defaults = data.administrasi.pengaturan;
  const [values, setValues] = useState(defaults);
  const [notice, setNotice] = useState('');
  const fields = [{ key: 'ambang_rentang' as const, label: 'Rentang prediksi perlu konfirmasi', note: 'Minta dokter mengonfirmasi bila rentang prediksi melebihi ambang ini.' }, { key: 'ambang_perubahan' as const, label: 'Perubahan jam untuk notifikasi', note: 'Beri kabar pasien ketika perubahan jam mencapai ambang ini.' }, { key: 'batas_konfirmasi' as const, label: 'Batas tunggu konfirmasi dokter', note: 'Petugas mengambil tindak lanjut jika dokter belum merespons.' }];
  return <><Heading title="Pengaturan" description="Tetapkan kapan sistem meminta konfirmasi dan memberi kabar pasien." /><form className="settings-layout" onSubmit={e => { e.preventDefault(); setNotice('Pengaturan berhasil disimpan pada sesi tampilan ini.'); }}><Panel title="Konfirmasi dan pemberitahuan">{fields.map(field => <div className="setting-row" key={field.key}><label htmlFor={field.key}><b>{field.label}</b><span>{field.note}</span></label><div><input id={field.key} type="number" min={1} max={120} required value={values[field.key]} onChange={e => { setNotice(''); setValues({ ...values, [field.key]: Number(e.target.value) }); }} /><span>menit</span></div></div>)}<div className="form-actions"><Button type="submit"><Check />Simpan pengaturan</Button><Button variant="secondary" onClick={() => { setValues(defaults); setNotice('Nilai awal dipulihkan.'); }}><RotateCcw />Kembalikan nilai awal</Button></div></Panel><Panel title="Tetap dalam kendali petugas" className="alt"><p>Prediksi merupakan perkiraan. Petugas dapat memantau konfirmasi dokter dan respons pasien sebelum menindaklanjuti perubahan sesi.</p><Link className="overview-link" href="/app/sesi/s-pd-rina">Buka sesi dr. Rina<ArrowUpRight /></Link></Panel></form><p className="save-notice" role="status">{notice}</p></>;
}

export function History() {
  const [date, setDate] = useState(data.administrasi.tanggal);
  return <><Heading title="Riwayat sesi" description="Telusuri jadwal, estimasi mulai, dan status sesi berdasarkan tanggal."><label className="date-filter">Tanggal<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label></Heading><Panel title="Sesi tersimpan" aside={<small>{date === data.administrasi.tanggal ? data.sesi.length : 0} sesi</small>}>{date === data.administrasi.tanggal ? data.sesi.map(s => <div className="history-row" key={s.id}><div><h3>{s.dokter}</h3><p className="muted">{s.poli} · Jadwal {s.jadwal}</p></div><div><small>{s.status === 'berjalan' ? 'Mulai aktual' : 'Perkiraan mulai'}</small><p>{s.status === 'batal' ? 'Dibatalkan' : s.prediksi_mulai}</p></div><StatusBadge status={s.status} />{s.id === 's-pd-rina' && <Link className="button secondary" href="/app/sesi/s-pd-rina">Detail sesi<ArrowUpRight /></Link>}</div>) : <div className="empty"><h2>Belum ada sesi pada tanggal ini</h2><p>Pilih tanggal lain untuk melihat riwayat.</p><Button variant="secondary" onClick={() => setDate(data.administrasi.tanggal)}>Lihat 9 November 2026</Button></div>}</Panel></>;
}

export function DemoPlayer() {
  const events = data.administrasi.timeline;
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setStep(current => Math.min(current + 1, events.length - 1)), 2500 / speed);
    return () => window.clearInterval(timer);
  }, [running, speed, events.length]);
  const finished = step === events.length - 1;
  const playing = running && !finished;
  const current = events[step];
  return <><Heading title="Mode demo" description="Ikuti perjalanan satu sesi, dari sinyal rumah sakit sampai pasien menerima jam datang." /><div className="bento"><section className="panel overview-hero span5 demo-current"><span className="badge info">{playing ? 'Sedang diputar' : finished ? 'Pemutaran selesai' : 'Siap diputar'}</span><h2>{data.sesi[0].dokter}</h2><p className="display-time">{current.jam}</p><h3>{current.judul}</h3><p>{current.catatan}</p><small>Peristiwa {step + 1} dari {events.length}</small></section><Panel title="Alur sesi" className="span7"><ol className="demo-timeline">{events.map((event, index) => <li key={index}><button className={index === step ? 'selected' : ''} aria-current={index === step ? 'step' : undefined} onClick={() => { setRunning(false); setStep(index); }}><time>{event.jam}</time><span>{event.judul}</span>{index < step && <Check />}</button></li>)}</ol></Panel><div className="panel span12 demo-controls"><Button onClick={() => { if (finished) setStep(0); setRunning(!playing); }}>{playing ? <Pause /> : <Play />}{playing ? 'Jeda' : finished ? 'Putar ulang' : 'Mulai demo'}</Button><Button variant="secondary" onClick={() => { setStep(0); setRunning(false); }}><RotateCcw />Atur ulang</Button><label>Kecepatan<select aria-label="Kecepatan" value={speed} onChange={e => setSpeed(Number(e.target.value))}><option value={1}>1×</option><option value={2}>2×</option><option value={4}>4×</option></select></label><Link className="button ghost" href="/app/sesi/s-pd-rina">Buka detail sesi<ArrowUpRight /></Link></div></div></>;
}
