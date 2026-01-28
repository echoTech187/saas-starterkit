import { NextRequest, NextResponse } from "next/server"

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (config.matcher.some((prefix) => pathname.startsWith(prefix))) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/activity/:path*",
        "/settings/:path*",
        "/projects/:path*",
        "/team/:path*",
        "/billing/:path*",
        "/notifications/:path*"
    ]
}
