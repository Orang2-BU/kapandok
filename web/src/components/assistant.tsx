'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CalendarClock, CheckCheck, Database, FileClock, Send, ShieldCheck } from 'lucide-react';
import data from '@/data/mockup-data.json';
import { Panel, StatusBadge } from '@/components/shared';
import { DemoAction } from '@/components/demo-action';
import { LogoSymbol } from '@/components/logo';
import './assistant.css';

const contoh = ['Siapa yang belum membaca pesan?', 'Ringkas sesi dr. Dewi', 'Kirim ulang pesan ke Bapak Slamet Riyadi'];

function Petugas({ jam, children }: { jam: string; children: React.ReactNode }) {
  return <li className="chat-row from-user"><div className="bubble user">{children}</div><span className="chat-meta">Rahmat · {jam}</span></li>;
}
function Asisten({ jam, jejak, children }: { jam: string; jejak: string; children: React.ReactNode }) {
  return <li className="chat-row from-ai"><LogoSymbol className="ai-avatar" /><div className="ai-body"><span className="chat-meta"><b>Asisten KapanDok</b> · {jam}</span><p className="trace"><Database aria-hidden="true" />{jejak}</p>{children}</div></li>;
}

export function Assistant() {
  const [teks, setTeks] = useState('');
  const { asisten, antrean_rina: antrean, ringkasan_pesan_rina: ringkasan } = data;
  const rina = data.sesi[0];
  const belum = antrean.filter(p => p.status_pesan !== 'hadir');
  const nur = antrean.find(p => p.kode_booking === asisten.analisis.kode_booking);
  const slotUsulan = asisten.analisis.slot.find(s => s.id === asisten.analisis.usulan.slot_id);
  if (!nur || !slotUsulan) throw new Error('Skenario asisten tidak cocok dengan antrean.');
  const pilih = (value: string) => setTeks(value);

  return <>
    <div className="page-heading"><div><h1>Asisten</h1><p className="overview-subtitle">Minta rekap atau aksi rutin dengan kalimat biasa. Data diambil dari sistem, aksi dijalankan setelah Anda setuju.</p></div></div>
    <div className="bento assistant-grid">
      <section className="panel span8 chat-panel" aria-label="Percakapan dengan asisten">
        <ol className="chat-thread">
          <Petugas jam={asisten.rekap.jam}>{asisten.rekap.permintaan}</Petugas>
          <Asisten jam={asisten.rekap.jam} jejak={`Membaca antrean ${rina.dokter.split(',')[0]} (${rina.pasien} pasien)`}>
            <p>Ada <b>{belum.length} dari {rina.pasien} pasien</b> yang belum konfirmasi hadir: {ringkasan.minta_jadwal_ulang} minta jadwal ulang, {ringkasan.dibaca_belum_membalas} sudah membaca tapi belum membalas, dan {ringkasan.belum_dibaca} belum membaca.</p>
            <div className="ai-table" tabIndex={0} aria-label="Pasien yang belum konfirmasi hadir, gulir untuk melihat semua kolom">
              <table>
                <thead><tr><th scope="col">Pasien</th><th scope="col" className="num">Jam datang</th><th scope="col" className="status-col">Status pesan</th></tr></thead>
                <tbody>{belum.map(p => <tr key={p.kode_booking}><td><b>{p.nama}</b><small>Antrean {p.antrean} · {p.kode_booking}</small><span className="status-inline"><StatusBadge status={p.status_pesan} /></span></td><td className="num">{p.jam_datang}</td><td className="status-col"><StatusBadge status={p.status_pesan} /></td></tr>)}</tbody>
              </table>
            </div>
            <Link className="ai-link" href="/app/sesi/s-pd-rina">Buka detail sesi <ArrowRight /></Link>
          </Asisten>

          <Petugas jam={asisten.analisis.jam}>{asisten.analisis.permintaan}</Petugas>
          <Asisten jam={asisten.analisis.jam} jejak="Menghitung slot pengganti dan efek ke antrean">
            <p>Bisa. {nur.nama} (antrean {nur.antrean}, slot {nur.slot_awal}) punya {asisten.analisis.slot.length} slot pengganti dengan {rina.dokter.split(',')[0]}:</p>
            <ul className="slot-list">{asisten.analisis.slot.map(s => <li key={s.id} className={s.id === slotUsulan.id ? 'picked' : ''}><CalendarClock aria-hidden="true" /><span><b>{s.hari}, {s.jam}</b><small>{s.catatan}</small></span>{s.id === slotUsulan.id && <span className="badge info">Disarankan</span>}</li>)}</ul>
            <dl className="flags">
              <div><dt>Efek ke antrean hari ini</dt><dd>{asisten.analisis.efek_antrean}</dd></div>
              {asisten.analisis.penanda.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.nilai}<small>Sumber: {f.sumber}</small></dd></div>)}
            </dl>
            <p className="ai-note"><ShieldCheck aria-hidden="true" />Penanda di atas diambil dari data pendaftaran. Penilaian kondisi medis tetap oleh dokter.</p>
            <div className="proposal">
              <div className="proposal-head"><b>Usulan {asisten.analisis.usulan.id}</b><span className="muted small">Berlaku sampai {asisten.analisis.usulan.berlaku_sampai}</span></div>
              <p className="change"><span className="old-slot">Senin, 9 November 2026, {nur.slot_awal}</span><ArrowRight aria-hidden="true" /><b>{slotUsulan.hari}, {slotUsulan.jam}</b></p>
              <p className="muted small">Kode booking tetap {nur.kode_booking}. {nur.nama} menerima WhatsApp jadwal baru. Balas &quot;oke&quot; untuk menjalankan, atau sebut slot lain.</p>
            </div>
          </Asisten>

          <Petugas jam={asisten.aksi.jam}>{asisten.aksi.permintaan}</Petugas>
          <Asisten jam={asisten.aksi.jam} jejak={`Menjalankan usulan ${asisten.analisis.usulan.id} setelah konfirmasi Anda`}>
            <div className="receipt">
              <p className="receipt-head"><CheckCheck aria-hidden="true" />Sudah dijadwalkan</p>
              <dl>
                <div><dt>Kunjungan</dt><dd>{nur.nama} pindah ke {slotUsulan.hari}, {slotUsulan.jam}</dd></div>
                <div><dt>WhatsApp</dt><dd>Tertahan, terkirim {asisten.aksi.wa_tertahan_sampai}</dd></div>
                <div><dt>Tindak lanjut</dt><dd>Ditandai selesai</dd></div>
                <div><dt>Log aktivitas</dt><dd>{asisten.aksi.log_id}, oleh Rahmat Hidayat</dd></div>
              </dl>
              <DemoAction variant="secondary" title="Batalkan jadwal ulang" message={`Selama WhatsApp masih tertahan (sampai ${asisten.aksi.wa_tertahan_sampai}), jadwal ${nur.nama} dapat dikembalikan ke ${nur.slot_awal} tanpa pesan terkirim. Mockup ini tidak mengubah data.`}>Batalkan sebelum {asisten.aksi.wa_tertahan_sampai}</DemoAction>
            </div>
          </Asisten>
        </ol>

        <form className="composer" onSubmit={e => e.preventDefault()}>
          <div className="chips" aria-label="Contoh permintaan">{contoh.map(c => <button type="button" key={c} className="chip" onClick={() => pilih(c)}>{c}</button>)}</div>
          <label className="composer-box"><span className="sr-only">Tulis permintaan untuk asisten</span><textarea rows={2} value={teks} onChange={e => setTeks(e.target.value)} placeholder="Tulis permintaan, misalnya: siapa yang belum membaca pesan?" /></label>
          <DemoAction variant="default" className="composer-send" title="Asisten aktif di Fase 1" message="Percakapan di halaman ini adalah contoh dengan data simulasi. Pada Fase 1 permintaan dikirim ke asisten, yang hanya dapat memakai fungsi sesuai hak akses akun Anda."><Send aria-hidden="true" />Kirim</DemoAction>
        </form>
      </section>

      <div className="span4 assistant-side">
        <Panel title="Yang bisa dikerjakan">
          <dl className="abilities">
            <div><dt>Langsung</dt><dd>Rekap antrean, cari pasien, ringkas sesi, analisis jadwal ulang</dd></div>
            <div><dt>Setelah Anda setuju</dt><dd>Jadwal ulang satu pasien, kirim ulang WhatsApp (maks 5 pasien)</dd></div>
            <div><dt>Lewat menu sesi</dt><dd>Ubah jam mulai dan batalkan praktik, dengan pratinjau jumlah pasien terdampak</dd></div>
            <div><dt>Tidak dikerjakan</dt><dd>Menilai kondisi medis atau prioritas klinis</dd></div>
          </dl>
        </Panel>
        <Panel title="Aksi asisten hari ini" tone="success">
          <ul className="action-log"><li><FileClock aria-hidden="true" /><span><b>{asisten.aksi.jam} · Jadwal ulang {nur.nama}</b><small>{asisten.aksi.log_id} · WhatsApp tertahan sampai {asisten.aksi.wa_tertahan_sampai}</small></span></li></ul>
        </Panel>
      </div>
    </div>
  </>;
}
