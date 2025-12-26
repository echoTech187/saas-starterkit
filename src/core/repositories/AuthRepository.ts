/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "../entities/IResponse";
import { IUser } from "../entities/IUser";

export interface AuthRepository {
    login(username: string, password: string): Promise<ApiResponse>;
    loginWithGoogle(account: any): Promise<ApiResponse>;
    register(account: any): Promise<ApiResponse>;
    logout(): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
    checkUserByEmail(email: string): Promise<{ exists: boolean }>;
    profile(token: string): Promise<IUser>;
    sendEmailCodeVerification(email: string, code: string): Promise<ApiResponse>;

}