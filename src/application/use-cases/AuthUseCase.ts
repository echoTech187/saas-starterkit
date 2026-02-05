import { ApiResponse } from "@/core/entities/IResponse";
import { IUser, UserProps } from "@/core/entities/IUser";
import { AuthRepository } from "@/core/repositories/AuthRepository";
import { Workspace, WorkspaceListResult, WorkspaceRepository, WorkspaceResult } from "@/core/repositories/WorkspaceRepository";
import { User } from "next-auth";

export class AuthUseCase {
    constructor(
        private authRepository: AuthRepository,
        private workspaceRepository: WorkspaceRepository
    ) { }

    async execute(username: string, password: string): Promise<ApiResponse> {
        const result = await this.authRepository.login(username, password);
        return result;
    }

    async loginWithGoogle(account: User | IUser): Promise<ApiResponse> {
        const result = await this.authRepository.loginWithGoogle(account);
        return result;
    }

    async register(account: UserProps): Promise<ApiResponse> {
        const result = await this.authRepository.register(account);
        return result;
    }

    async registerWithGoogle(account: User): Promise<ApiResponse> {
        const result = await this.authRepository.registerWithGoogle(account);
        return result;
    }

    async checkUserByEmail(email: string): Promise<{ exists: boolean }> {
        return await this.authRepository.checkUserByEmail(email);
    }

    async executeUserProfile(token: string): Promise<IUser> {
        const result = await this.authRepository.profile(token);
        return result;
    }

    async sendEmailCodeVerification(email: string): Promise<ApiResponse> {
        const result = await this.authRepository.sendEmailCodeVerification(email);
        return result;
    }

    async registerCompleted(email: string, code: string): Promise<ApiResponse> {
        const result = await this.authRepository.registerCompleted(email, code);
        return result;
    }

    async logout(): Promise<void> {
        await this.authRepository.logout();
    }

    // Workspace methods
    async getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
        try {
            const result = await this.workspaceRepository.getWorkspaceBySlug(slug);
            return result;
        } catch {
            return null;
        }
    }

    async switchWorkspace(workspaceId: number): Promise<WorkspaceResult> {
        try {
            const result = await this.workspaceRepository.switchWorkspace(workspaceId);
            return result;
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Failed to switch workspace"
            };
        }
    }

    async getUserWorkspaces(): Promise<WorkspaceListResult> {
        try {
            const result = await this.workspaceRepository.getUserWorkspaces();
            return result;
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Failed to get workspaces"
            };
        }
    }
}