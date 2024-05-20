import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    req.nextauth.token;
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 'ADMIN' || token?.role === 'SUPER_ADMIN',
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/users/:path*',
  ],
};