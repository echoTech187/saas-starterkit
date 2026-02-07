import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req })
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
    if (path !== "/new-password") {
      return NextResponse.redirect(new URL("/new-password", req.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next()
}
