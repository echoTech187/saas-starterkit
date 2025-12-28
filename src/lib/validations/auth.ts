import { z } from "zod";

export const loginSchema = z.object({
    username: z.email({ message: "Email yang anda masukan salah.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Format email salah." }).min(1, { message: "Email wajib diisi." }),
    password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export type LoginInput = z.infer<typeof loginSchema>;