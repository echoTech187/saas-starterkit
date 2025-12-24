import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, { message: "Email wajib diisi." }).email({ message: "Email yang anda masukan salah." }),
    password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export type LoginInput = z.infer<typeof loginSchema>;