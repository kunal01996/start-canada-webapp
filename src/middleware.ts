import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!_next/static|_next/image|.*\\.png$|api/(?!dashboard)).*)', // Exclude /api routes except /api/dashboard
    '/api/dashboard/:path*' // Explicitly include /api/dashboard/* routes
  ],
};