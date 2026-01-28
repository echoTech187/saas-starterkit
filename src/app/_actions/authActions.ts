"use server";
import { authUseCase } from "@/di/modules";
import { loginSchema } from "@/lib/validations/auth";
import { IUser } from "@/core/entities/IUser";

export async function signinAction(prevState: unknown, formData: FormData) {
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

    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                message: "❌ [LOGIN ERROR]",
                description: error.message,
                errors: error.message
            }
        } else {
            return {
                success: false,
                message: error || "Login gagal. Mohon cek kembali input Anda.",
                errors: { username: ["Login gagal. Mohon cek kembali input Anda."], password: ["Login gagal. Mohon cek kembali input Anda."] },
            }
        }
    }

}
export async function registerAction(prevState: unknown, formData: FormData) {

    try {
        const result = await authUseCase.register({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirm_password") as string,
        });
        if (result.success) {
            return {
                success: true,
                message: "Pendaftaran berhasil!",
                description: "Selamat pendaftaran berhasil. Silahkan cek email Anda untuk melakukan verifikasi.",
                provider: "credentials"
            };
        } else {
            return {
                success: false,
                message: result.message,
                errors: result.errors,
            };
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                message: "❌ [LOGIN ERROR]",
                description: error.message,
                errors: error.message
            }
        } else {
            return {
                success: false,
                message: "❌ [LOGIN ERROR]",
                description: error || "Terjadi kesalahan pada server. Silahkan coba lagi.",
                errors: { username: ["Login gagal. Mohon cek kembali input Anda."], password: ["Login gagal. Mohon cek kembali input Anda."] },
            }
        }
    }
}

export async function resendCodeVerificationAction(email: string) {
    try {
        const isSendEmailCodeVerification = await authUseCase.sendEmailCodeVerification(email);

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
export async function verificationAction(prevState: unknown, formData: FormData) {
    const code = formData.get("otp") as string;
    const email = formData.get("email") as string;
    if (!email || !code) {
        return {
            success: false,
            message: "Verifikasi gagal. Mohon cek kembali input Anda 1.",
            errors: { code: ["Verifikasi gagal. Mohon cek kembali input Anda."] },
        };
    }

    try {
        const result = await authUseCase.registerCompleted(email, code);
        if (!result.success) {
            return {
                success: false,
                message: "Verifikasi gagal. Mohon cek kembali input Anda 2.",
                errors: { code: ["Verifikasi gagal. Mohon cek kembali input Anda."] },
            };
        } else {
            return {
                success: true,
                message: "Verifikasi berhasil!",
                description: "Selamat verifikasi berhasil. Silahkan login untuk melanjutkan.",
                provider: "credentials"
            };
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                message: "❌ [LOGIN ERROR]",
                description: error.message,
                errors: error.message
            }
        } else {
            return {
                success: false,
                message: "❌ [LOGIN ERROR]",
                description: error || "Verifikasi gagal. Mohon cek kembali input Anda.",
                errors: { code: ["Verifikasi gagal. Mohon cek kembali input Anda."] },
            }
        }
    }
}

export async function decodeToken(token: string): Promise<IUser> {
    const response = await authUseCase.executeUserProfile(token);
    return response;
}