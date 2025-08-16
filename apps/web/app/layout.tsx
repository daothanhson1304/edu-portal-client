import { Manrope } from 'next/font/google';

import '@edu/ui/globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@edu/ui/components/sonner';

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
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
