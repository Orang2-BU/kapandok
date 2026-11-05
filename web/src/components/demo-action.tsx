'use client';
import { useRef } from 'react';
import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function DemoAction({ children, title, message, variant = 'secondary', className = '' }: { children: React.ReactNode; title: string; message: string; variant?: 'default' | 'secondary' | 'ghost'; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <><Button variant={variant} className={className} onClick={() => dialog.current?.showModal()}>{children}</Button><dialog ref={dialog} className="dialog" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><div className="dialog-head"><span className="badge info"><Info />Pratinjau simulasi</span><button className="icon-button" aria-label="Tutup dialog" onClick={() => dialog.current?.close()}><X /></button></div><h2>{title}</h2><p>{message}</p><Button onClick={() => dialog.current?.close()}>Mengerti</Button></dialog></>;
}
