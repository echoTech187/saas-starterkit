import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { authUseCase } from '@/di/modules'

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const { pathname } = new URL(req.url)
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
  // Extract workspace slug from URL path
  const workspaceSlug = pathname.split('/')[1]

  // Validate workspace exists and user has access
  if (workspaceSlug) {
    const workspace = await authUseCase.getWorkspaceBySlug(workspaceSlug)
    if (!workspace) return NextResponse.redirect('/onboarding')
    if (!token?.activeWorkspaceId) {
      return NextResponse.redirect(`/workspace/${workspace.slug}/onboarding`)
    }
    if (workspace.id !== token?.activeWorkspaceId) {
      return NextResponse.redirect(`/workspace/${workspace.slug}/onboarding`)
    }
  }

  return NextResponse.next()
}
