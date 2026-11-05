import Link from 'next/link';
export default function NotFound() { return <main className="public-page"><h1>Halaman tidak ditemukan</h1><p>Periksa kembali tautan atau buka jadwal dokter.</p><Link className="button primary" href="/jadwal">Lihat jadwal dokter</Link></main>; }
