/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/core/entities/IResponse";
import { IUser } from "@/core/entities/IUser";
import { AuthRepository } from "@/core/repositories/AuthRepository";

export class AuthUseCase {
    constructor(private authRepository: AuthRepository) { }
    async execute(username: string, password: string): Promise<ApiResponse> {
        const result = await this.authRepository.login(username, password);
        return result;
    }

    async loginWithGoogle(account: any): Promise<ApiResponse> {
        const result = await this.authRepository.loginWithGoogle(account);
        return result;
    }
    async register(account: any): Promise<ApiResponse> {
        const result = await this.authRepository.register(account);
        return result;
    }

    async checkUserByEmail(email: string): Promise<{ exists: boolean }> {
        return await this.authRepository.checkUserByEmail(email);
    }
    async executeUserProfile(token: string): Promise<IUser> {
        const result = await this.authRepository.profile(token);
        return result;
    }

    async sendEmailCodeVerification(email: string, code: string): Promise<ApiResponse> {
        const result = await this.authRepository.sendEmailCodeVerification(email, code);
        return result;
    }


}