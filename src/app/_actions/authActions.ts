/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { authUseCase } from "@/di/modules";
import { loginSchema } from "@/lib/validations/auth";
import { IUser } from "@/core/entities/IUser";
import { registerSchema } from "@/lib/validations/register";

export async function signinAction(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const validate = loginSchema.safeParse({ username, password });
    if (!validate.success) {
        const errors = validate.error.flatten().fieldErrors;
        return {
            success: false,
            message: errors.username ? errors.username[0] : errors.password ? errors.password[0] : "",
            errors: errors,
        };
    }


    try {
        const result = await authUseCase.execute(username, password);
        if (!result.success) {
            return {
                success: false,
                message: result.message,
                errors: result.errors,
            };
        } else {
            // const storeCookies = await cookies();
            // storeCookies.set("token", result?.token || "", {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            //     maxAge: 60 * 60 * 24, // 1 hari
            // });
            return {
                success: true,
                message: "Login berhasil!",
                description: "Selamat datang kembali " + result.username + ".",
            };
        }

    } catch {
        return {
            success: false,
            message: "Login gagal. Mohon cek kembali input Anda.",
            errors: { username: ["Login gagal. Mohon cek kembali input Anda."], password: ["Login gagal. Mohon cek kembali input Anda."] },
        };
    }

}
export async function registerAction(prevState: any, formData: FormData) {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    const validate = registerSchema.safeParse({ confirmPassword, email, password });
    if (!validate.success) {
        const errors = validate.error.flatten().fieldErrors;
        return {
            success: false,
            message: errors.email ? errors.email[0] : errors.password ? errors.password[0] : errors.confirmPassword ? errors.confirmPassword[0] : "",
            errors: errors,
        };
    }
    try {
        const result = await authUseCase.register(email, password, confirmPassword);
        if (!result.success) {
            return {
                success: false,
                message: result.message,
                errors: result.errors,
            };
        } else {
            return {
                success: true,
                message: "Login berhasil!",
                description: "Selamat datang kembali " + result.username + ".",
            };
        }

    } catch {
        return {
            success: false,
            message: "Login gagal. Mohon cek kembali input Anda.",
            errors: { username: ["Login gagal. Mohon cek kembali input Anda."], password: ["Login gagal. Mohon cek kembali input Anda."] },
        };
    }
}


export async function decodeToken(token: string): Promise<IUser> {
    const response = await authUseCase.executeUserProfile(token);
    return response;
}