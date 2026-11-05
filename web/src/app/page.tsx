import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarClock, CheckCheck, Radio } from 'lucide-react';
import { LogoSymbol, LogoWordmark } from '@/components/logo';
import { SimLabel } from '@/components/shared';
import data from '@/data/mockup-data.json';

export default function Home() {
  const rina = data.sesi[0];
  const pasien = data.antrean_rina.find(p => p.kode_booking === 'KD-4812')!;
  return <div className="landing">
    <a href="#konten" className="skip-link">Lewati navigasi</a>
    <header className="landing-header"><Link href="/" className="logo-lockup" aria-label="KapanDok"><LogoSymbol /><LogoWordmark /></Link><nav aria-label="Navigasi"><Link href="/jadwal">Jadwal dokter</Link><SimLabel /></nav></header>
    <main id="konten"><section className="landing-hero"><div className="landing-copy"><p className="landing-kicker">{data.rumah_sakit}</p><h1>Jam praktik berubah.<br /><span>Pasien tetap tahu kapan datang.</span></h1><p>Dari perkiraan mulai praktik hingga jam datang pribadi. Bantu petugas memberi kabar sebelum pasien berangkat.</p><div className="landing-actions"><Link className="button primary" href="/app/dashboard">Buka dashboard petugas <ArrowRight /></Link><Link className="button secondary" href="/jadwal">Lihat jadwal dokter <ArrowUpRight /></Link></div><small>Data simulasi · Tidak ada pengiriman WhatsApp nyata</small></div>
      <div className="landing-preview"><section className="landing-session"><p>Praktik hari ini · 9 November 2026</p><h2>{rina.dokter}</h2><p>Poli {rina.poli} · {rina.jadwal}</p><div className="landing-time"><span>Perkiraan mulai</span><strong>{rina.prediksi_mulai}</strong><span>Rentang {rina.rentang}</span></div><p><CheckCheck /> Dikonfirmasi dokter 08.41</p></section><section className="landing-patient"><p>Jam datang saya · Antrean {pasien.antrean}</p><h2>{pasien.nama}</h2><div className="landing-times"><div><span>Saran berangkat</span><strong>{pasien.saran_berangkat}</strong></div><div><span>Perkiraan dipanggil</span><strong>{pasien.perkiraan_dipanggil}</strong></div></div><Link href="/k/KD-4812">Buka contoh tampilan pasien <ArrowUpRight /></Link></section></div></section>
      <section className="landing-flow"><h2>Satu alur, dari sinyal sampai pasien.</h2><p>Petugas memantau. Dokter mengonfirmasi. Pasien mendapat jam datang.</p><div className="bento">{[{icon: Radio, title:'01 · Sinyal rumah sakit', text:'Aktivitas dokter menjadi dasar perkiraan mulai praktik.'},{icon: CheckCheck, title:'02 · Konfirmasi dokter', text:'Dokter mengonfirmasi perkiraan saat diperlukan.'},{icon: CalendarClock, title:'03 · Jam datang pasien', text:'Pasien mendapat jam datang pribadi dan petugas memantau respons.'}].map(item => <article className="panel span4" key={item.title}><item.icon /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section></main><footer className="landing-footer"><span>KapanDok · Tim Hadi Sudah Membaik</span><Link href="/admin/laporan">Laporan dampak <ArrowUpRight /></Link></footer>
  </div>;
}
