 
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { decrypt } from './lib/auth';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = req.cookies.get('session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    
    const payload = await decrypt(sessionCookie);
    if (!payload || !payload.userId) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Redirect authenticated users away from login page
  if (pathname === '/admin/login') {
    const sessionCookie = req.cookies.get('session')?.value;
    if (sessionCookie) {
      const payload = await decrypt(sessionCookie);
      if (payload && payload.userId) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }
  }

  // Let next-intl handle internationalized routes
  // The matcher below already skips /admin, but we also ensure it explicitly
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  // Match internationalized pathnames and admin routes
  matcher: ['/', '/(ar|en)/:path*', '/admin/:path*']
};
