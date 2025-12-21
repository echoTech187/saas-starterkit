"use client";

import { useState } from "react";

// Tipe Data
export type Project = {
    id: number;
    name: string;
    domain: string;
    status: "Active" | "Maintenance" | "Archived";
    framework: string;
    updatedAt: string;
};

const initialProjects: Project[] = [
    { id: 1, name: "Toko Online V2", domain: "toko.com", status: "Active", framework: "Next.js", updatedAt: "2h ago" },
    { id: 2, name: "Dashboard Admin", domain: "admin.toko.com", status: "Maintenance", framework: "React", updatedAt: "1d ago" },
    { id: 3, name: "Landing Page Event", domain: "event.id", status: "Archived", framework: "Astro", updatedAt: "1w ago" },
];

export function useProjects() {
    // --- STATE DATA ---
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [searchTerm, setSearchTerm] = useState("");

    // --- STATE UI (Modal & Form) ---
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({ name: "", domain: "" });

    // --- ACTIONS (LOGIC) ---

    // 1. Prepare Create
    const openCreateModal = () => {
        setFormData({ name: "", domain: "" });
        setIsCreateOpen(true);
    };

    // 2. Submit Create
    const handleCreateSubmit = () => {
        const newProject: Project = {
            id: Date.now(),
            name: formData.name || "Untitled Project",
            domain: formData.domain || "pending.domain",
            status: "Active",
            framework: "Next.js",
            updatedAt: "Just now",
        };
        setProjects([newProject, ...projects]);
        setIsCreateOpen(false);
    };

    // 3. Prepare Edit
    const openEditModal = (project: Project) => {
        setSelectedProject(project);
        setFormData({ name: project.name, domain: project.domain });
        setIsEditOpen(true);
    };

    // 4. Submit Update
    const handleUpdateSubmit = () => {
        if (!selectedProject) return;
        setProjects(projects.map(p =>
            p.id === selectedProject.id
                ? { ...p, name: formData.name, domain: formData.domain, updatedAt: "Just now" }
                : p
        ));
        setIsEditOpen(false);
        setSelectedProject(null);
    };

    // 5. Delete
    const handleDelete = (id: number) => {
        if (confirm("Yakin ingin menghapus project ini?")) {
            setProjects(projects.filter((p) => p.id !== id));
        }
    };

    // Filter Logic
    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [projectId, setProjectsId] = useState("");

    const handleProjectsId = async (params: { projectid: string }) => {
        const id = await params.projectid;
        setProjectsId(id);
    }

    return {
        // Data Values
        projects: filteredProjects,
        searchTerm,
        isCreateOpen,
        isEditOpen,
        formData,
        projectId,
        // State Setters (for Inputs/Dialog binding)
        setSearchTerm,
        setIsCreateOpen,
        setIsEditOpen,
        setFormData,

        // Actions Handlers
        openCreateModal,
        handleCreateSubmit,
        openEditModal,
        handleUpdateSubmit,
        handleDelete,
        handleProjectsId
    };
}