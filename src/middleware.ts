import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  
  const protectedPaths = ['/home', '/profile'];

  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/profile/:path*'],
};
