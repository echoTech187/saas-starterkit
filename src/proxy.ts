import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface LogData {
    path: string;
    method: string;
    latency: number;
    status: number;
    userAgent?: string | null;
    projectId?: string | number | null;
}

// This function is not awaited, so it runs in the background
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function logToDatabase(_data: LogData) {
    // Implement logging to an external service or database here
    // e.g., fetch('/api/log', { method: 'POST', body: JSON.stringify(data) });
}

export async function proxy(req: NextRequest) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const response = NextResponse.next();

    // Jika user memiliki session (login) & memiliki accessToken
    if (session?.accessToken) {
        // Set cookie 'token' agar bisa dibaca oleh backend/aplikasi
        response.cookies.set("token", session.accessToken as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
    }

    // Opsional: Redirect user yang sudah login dari /login ke /dashboard
    if (req.nextUrl.pathname.startsWith("/login") && session) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/dashboard/:path*', '/api/:path*', '/login'],
};