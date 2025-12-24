import { ApiResponse } from "@/core/entities/IResponse";
import { IUser } from "@/core/entities/IUser";
import { AuthRepository } from "@/core/repositories/AuthRepository";

export class AuthUseCase {
    constructor(private authRepository: AuthRepository) { }
    async execute(username: string, password: string): Promise<ApiResponse> {
        const result = await this.authRepository.login(username, password);
        return result;
    }
    async register(email: string, password: string, confirmPassword: string): Promise<ApiResponse> {
        const result = await this.authRepository.register(email, password, confirmPassword);
        return result;
    }

    async checkUserByEmail(email: string): Promise<{ exists: boolean }> {
        return await this.authRepository.checkUserByEmail(email);
    }
    async executeUserProfile(token: string): Promise<IUser> {
        const result = await this.authRepository.profile(token);
        return result;
    }
}