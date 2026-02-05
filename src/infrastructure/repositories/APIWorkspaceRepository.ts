/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/core/entities/IResponse";
import { Workspace, WorkspaceListResult, WorkspaceRepository, WorkspaceResult } from "@/core/repositories/WorkspaceRepository";
import { api } from "@/lib/api";
import { OnboardingData } from "@/lib/types/onboarding";

export class APIWorkspaceRepository implements WorkspaceRepository {
    async getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
        try {
            const response = await api.get<any>(`/workspaces/${slug}`);
            return response.data;
        } catch {
            return null;
        }
    }

    async switchWorkspace(workspaceId: number): Promise<WorkspaceResult> {
        try {
            const response = await api.post<any>(`/workspaces/${workspaceId}/switch`, null);
            return {
                success: true,
                workspace: response.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    async getUserWorkspaces(): Promise<WorkspaceListResult> {
        try {
            const response = await api.get<any>('/workspaces');
            return {
                success: true,
                workspaces: response.data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async create(data: OnboardingData, token: string): Promise<ApiResponse> {

        // Mapping data form ke payload yang diharapkan Backend API
        // Sesuaikan field ini dengan dokumentasi API backend Anda
        const payload = {
            name: data.projectName,
            slug: data.projectDomain,
            owner_name: data.fullName,
            owner_role: data.role,
            team_invites: data.teamEmails
        };

        // POST ke endpoint backend (misal: /workspaces)
        const response: ApiResponse = await api.post('/workspaces', payload as any, {
            token: token // Sertakan token JWT untuk otentikasi
        });

        return response;
    }
}