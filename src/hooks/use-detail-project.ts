import { allProjects } from "@/features/data/projects";
import { Project } from "@/lib/types/projects";
import { useState, useMemo } from "react";

export function useDetailProjects(projectid: string, targetTabs: string | null) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState(targetTabs?.toString().toLowerCase() || "overview");

    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => {
            const matchesSearch = projectid === project.id ||
                project.name.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesTab = true;
            if (activeTab === "Production") {
                matchesTab = project.status === "Live";
            } else if (activeTab === "Development") {
                matchesTab = project.status === "Building" || project.status === "Offline";
            }

            return matchesSearch && matchesTab;
        });
    }, [projectid, activeTab, searchQuery]);

    const getProjectById = (id: string): Project | undefined => allProjects.find((project) => project.id === id);
    
    return {
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        filteredProjects,
        getProjectById
    };
}