import { Be_Vietnam_Pro } from 'next/font/google';

import '@edu/ui/globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@edu/ui/components/sonner';

const fontSans = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const fontMono = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
