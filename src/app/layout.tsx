import type { Metadata } from 'next';
import '@/app/globals.css';
import { SiteProviders } from '@/components/providers/SiteProviders';
export const metadata: Metadata = { title:'VEYRA — Fragrance, distilled.', description:'A cinematic fragrance house in progress.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteProviders>{children}</SiteProviders></body></html>; }
