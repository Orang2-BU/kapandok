import { CalendarClock, Check, CheckCheck, Clock3, Eye, FlaskConical, XCircle } from 'lucide-react';
import { statusInfo } from '@/lib/format';
export function SimLabel() { return <span className="badge warning sim-label"><FlaskConical aria-hidden="true" />Data simulasi</span>; }
const icons = { checks: CheckCheck, check: Check, clock: Clock3, calendar: CalendarClock, eye: Eye, cancel: XCircle };
export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const info = statusInfo(status); const Icon = icons[info.icon];
  return <span className={`badge ${info.tone}`}><Icon aria-hidden="true" />{label ?? info.label}</span>;
}
export function Panel({ title, children, className = '', aside, tone = 'info', id }: { title: string; children: React.ReactNode; className?: string; aside?: React.ReactNode; tone?: string; id?: string }) {
  return <section id={id} className={`panel ${className}`}><div className="panel-heading"><h2><span className={`marker ${tone}`} aria-hidden="true" />{title}</h2>{aside}</div>{children}</section>;
}
