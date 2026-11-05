'use client';
import * as React from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
// Adaptasi ChartContainer shadcn/ui untuk satu seri bertoken, tanpa varian tak terpakai.
export function ChartContainer({ children, className, ...props }: React.ComponentProps<'div'> & { children: React.ComponentProps<typeof ResponsiveContainer>['children'] }) {
  return <div data-slot="chart" className={cn('chart-container', className)} {...props}><ResponsiveContainer initialDimension={{ width: 600, height: 280 }}>{children}</ResponsiveContainer></div>;
}
