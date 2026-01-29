import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isNewUser = token?.isNewUser;
        const path = req.nextUrl.pathname;

        // If the user is new and not on the new-password page, redirect them
        if (isNewUser && !path.startsWith("/new-password") && path.startsWith("/dashboard")) {
            const url = req.nextUrl.clone();
            url.pathname = "/new-password";

            return NextResponse.redirect(url);
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = { matcher: ["/dashboard/:path*"] }
