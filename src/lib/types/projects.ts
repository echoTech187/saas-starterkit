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
