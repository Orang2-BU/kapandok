import { notFound } from 'next/navigation';
import { DemoPlayer, Directory, PracticeSchedule, Settings } from '@/components/management';

const titles: Record<string, string> = { dokter: 'Dokter', poli: 'Poli', pengguna: 'Pengguna', jadwal: 'Jadwal praktik', pengaturan: 'Pengaturan', demo: 'Mode demo' };
export function generateStaticParams() { return Object.keys(titles).map(halaman => ({ halaman })); }
export async function generateMetadata({ params }: { params: Promise<{ halaman: string }> }) { const { halaman } = await params; return { title: titles[halaman] ?? 'Halaman tidak ditemukan' }; }
export default async function Page({ params }: { params: Promise<{ halaman: string }> }) {
  const { halaman } = await params;
  if (halaman === 'dokter' || halaman === 'poli' || halaman === 'pengguna') return <Directory key={halaman} kind={halaman} />;
  if (halaman === 'jadwal') return <PracticeSchedule />;
  if (halaman === 'pengaturan') return <Settings />;
  if (halaman === 'demo') return <DemoPlayer />;
  notFound();
}
