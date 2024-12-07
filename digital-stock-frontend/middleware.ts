import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';

const secret = process.env.JWT_SECRET;

export async function middleware(req: NextRequest) {

  const token = req.cookies.get('authToken')?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('auth', 'true');
    return NextResponse.redirect(url);
  }

  try {
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }


    const claims = decodeJwt(token);

    const userRole = claims.role as string;

    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/admin') && userRole !== 'ROLE_ADMIN') {
      return NextResponse.redirect(new URL('/403', req.url));
    }

    if (pathname.startsWith('/user') && userRole !== 'ROLE_USER') {
      return NextResponse.redirect(new URL('/403', req.url));
    }

    return NextResponse.next();
  } catch (err) {

    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('auth', 'true');
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
};
