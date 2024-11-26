import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Redirect unauthenticated users to the login page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Check if the user is logged in
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isAPIRequest = nextUrl.pathname.startsWith('/api/dashboard');

      console.log('isLoggedIn', isLoggedIn);
      console.log('nextUrl.pathname', nextUrl.pathname);

      // Handle API requests
      if (isAPIRequest) {
        return isLoggedIn; // Block unauthenticated users for API requests
      }

      // Handle dashboard pages
      if (isOnDashboard) {
        return isLoggedIn; // Redirect unauthenticated users to login page
      }

      // Redirect logged-in users accessing public pages to dashboard
      if (isLoggedIn && !isOnDashboard && !isAPIRequest) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Allow access to public pages for unauthenticated users
      return true;
    },
  },
  providers: [], // Add your authentication providers here
} satisfies NextAuthConfig;
