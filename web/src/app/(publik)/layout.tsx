import data from '@/data/mockup-data.json';
import { PublicHeader } from '@/components/public-pages';
export default function Layout({ children }: { children: React.ReactNode }) { return <main className="public-page"><PublicHeader rumahSakit={data.rumah_sakit} />{children}</main>; }
