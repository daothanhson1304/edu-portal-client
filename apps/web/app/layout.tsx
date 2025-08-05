import { Manrope } from 'next/font/google';

import '@edu/ui/globals.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import Footer from '@/components/footer';
import TopBar from '@/components/top-bar';

const fontSans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Manrope({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <TopBar />
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
