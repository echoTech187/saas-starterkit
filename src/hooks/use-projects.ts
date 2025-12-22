import { useState, useMemo } from "react";

// --- 1. Definisi Tipe Data ---
export interface Project {
  id: string;
  name: string;
  description: string;
  framework: string;
  
  // ✅ GANTI JADI STRING (Nama Icon di Lucide)
  iconName: string; 
  
  status: "Live" | "Building" | "Offline";
  statusColor: string;
  repo: string;
  branch: string;
  lastDeploy: string;
  url: string;
}

// --- 2. Data Dummy (Simulasi Database) ---
const allProjects: Project[] = [
  {
    id: "toko-online-v2",
    name: "Toko Online V2",
    description: "Next.js e-commerce platform with Stripe integration.",
    framework: "Next.js",
    iconName: "Globe", // <-- String: Nanti diload jadi <Globe />
    status: "Live",
    statusColor: "bg-emerald-500",
    repo: "shadcn/toko-online",
    branch: "main",
    lastDeploy: "2m ago",
    url: "https://tokoonline.com"
  },
  {
    id: "backend-api",
    name: "Backend API Production",
    description: "Express.js REST API serving mobile and web clients.",
    framework: "Node.js",
    iconName: "Server", // <-- String: Nanti diload jadi <Server />
    status: "Building",
    statusColor: "bg-amber-500",
    repo: "shadcn/backend-api",
    branch: "feat/auth-v2",
    lastDeploy: "Running...",
    url: "https://api.tokoonline.com"
  },
  {
    id: "worker-nodes",
    name: "Worker Nodes",
    description: "Redis worker for processing background jobs.",
    framework: "Docker",
    iconName: "Database", // <-- String
    status: "Offline",
    statusColor: "bg-zinc-500",
    repo: "shadcn/workers",
    branch: "main",
    lastDeploy: "5d ago",
    url: "-"
  },
  {
    id: "admin-dashboard",
    name: "Admin Dashboard Internal",
    description: "Internal tool for managing users and orders.",
    framework: "React",
    iconName: "Cpu", // <-- String
    status: "Live",
    statusColor: "bg-emerald-500",
    repo: "shadcn/admin-dash",
    branch: "develop",
    lastDeploy: "1h ago",
    url: "https://admin.tokoonline.com"
  },
];

// --- 3. Hook Logic (Tidak Berubah) ---
export function useProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.repo.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesTab = true;
      if (activeTab === "Production") {
          matchesTab = project.status === "Live";
      } else if (activeTab === "Development") {
          matchesTab = project.status === "Building" || project.status === "Offline";
      }

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredProjects,
  };
}