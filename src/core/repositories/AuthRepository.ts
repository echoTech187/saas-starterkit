
import { User } from "next-auth";
import { ApiResponse } from "../entities/IResponse";
import { IUser, UserProps } from "../entities/IUser";

export interface AuthRepository {
    login(username: string, password: string): Promise<ApiResponse>;
    loginWithGoogle(account: User | IUser): Promise<ApiResponse>;
    register(account: UserProps): Promise<ApiResponse>;
    registerWithGoogle(account: User): Promise<ApiResponse>;
    registerCompleted(email: string, code: string): Promise<ApiResponse>;
    logout(): Promise<void>;
    checkUserByEmail(email: string): Promise<{ exists: boolean }>;
    profile(token: string): Promise<IUser>;
    sendEmailCodeVerification(email: string): Promise<ApiResponse>;

}