import { Project } from "@/lib/types/projects";
const initialDeployments = [
    { id: "dpl_1", commit: "Feat: Add Icon Picker", commitId: "a1b2c3d", time: "2m ago", status: "Ready", user: "AG" },
    { id: "dpl_2", commit: "Fix: Zod Schema", commitId: "e5f6g7h", time: "1h ago", status: "Ready", user: "AG" },
    { id: "dpl_3", commit: "Chore: Update dependencies", commitId: "i8j9k0l", time: "5h ago", status: "Error", user: "System" },
    { id: "dpl_4", commit: "Init: Project Setup", commitId: "m1n2o3p", time: "1d ago", status: "Ready", user: "AG" },
];
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



export { initialDeployments, allProjects };