import { notFound } from 'next/navigation';
import data from '@/data/mockup-data.json';
import { Arrival } from '@/components/public-pages';
export const metadata = { title: 'Jam datang saya' };
export default async function Page({ params }: { params: Promise<{ kode: string }> }) {
  const { kode } = await params;
  if (kode !== 'KD-4812') notFound();
  const pasien = data.antrean_rina.find(p => p.kode_booking === kode)!;
  return <Arrival pasien={pasien} sesi={data.sesi[0]} />;
}
