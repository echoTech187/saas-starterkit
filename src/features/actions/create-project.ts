"use server";

import { createProjectSchema } from "@/lib/validations/project";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type ActionState = {
    message?: string;
    errors?: Record<string, string[]>;
    status?: "idle" | "success" | "error";
};

export async function createProjectAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // 1. Mapping FormData ke Structure JSON Anda
    const rawData = {
        id: formData.get("id"), // Ini adalah 'slug' di UI
        name: formData.get("name"),
        description: formData.get("description"),
        framework: formData.get("framework"),
        iconName: formData.get("iconName"), // <-- Sesuai JSON
        repo: formData.get("repo"),         // <-- Sesuai JSON
        branch: formData.get("branch") || "main",
    };

    // 2. Validasi
    const validated = createProjectSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            status: "error",
            errors: validated.error.flatten().fieldErrors,
            message: "Validasi gagal. Mohon cek input Anda.",
        };
    }

    // 3. Construct Final JSON Object (Sesuai Request)
    const finalProjectData = {
        ...validated.data,
        status: "Building", // Default status awal
        statusColor: "bg-amber-500", // Warna untuk status Building/Amber
        lastDeploy: "Just now",
        url: "-",
    };

    try {
        // Simulasi Save ke DB
        console.log("Saving Project JSON:", JSON.stringify(finalProjectData, null, 2));
        await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
        return {
            status: "error",
            message: "Gagal menyimpan data ke server.",
            errors: error instanceof Error ? { message: [error.message] } : undefined,
        };
    }

    revalidatePath("/projects");
    redirect("/projects");
}

