import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isNewUser = token?.isNewUser;
        const path = req.nextUrl.pathname;

        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (path === "/dashboard" && token?.accessToken !== null && !isNewUser) {
            return NextResponse.next();
        }
        if (isNewUser) {
            const url = req.nextUrl.clone();
            url.pathname = "/new-password";

            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = { matcher: ["/dashboard/:path*"] }
