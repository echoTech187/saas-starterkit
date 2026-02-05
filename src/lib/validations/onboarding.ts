import { z } from "zod";

export const onboardingSchema = z.object({
    fullName: z.string().min(1, "Nama lengkap wajib diisi"),
    role: z.string().min(1, "Role wajib dipilih"),
    projectName: z.string().min(1, "Nama project wajib diisi"),
    projectDomain: z.string()
        .min(3, "Domain minimal 3 karakter")
        .regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan strip (-) diperbolehkan"),
    teamEmails: z.array(z.string().email("Format email tidak valid")).optional().default([]),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;