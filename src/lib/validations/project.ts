import { z } from "zod";

export const createProjectSchema = z.object({
    // 'id' akan digenerate dari sini (slug)
    id: z.string().min(3).regex(/^[a-z0-9-]+$/, {
        message: "ID (Slug) hanya boleh huruf kecil, angka, dan strip."
    }),
    name: z.string().min(3, { message: "Nama project minimal 3 karakter." }),
    description: z.string().optional(),
    framework: z.string().min(1, { message: "Pilih framework terlebih dahulu." }),

    // Field sesuai JSON Anda:
    iconName: z.string().default("Box"),
    repo: z.string().min(3, { message: "Repository wajib diisi." }),
    branch: z.string().default("main"),
});

// Tipe data TypeScript untuk dipakai di UI
export type CreateProjectInput = z.infer<typeof createProjectSchema>;