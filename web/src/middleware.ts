// Placeholder - Add your middleware code here

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware สำหรับ Next.js
 * 
 * หน้าที่:
 * - ตรวจสอบ authentication สำหรับ protected routes
 * - รองรับทั้ง cookie-based auth (web) และ Bearer token (mobile)
 * 
 * Private routes (ต้อง login):
 * - `/auth/*` - Authentication protected pages
 * - `/api/auth/*` - Authentication protected API endpoints
 * 
 * Public routes (ไม่ต้อง login):
 * - Routes อื่นๆ ทั้งหมด เช่น `/`, `/login`, `/register`, `/dashboard`, `/examples/*` ฯลฯ
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ตรวจสอบว่าเป็น private route หรือไม่
  const isAuthRoute = pathname.startsWith('/auth/');
  const isAuthApiRoute = pathname.startsWith('/api/auth/');

  // ถ้าไม่ใช่ private route ให้ผ่านได้เลย
  if (!isAuthRoute && !isAuthApiRoute) {
    return NextResponse.next();
  }

  // ตรวจสอบ authentication สำหรับ private routes
  const authToken = 
    request.cookies.get('auth_token')?.value || 
    request.headers.get('authorization')?.replace('Bearer ', '');

  // ถ้าไม่มี token
  if (!authToken) {
    // ถ้าเป็น API route ให้คืน 401
    if (isAuthApiRoute) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // ถ้าเป็น page route ให้ redirect ไป login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // TODO: ตรวจสอบ JWT token validity
  // const isValid = verifyToken(authToken);
  // if (!isValid) {
  //   if (isAuthApiRoute) {
  //     return NextResponse.json(
  //       { error: 'Invalid or expired token' },
  //       { status: 401 }
  //     );
  //   }
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

// กำหนด routes ที่ middleware จะทำงาน
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
