import { ApiResponse } from "@/core/entities/IResponse";
import { IUser, UserProps } from "@/core/entities/IUser";
import { AuthRepository } from "@/core/repositories/AuthRepository";
import { User } from "next-auth";

export class AuthUseCase {
    constructor(private authRepository: AuthRepository) { }
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




}