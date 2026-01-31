/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/core/entities/IResponse";
import { IUser } from "@/core/entities/IUser";
import { AuthRepository } from "@/core/repositories/AuthRepository";
import { api } from "@/lib/api";


export class APIAuthRepository implements AuthRepository {
    async login(username: string, password: string): Promise<ApiResponse> {
        const response: ApiResponse = await api.post('/login', { username, password } as any);
        return response;
    }
    async loginWithGoogle(account: any): Promise<ApiResponse> {
        const response: ApiResponse = await api.post('/login-with-google', account);
        return response;
    }
    async register(account: any): Promise<ApiResponse> {
        const emailExists = await this.checkUserByEmail(account.email);
        if (emailExists.exists) {
            return {
                success: false,
                message: "Email sudah terdaftar.",
                errors: { email: ["Email sudah terdaftar."] },
            };
        }

        const response: ApiResponse = await api.post('/register', account);
        console.log(response);
        return response;
    }

    async registerWithGoogle(account: any): Promise<ApiResponse> {
        const response: ApiResponse = await api.post('/register-with-google', account);
        return response;
    }
    async logout(): Promise<void> {
        // Implementasi logout
        throw new Error("Method not implemented.");
    }

    async checkUserByEmail(email: string): Promise<{ exists: boolean }> {
        try {
            const data: ApiResponse = await api.get('/check-user-by-email?email=' + email);
            if (!data.success) {
                return { exists: false };
            } else {
                if (data.user?.user_status === 1) {
                    return { exists: false };
                }
                return { exists: true };
            }

        } catch (error) {
            console.error("Error checking user by email:", error);
        }
        // Default to exists: false in case of an error to prevent locking users out.
        // Or consider if throwing an error is more appropriate for your app.
        return { exists: false };
    }

    async profile(token: string): Promise<IUser> {
        const response: any = await api.get('/profile', {
            token: token,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.profile;
    }
    async sendEmailCodeVerification(email: string): Promise<ApiResponse> {
        const response: ApiResponse = await api.post('/send-email-code-verification', { email } as any);
        return response;
    }

    async registerCompleted(email: string, code: string): Promise<ApiResponse> {
        const payload = { code: code };
        const response: ApiResponse = await api.put('/register-completed/' + email, payload as any);
        return response;
    }

}