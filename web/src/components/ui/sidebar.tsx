'use client';
// Diadaptasi dari skill sidebar-21st/components/sidebar.tsx (Aceternity).
// CSS menggantikan motion agar tidak menambah dependency untuk transisi sederhana.
import Link from 'next/link';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { LogoSymbol, LogoWordmark } from '@/components/logo';
const SidebarContext = createContext<{ open: boolean; setOpen: (open: boolean) => void }>({ open: false, setOpen: () => {} });
export function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return <SidebarContext.Provider value={{ open, setOpen }}><div className={`shell-frame ${collapsed ? "rail" : "wide"}`}><button className="desktop-toggle icon-button" aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"} aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</button>{children}</div></SidebarContext.Provider>;
}
export function SidebarBody({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useContext(SidebarContext);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open || !window.matchMedia('(max-width:1199px)').matches) return;
    const trigger = triggerRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex="0"]'));
      const first = items[0], last = items.at(-1);
      if (!first || !last) return;
      const current = document.activeElement;
      if (event.shiftKey && (current === first || current === panelRef.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (current === last || current === panelRef.current)) { event.preventDefault(); first.focus(); }
    };
    const media = window.matchMedia('(max-width:1199px)');
    const resize = () => setOpen(false);
    media.addEventListener('change', resize);
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', handleKey); media.removeEventListener('change', resize); trigger?.focus(); };
  }, [open, setOpen]);
  return <>
    <nav aria-label="Navigasi utama" className="desktop-sidebar expanded">{children}</nav>
    <div className="mobile-nav"><button ref={triggerRef} className="icon-button" aria-label="Buka menu" aria-expanded={open} aria-controls="mobile-sidebar" onClick={() => setOpen(true)}><Menu /></button><span className="logo-lockup" role="img" aria-label="KapanDok"><LogoSymbol /><LogoWordmark /></span></div>
    {open && <div className="drawer-layer"><div className="scrim" onClick={() => setOpen(false)} /><div ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Navigasi" id="mobile-sidebar" className="mobile-sidebar"><button className="icon-button close-drawer" aria-label="Tutup menu" onClick={() => setOpen(false)}><X /></button>{children}</div></div>}
  </>;
}
export function SidebarLink({ href, label, icon, active = false, badge }: { href: string; label: string; icon: React.ReactNode; active?: boolean; badge?: number }) {
  const { setOpen } = useContext(SidebarContext);
  const content = <><span className="rail-icon">{icon}{badge && <span className="rail-badge">{badge}</span>}</span><span className="nav-label">{label}</span></>;
  return <Link href={href} title={label} aria-label={label} aria-current={active ? 'page' : undefined} className={`sidebar-link ${active ? 'active' : ''}`} onClick={() => { if (window.innerWidth < 1200) setOpen(false); }}>{content}</Link>;
}
