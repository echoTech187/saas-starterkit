import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { authUseCase } from '@/di/modules'

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const { pathname } = new URL(req.url)

  // Extract workspace slug from URL path
  const workspaceSlug = pathname.split('/')[1]

  // Validate workspace exists and user has access
  if (workspaceSlug) {
    const workspace = await authUseCase.getWorkspaceBySlug(workspaceSlug)
    if (!workspace) return NextResponse.redirect('/404')
    if (!token?.activeWorkspaceId) {
      return NextResponse.redirect(`/workspace/${workspace.slug}/onboarding`)
    }
    if (workspace.id !== token?.activeWorkspaceId) {
      return NextResponse.redirect(`/workspace/${workspace.slug}/onboarding`)
    }
  }

  return NextResponse.next()
}
