// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';
import { userVerify } from './lib/session';

interface LogData {
    path: string;
    method: string;
    latency: number;
    status: number;
    userAgent?: string | null;
    projectId?: string | number | null;
}

// This function is not awaited, so it runs in the background
async function logToDatabase(data: LogData) {
    // Implement logging to an external service or database here
    // e.g., fetch('/api/log', { method: 'POST', body: JSON.stringify(data) });
}

export async function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Define auth and protected routes
    const authRoutes = ['/login', '/register', '/forgot-password', '/otp'];
    const protectedRoutes = ['/dashboard', '/onboarding', '/activity', '/billing', '/notifications', '/projects', '/settings', '/team'];

    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const user = token ? await userVerify(token) : null;
    // If user is logged in, redirect them from auth routes to the dashboard
    if (isAuthRoute && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If user is not logged in, redirect them from protected routes to the login page
    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const start = Date.now();
    const response = NextResponse.next();
    const duration = Date.now() - start;

    // Await this if you want logging to complete before the response is sent
    // Note: This will increase latency.
    logToDatabase({
        path: pathname,
        method: request.method,
        latency: duration,
        status: response.status,
        userAgent: request.headers.get('user-agent'),
        projectId: request.headers.get('x-project-id'), // Example: get project from header
    });

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};