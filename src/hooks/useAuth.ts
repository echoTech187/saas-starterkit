"use client";
import { loginSchema } from "@/lib/validations/auth";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { getToken, removeToken, setToken } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
    const router = useRouter();
    const [error, setError] = useState("");
    function authValidate(data: FieldValues) {

        const validate = loginSchema.safeParse(data);
        if (!validate.success) {
            const errors = validate.error.flatten().fieldErrors;
            setError(errors.username ? "Email harus diisi." : errors.password ? "Password harus diisi." : "");
        } else {
            setError("");
        }
        return validate.success;
    }

    async function onSubmit(data: FieldValues) {

        const isEmptyError = authValidate(data);
        if (!isEmptyError) {
            setError("Email/Password harus diisi. Mohon cek kembali input Anda.");
            return {
                success: false,
                message: 'Email/Password harus diisi. Mohon cek kembali input Anda.',
                errors: { username: ['Email/Password harus diisi. Mohon cek kembali input Anda.'], password: ['Email/Password harus diisi. Mohon cek kembali input Anda.'] }
            };
        } else {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!result.success) {
                setError(result.message);
                return result;
            } else {
                setError("");
                await setToken(result.token);
                toast.success("Login berhasil!", { description: "Selamat datang kembali " + result.username + " di Nusantara SaaS.", className: "bg-green-700/30 text-white", onAutoClose: () => router.push("/dashboard") });
                return result;
            }
        }
    }

    async function onLogout() {
        await removeToken();
        router.push("/login");
    }
    async function AuthProtected() {
        const token = await getToken();
        if (!token) {
            window.location.href = "/login";
        }
    }
    return {
        error,
        AuthProtected,
        authValidate,
        onSubmit,
        onLogout
    };
}

