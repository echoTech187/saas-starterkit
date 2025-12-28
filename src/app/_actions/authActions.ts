/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { authUseCase } from "@/di/modules";
import { loginSchema } from "@/lib/validations/auth";
import { IUser } from "@/core/entities/IUser";
import { registerSchema } from "@/lib/validations/register";
import { cookies } from "next/headers";

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
            return {
                success: true,
                message: "Login berhasil!",
                description: "Selamat datang kembali " + result.user?.username + ".",
            }

        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Login gagal. Mohon cek kembali input Anda.",
            errors: { username: ["Login gagal. Mohon cek kembali input Anda."], password: ["Login gagal. Mohon cek kembali input Anda."] },
        };
    }

}
export async function registerAction(prevState: any, formData: FormData) {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    const validate = registerSchema.safeParse({ email, password, confirmPassword });
    if (!validate.success) {
        const errors = validate.error.flatten().fieldErrors;
        return {
            success: false,
            message: errors.email ? errors.email[0] : errors.password ? errors.password[0] : errors.confirm_password ? errors.confirm_password[0] : "",
            errors: errors,
        };
    }
    try {
        const result = await authUseCase.checkUserByEmail(email);
        if (result.exists === true) {
            return {
                success: false,
                message: "Email sudah terdaftar. Silahkan login",
                errors: { email: ["Email sudah terdaftar. Silahkan login"] },
            };
        } else {

            const isSendEmailCodeVerification = await authUseCase.sendEmailCodeVerification(email);

            if (!isSendEmailCodeVerification.success) {
                return {
                    success: false,
                    message: "Pendaftaran gagal. Mohon cek kembali input Anda.",
                    errors: { email: ["Pendaftaran gagal. Mohon cek kembali input Anda."] },
                };
            } else {
                return {
                    success: true,
                    message: "Pendaftaran berhasil!",
                    description: "Selamat pendaftaran berhasil. Silahkan cek email Anda untuk melakukan verifikasi.",
                    user: { email },
                    provider: "credentials"
                };
            }

        }

    } catch {
        return {
            success: false,
            message: "Login gagal. Mohon cek kembali input Anda.",
            errors: { username: ["Login gagal. Mohon cek kembali input Anda."], password: ["Login gagal. Mohon cek kembali input Anda."] },
        };
    }
}

export async function resendCodeVerificationAction() {
    const cookieStore = await cookies();
    const session = cookieStore.get("codeVerification")?.value;
    const user = session ? JSON.parse(session) : null;
    if (!user) {
        return {
            success: false,
            message: "Verifikasi gagal. Mohon cek kembali input Anda.",
            errors: { code: ["Verifikasi gagal. Mohon cek kembali input Anda."] },
        };
    }
    try {
        const isSendEmailCodeVerification = await authUseCase.sendEmailCodeVerification(user.email);

        if (!isSendEmailCodeVerification.success) {
            return {
                success: false,
                message: "Gagal mengirim ulang kode verifikasi. Silahkan coba beberapa saat lagi.",
                errors: { email: ["Gagal mengirim ulang kode verifikasi. Silahkan coba beberapa saat lagi."] },
            };
        } else {
            return {
                success: true,
                message: "Pendaftaran berhasil!",
                description: "Selamat pendaftaran berhasil. Silahkan cek email Anda untuk melakukan verifikasi.",
                user: user,
                provider: "credentials"
            };
        }
    } catch {
        return {
            success: false,
            message: "Pendaftaran gagal. Mohon cek kembali input Anda.",
            errors: { email: ["Pendaftaran gagal. Mohon cek kembali input Anda."] },
        };
    }
}
export async function verificationAction(prevState: any, formData: FormData) {
    const code = formData.get("otp") as string;
    const cookieStore = await cookies();
    const session = cookieStore.get("codeVerification")?.value;
    const user = session ? JSON.parse(session) : null;

    if (!user) {
        return {
            success: false,
            message: "Verifikasi gagal. Mohon cek kembali input Anda 1.",
            errors: { code: ["Verifikasi gagal. Mohon cek kembali input Anda."] },
        };
    }

    try {
        if (user.code !== code) {
            return {
                success: false,
                message: "Verifikasi gagal. Mohon cek kembali input Anda 2.",
                errors: { code: ["Verifikasi gagal. Mohon cek kembali input Anda."] },
            };
        }
        // const account = {
        //     email: user.email,
        //     password: user.password,
        //     confirmPassword: user.confirmPassword,
        // }

        // const result = await authUseCase.register(account);
        // if (!result.success) {
        //     return {
        //         success: result.success,
        //         message: result.message,
        //         errors: { code: ["Verifikasi gagal. Mohon cek kembali input Anda."] },
        //     };
        // } else {
        //     cookieStore.delete("codeVerification");
        //     return {
        //         success: true,
        //         message: "Verifikasi berhasil!",
        //         description: "Selamat verifikasi berhasil. Silahkan login untuk melanjutkan.",
        //         user: result.user,
        //         provider: "credentials"
        //     };
        // }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Verifikasi gagal. Mohon cek kembali input Anda 3.",
            errors: { code: ["Verifikasi gagal. Mohon cek kembali input Anda."] },
        };
    }
}

export async function decodeToken(token: string): Promise<IUser> {
    const response = await authUseCase.executeUserProfile(token);
    return response;
}