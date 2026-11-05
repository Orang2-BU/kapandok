import { notFound } from 'next/navigation';
import { SessionDetail } from '@/components/session-detail';
export const metadata = { title: 'Detail sesi dr. Rina' };
export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ status?: string; q?: string }> }) {
  if ((await params).id !== 's-pd-rina') notFound();
  const query = await searchParams;
  return <SessionDetail initialStatus={query.status ?? ''} initialQuery={query.q ?? ''} key={`${query.status}:${query.q}`} />;
}
