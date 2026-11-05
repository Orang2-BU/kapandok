import data from '@/data/mockup-data.json';
import { PublicSchedule } from '@/components/public-pages';
export const metadata = { title: 'Jadwal dokter' };
export default function Page() { return <PublicSchedule sesi={data.sesi} snapshot={data.snapshot} />; }
