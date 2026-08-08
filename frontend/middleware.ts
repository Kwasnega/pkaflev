import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { getAdminSessionSecret, SESSION_COOKIE_NAME, verifyAdminSessionValue } from '@/lib/admin-session';

async function hasValidAdminSession(request: NextRequest) {
  const secret = getAdminSessionSecret();
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!session) return false;

  return verifyAdminSessionValue(session, secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    // Get client IP (fallback to 'unknown' if not available)
    const ip = (request as any).ip || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const identifier = `api:${ip}`;

    // Check rate limit: 60 requests per minute
    const result = checkRateLimit(identifier, 60, 60 * 1000);

    if (!result.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: getRateLimitHeaders(result),
        }
      );
    }

    // Continue with request and add rate limit headers
    const response = NextResponse.next();
    const headers = getRateLimitHeaders(result);
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // Protect Admin Routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!(await hasValidAdminSession(request))) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
