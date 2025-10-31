// src/middleware.ts
// This file handles session management for admin routes.
import { defineMiddleware, sequence } from 'astro:middleware';

const ADMIN_SESSION_COOKIE = 'admin_session_id';
const ADMIN_SESSION_VALUE = 'authenticated'; // A simple token for static login

// Middleware to check if the user is authenticated for admin routes
const authMiddleware = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith('/admin')) {
    // Allow login and static assets to pass through
    if (context.url.pathname === '/admin/login' || context.url.pathname.startsWith('/_astro/')) {
      return next();
    }

    const session = context.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    if (session === ADMIN_SESSION_VALUE) {
      // User is authenticated
      return next();
    } else {
      // User is not authenticated, redirect to login
      return context.redirect('/admin/login');
    }
  }
  // For non-admin routes, just continue
  return next();
});

export const onRequest = sequence(authMiddleware);