import { NextResponse, type NextRequest } from 'next/server';
import { verifyTokenServer } from '@/lib/utils/auth.utils';

// This middleware file acts as a gatekeeper for the application.
// It runs before a request is completed, allowing to redirect or rewrite requests based on authentication status.

export async function middleware(request: NextRequest) {
  // Get the token cookie from the request
  const token = request.cookies.get('token')?.value;

  // Get the path the user is trying to access
  const { pathname } = request.nextUrl;

  // These are public paths that ANYONE can visit (accessible without a token)
  const publicPaths = ['/', '/login', '/signup'];

  // Check if the current path is a public path
  // We check for exact matches for all public paths.
  const isPublicPath = publicPaths.includes(pathname);

  // Try to verify the token
  let payload = null;
  if (token) {
    payload = await verifyTokenServer(token);
  }

  // --- REDIRECTION LOGIC ---
  // Scenario 1: User is logged in (has a valid token)
  if (payload) {
    // If a logged-in user tries to access /login or /signup,
    // redirect them to a protected page, like the dashboard.
    if (pathname === '/login' || pathname === '/signup') {
      const dashboardUrl = new URL('/home', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Scenario 2: User is not logged in (no token or invalid token)
  if (!payload) {
    // If a logged-out user tries to access a protected page  (any page that is NOT public), redirect them to the login page.
    if (!isPublicPath && pathname !== '/home') {
      // Also redirect from /home if not logged in
      const loginUrl = new URL('/login', request.url);
      //'redirect_url' query param to send them back to the page they wanted after they log in.
      loginUrl.searchParams.set('redirect_url', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Scenario 3: User is accessing a public path (logged in or not)
  // or a logged-in user is accessing a protected path.
  // In either case, just let them proceed.
  return NextResponse.next();
}

/**
 * The 'matcher' configures which paths the middleware will run on.
 * This is more efficient than running it on every single request.
 * We want it to run on all paths EXCEPT for static assets (_next/static),
 * images (_next/image), and other metadata files.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (this is handled in the logic above, but good to be explicit)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
