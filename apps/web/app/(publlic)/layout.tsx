import type { ReactNode } from 'react';
import TopBar from '@/components/top-bar';
import Header from '@/components/header/header';
import Footer from '@/components/footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <TopBar />
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
