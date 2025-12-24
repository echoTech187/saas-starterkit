import z from "zod";

export const registerSchema = z.object({
    email: z.string().min(1, { message: "Email wajib diisi." }).email({ message: "Email yang anda masukan salah." }),
    password: z.string().min(6, { message: "Password minimal 6 karakter." }),
    confirmPassword: z.string().min(6, { message: "Password minimal 6 karakter." }),
}).refine((data) => data.password === data.confirmPassword, { message: "Password tidak cocok.", path: ["confirmPassword"] });