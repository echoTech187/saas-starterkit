/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useState } from "react";
import { createProjectAction } from "@/features/actions/project";
import { ActionState } from "@/lib/types/action-states";

export function useCreateProject() {
    const initialState: ActionState = { status: "idle", message: "" };
    const [state, action, isPending] = useActionState(createProjectAction, initialState);

    // State Lokal untuk Interaktivitas UI
    const [name, setName] = useState("");
    const [id, setId] = useState(""); // Dulu 'slug', sekarang 'id' sesuai JSON
    const [iconName, setIconName] = useState("LayoutDashboard"); // Dulu 'icon'
    const [repo, setRepo] = useState(""); // Dulu 'gitRepo'
    const [branch, setBranch] = useState("main");
    const [description, setDescription] = useState("");

    // Logic Auto-generate ID (Slug) dari Name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);

        // Auto-generate id jika belum diedit manual
        const currentIdCheck = val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        // Logic sederhana: kalau id kosong atau mirip nama sebelumnya, update
        if (!id || id === name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")) {
            setId(currentIdCheck);
        }
    };

    return {
        form: { name, id, iconName, repo, branch, description },
        setters: {
            setName: handleNameChange,
            setId: (e: any) => setId(e.target.value),
            setIconName,
            setRepo: (e: any) => setRepo(e.target.value),
            setBranch: (e: any) => setBranch(e.target.value),
            setDescription: (e: any) => setDescription(e.target.value),
        },
        action,
        state,
        isPending,
    };
}