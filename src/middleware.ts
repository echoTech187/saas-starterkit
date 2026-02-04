import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isNewUser = token?.isNewUser;
        const path = req.nextUrl.pathname;

        // 1. Handle Login Route
        if (path === "/login") {
            // Jika user sudah login, jangan biarkan masuk ke halaman login lagi, lempar ke dashboard
            if (token && !isNewUser) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
            // Jika belum login, biarkan akses ke halaman login
            return NextResponse.next();
        }

        // 2. Handle New User
        if (isNewUser) {
            return NextResponse.redirect(new URL("/new-password", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Izinkan akses ke /login tanpa token agar middleware bisa berjalan
                if (req.nextUrl.pathname === "/login") {
                    return true;
                }
                // Untuk rute lain (dashboard), wajib ada token
                return !!token;
            },
        },
    }
)

export const config = { matcher: ["/dashboard/:path*", "/login"] }
