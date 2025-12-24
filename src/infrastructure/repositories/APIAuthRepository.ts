import { ApiResponse } from "@/core/entities/IResponse";
import { IUser } from "@/core/entities/IUser";
import { AuthRepository } from "@/core/repositories/AuthRepository";

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
    async register(email: string, username?: string, password?: string, image?: string): Promise<ApiResponse> {
        const emailExists = await this.checkUserByEmail(email);
        if (emailExists.exists) {
            return {
                success: false,
                message: "Email sudah terdaftar.",
                errors: { email: ["Email sudah terdaftar."] },
            };
        }
        const postData = {
            email: email,
            fullname: username ?? null,
            password: password ?? null,
            image: image ?? null
        }
        const response = await fetch(process.env.BACKEND_PUBLIC_API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const result: ApiResponse = await response.json();
        return result;
    }
    async logout(): Promise<void> {
        // Implementasi logout
        throw new Error("Method not implemented.");
    }
    async forgotPassword(email: string): Promise<void> {
        // Implementasi forgotPassword
        throw new Error("Method not implemented.");
    }
    async resetPassword(token: string, newPassword: string): Promise<void> {
        // Implementasi resetPassword
        throw new Error("Method not implemented.");
    }
    async changePassword(oldPassword: string, newPassword: string): Promise<void> {
        // Implementasi changePassword
        throw new Error("Method not implemented.");
    }

    async checkUserByEmail(email: string): Promise<{ exists: boolean }> {
        try {
            const response = await fetch(process.env.BACKEND_PUBLIC_API_URL + '/check-user-by-email?email=' + email, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return { exists: data.exists === true };
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

}