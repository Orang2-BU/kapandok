'use client';
import { Button } from '@/components/ui/button';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="public-page"><h1>Halaman belum dapat ditampilkan</h1><p>Coba muat ulang untuk membuka kembali data simulasi.</p><Button onClick={reset}>Coba lagi</Button></main>; }
