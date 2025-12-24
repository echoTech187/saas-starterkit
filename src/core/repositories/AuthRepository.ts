import { ApiResponse } from "../entities/IResponse";
import { IUser } from "../entities/IUser";

export interface AuthRepository {
    login(username: string, password: string): Promise<ApiResponse>;
    register(username: string, email: string, password: string): Promise<ApiResponse>;
    logout(): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
    checkUserByEmail(email: string): Promise<{ exists: boolean }>;
    profile(token: string): Promise<IUser>;
}