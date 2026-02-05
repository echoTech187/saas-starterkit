"use server";

import { authUseCase } from "@/di/modules";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type Role = "OWNER" | "ADMIN" | "MEMBER";

export interface PermissionCheck {
  requiredRole: Role;
  actualRole?: Role;
}

/**
 * Check if user has required role for a workspace
 */
export async function checkPermission(
  workspaceId: number,
  requiredRole: Role
): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return false;

  const workspaces = await authUseCase.getUserWorkspaces();
  if (!workspaces.success) return false;

  const workspace = workspaces.workspaces?.find(w => w.id === workspaceId);
  if (!workspace) return false;

  const userRole = workspace.role as Role;
  return userRole === requiredRole;
}

/**
 * Check if user is owner of workspace
 */
export async function isOwner(workspaceId: number): Promise<boolean> {
  return (await checkPermission(workspaceId, "OWNER"));
}

/**
 * Check if user is admin of workspace
 */
export async function isAdmin(workspaceId: number): Promise<boolean> {
  return (await checkPermission(workspaceId, "ADMIN"));
}

/**
 * Check if user is member of workspace
 */
export async function isMember(workspaceId: number): Promise<boolean> {
  return (await checkPermission(workspaceId, "MEMBER"));
}