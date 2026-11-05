import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
export const metadata: Metadata = { title: { default: 'KapanDok', template: '%s · KapanDok' }, description: 'Mockup jadwal dokter dan jam datang pribadi. Data simulasi.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={jakarta.variable}>{children}</body></html>;
}
