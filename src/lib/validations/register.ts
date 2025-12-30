import z from "zod";

export const registerSchema = z.object({
    email: z.email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Format email salah." }).min(1, { message: "Email wajib diisi." }),
    password: z.string().min(6, { message: "Password minimal 6 karakter." }),
    confirm_password: z.string().min(6, { message: "Password minimal 6 karakter." }),
}).refine((data) => data.password === data.confirm_password, { message: "Password tidak cocok.", path: ["confirm_password"] });

export type IRegister = z.infer<typeof registerSchema>;

