import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { SessionDetail } from '@/components/session-detail';
export const metadata = { title: 'Detail sesi dr. Rina' };
export function generateStaticParams() { return [{ id: 's-pd-rina' }]; }
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  if ((await params).id !== 's-pd-rina') notFound();
  return <Suspense fallback={null}><SessionDetail /></Suspense>;
}
