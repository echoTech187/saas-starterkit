"use server"

import { authUseCase, workspaceUseCase } from "@/di/modules"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { OnboardingData } from "@/lib/types/onboarding"

export async function switchWorkspace(workspaceId: number) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        throw new Error("User not authenticated")
    }

    const result = await authUseCase.switchWorkspace(workspaceId)

    if (result.success) {
        return {
            success: true,
            workspace: result.workspace,
            message: "Workspace switched successfully"
        }
    } else {
        throw new Error(result.message || "Failed to switch workspace")
    }
}

export async function getUserWorkspaces() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        throw new Error("User not authenticated")
    }

    const result = await authUseCase.getUserWorkspaces()

    if (result.success) {
        return {
            success: true,
            workspaces: result.workspaces
        }
    } else {
        throw new Error(result.message || "Failed to get workspaces")
    }
}

export async function createWorkspaceAction(data: OnboardingData) {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
        throw new Error("Unauthorized")
    }

    const result = await workspaceUseCase.create(data, session.accessToken)
    return result
}