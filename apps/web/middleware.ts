import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE = 'session';
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(
  req: Request & { nextUrl: URL; cookies: any }
) {
  const url = (req as any).nextUrl as URL;

  if (!url.pathname.startsWith('/admin')) return NextResponse.next();

  const token = (req as any).cookies.get(COOKIE)?.value;
  if (!token) {
    const to = new URL('/login', url);
    to.searchParams.set('next', url.pathname + url.search);
    return NextResponse.redirect(to);
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    const to = new URL('/login', url);
    to.searchParams.set('next', url.pathname + url.search);
    return NextResponse.redirect(to);
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
