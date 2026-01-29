import { NextResponse } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function proxy(req: any) {
    const token = req.nextauth.token;
    const isNewUser = token?.isNewUser;
    const path = req.nextUrl.pathname;

    // If the user is new and not on the new-password page, redirect them
    if (isNewUser && !path.startsWith("/new-password") && path.startsWith("/dashboard")) {
        const url = req.nextUrl.clone();
        url.pathname = "/new-password";

        return NextResponse.redirect(url);
    }
}


export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"]
};
