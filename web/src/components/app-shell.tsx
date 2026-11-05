'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, LayoutDashboard, MessageSquareText, BarChart3, Building2, CalendarDays, ChevronDown, CircleAlert, Clock3, History, Play, Search, Settings2, Stethoscope, Users, UserRoundCog } from 'lucide-react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { SimLabel } from '@/components/shared';
import { LogoSymbol, LogoWordmark } from '@/components/logo';
import data from '@/data/mockup-data.json';
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const admin = pathname.startsWith('/admin');
  const nav = [
    { label: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Hari ini', href: '/app', icon: Clock3 },
    { label: 'Asisten', href: '/app/asisten', icon: MessageSquareText },
    { label: 'Tindak lanjut', href: '/app/sesi/s-pd-rina?status=jadwal_ulang', icon: CircleAlert, badge: data.ringkasan_pesan_rina.minta_jadwal_ulang },
    { label: 'Pasien', href: '/app/sesi/s-pd-rina', icon: Users },
    { label: 'Riwayat', href: '/app/riwayat', icon: History },
    { label: 'Laporan', href: '/admin/laporan', icon: BarChart3 },
    { label: 'Dokter', href: '/admin/dokter', icon: Stethoscope }, { label: 'Poli', href: '/admin/poli', icon: Building2 },
    { label: 'Jadwal praktik', href: '/admin/jadwal', icon: CalendarDays }, { label: 'Pengguna', href: '/admin/pengguna', icon: UserRoundCog },
    { label: 'Pengaturan', href: '/admin/pengaturan', icon: Settings2 }, { label: 'Mode demo', href: '/admin/demo', icon: Play },
  ];
  return <div className="app-shell"><a href="#konten" className="skip-link">Lewati navigasi</a><Sidebar><SidebarBody><Link className="brand" href="/app/dashboard" aria-label="KapanDok, dashboard"><LogoSymbol /><span className="brand-wordmark"><LogoWordmark /><small>Koordinasi praktik dokter</small></span></Link><div className="nav-items">{nav.map(item => <div key={item.label}>{item.label === 'Laporan' && <div className="nav-divider"><span className="nav-label">Admin</span></div>}<SidebarLink {...item} icon={<item.icon />} active={pathname === item.href} /></div>)}</div><div className="public-nav"><SidebarLink href="/jadwal" label="Jadwal publik" icon={<Globe />} /></div></SidebarBody><div className="workspace"><header className="topbar"><form className="search" role="search" onSubmit={event => { event.preventDefault(); const query = String(new FormData(event.currentTarget).get('q') ?? ''); router.push(`/app/sesi/s-pd-rina?q=${encodeURIComponent(query)}`); }}><button aria-label="Cari pasien" className="search-submit"><Search /></button><input name="q" aria-label="Cari pasien atau kode booking" placeholder="Cari pasien atau kode booking" /></form><div className="account-group"><SimLabel /><details className="account"><summary><span className="avatar">{admin ? 'WS' : 'RH'}</span><span><b>{admin ? 'Wulan Sari' : 'Rahmat Hidayat'}</b><small>{admin ? 'Admin RS' : 'Petugas poli'}</small></span><ChevronDown /></summary><div className="account-menu"><p>Akun demo</p><Link href="/admin/pengguna">Profil pengguna</Link><Link href="/jadwal">Buka tampilan pasien</Link><Link href={admin ? '/app' : '/admin/laporan'}>{admin ? 'Lihat sebagai petugas' : 'Lihat sebagai admin'}</Link></div></details></div></header><main id="konten">{children}</main><footer className="app-footer"><span>{data.rumah_sakit}</span><span>KapanDok · Mockup Fase 0</span></footer></div></Sidebar></div>;
}
