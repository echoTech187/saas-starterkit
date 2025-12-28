/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/core/entities/IResponse";
import { IUser } from "@/core/entities/IUser";
import { AuthRepository } from "@/core/repositories/AuthRepository";
import { api } from "@/lib/api";


export class APIAuthRepository implements AuthRepository {
    async login(username: string, password: string): Promise<ApiResponse> {
        const response = await fetch(process.env.BACKEND_PUBLIC_API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const result: ApiResponse = await response.json();
        return result;
    }
    async loginWithGoogle(account: any): Promise<ApiResponse> {
        const response = await fetch(process.env.BACKEND_PUBLIC_API_URL + '/login-with-google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        const result: ApiResponse = await response.json();
        return result;
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
        const response = await fetch(process.env.BACKEND_PUBLIC_API_URL + '/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result.profile;
    }
    async sendEmailCodeVerification(email: string): Promise<ApiResponse> {
        const response = await fetch(process.env.BACKEND_PUBLIC_API_URL + '/send-email-code-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        return result;
    }

    async registerCompleted(id: string): Promise<ApiResponse> {
        const payload = { user_status: 2, updatedAt: new Date() };
        const response: ApiResponse = await api.put('/register-completed/' + id, JSON.stringify(payload));
        return response;
    }

}