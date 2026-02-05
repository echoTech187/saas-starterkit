import { ApiResponse } from "@/core/entities/IResponse";
import { WorkspaceRepository } from "@/core/repositories/WorkspaceRepository";
import { OnboardingData } from "@/lib/types/onboarding";

export class WorkspaceUseCase {
    constructor(private workspaceRepository: WorkspaceRepository) { }

    async create(data: OnboardingData, token: string): Promise<ApiResponse> {
        const result = await this.workspaceRepository.create(data, token);
        return result;
    }
}