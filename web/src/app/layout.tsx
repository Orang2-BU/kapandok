import type { Metadata } from 'next';
import { Onest, Manrope } from 'next/font/google';
import './globals.css';
const onest = Onest({ subsets: ['latin'], variable: '--font-onest', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
export const metadata: Metadata = { title: { default: 'KapanDok', template: '%s · KapanDok' }, description: 'Mockup jadwal dokter dan jam datang pribadi. Data simulasi.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={`${onest.variable} ${manrope.variable}`}>{children}</body></html>;
}
