"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Globe, MoreVertical, Activity, Cpu, HardDrive,
    AlertCircle, CheckCircle2, ShieldAlert, GitBranch, Search,
    RotateCcw, FileText, Copy, Trash2, Save, Terminal
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
    Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle
} from "@/components/ui/sheet"; // Import Sheet untuk Logs

import { TeamSettings } from "@/components/settings/team-settings";
import { GithubIcon } from "@/components/ui/github-icon";
import { useDetailProjects } from "@/hooks/use-detail-project";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

// ... (Dummy Data sama seperti sebelumnya) ...
const projectData = {
    name: "Nusantara SaaS",
    id: "nusantara-saas",
    status: "Live",
    repo: "shadcn/ui",
    branch: "main",
    url: "https://nusantara-saas.com",
    lastDeploy: "2m ago",
    framework: "Next.js"
};

const initialDeployments = [
    { id: "dpl_1", commit: "Feat: Add Icon Picker", commitId: "a1b2c3d", time: "2m ago", status: "Ready", user: "AG" },
    { id: "dpl_2", commit: "Fix: Zod Schema", commitId: "e5f6g7h", time: "1h ago", status: "Ready", user: "AG" },
    { id: "dpl_3", commit: "Chore: Update dependencies", commitId: "i8j9k0l", time: "5h ago", status: "Error", user: "System" },
    { id: "dpl_4", commit: "Init: Project Setup", commitId: "m1n2o3p", time: "1d ago", status: "Ready", user: "AG" },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Live": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
        case "Building": return "bg-amber-500/15 text-amber-400 border-amber-500/20";
        case "Error": return "bg-red-500/15 text-red-400 border-red-500/20";
        default: return "bg-zinc-500/15 text-zinc-400 border-zinc-500/20";
    }
};

export default function ProjectDetailPage({ params }: { params: Promise<{ projectid: string }> }) {
    const { projectid } = React.use(params);
    const targetTabs = useSearchParams().get("tab");
    const { activeTab, setActiveTab } = useDetailProjects(projectid, targetTabs);

    const [searchQuery, setSearchQuery] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // STATES ACTION MODALS
    const [isDeleting, setIsDeleting] = useState(false);

    // State untuk Logs
    const [isLogsOpen, setIsLogsOpen] = useState(false);
    const [selectedLogId, setSelectedLogId] = useState("");

    // State untuk Rollback
    const [isRollbackAlertOpen, setIsRollbackAlertOpen] = useState(false);
    const [rollbackTarget, setRollbackTarget] = useState<{ id: string, commit: string } | null>(null);

    const filteredDeployments = initialDeployments.filter(d =>
        d.commit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.commitId.includes(searchQuery.toLowerCase())
    );


    const handleViewLogs = (commitId: string) => {
        setSelectedLogId(commitId);
        setIsLogsOpen(true);
    };

    const confirmRollback = (deploy: typeof initialDeployments[0]) => {
        setRollbackTarget({ id: deploy.commitId, commit: deploy.commit });
        setIsRollbackAlertOpen(true);
    };

    const handleRollbackAction = () => {
        setIsRollbackAlertOpen(false);
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: `Rolling back to ${rollbackTarget?.id}...`,
            success: 'Rollback successful! Deployment started.',
            error: 'Rollback failed',
        });
    };

    const handleSaveSettings = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Pengaturan project berhasil disimpan!");
        }, 1500);
    };

    const handleDeleteProject = () => {
        setIsDeleting(true);
        setTimeout(() => {
            setIsDeleting(false);
            toast.error("Project telah dihapus (Simulasi)");
        }, 2000);
    };
    // 4. Handler Copy Commit ID
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Commit ID ${text} disalin ke clipboard!`);
    };

    // 5. Handler Configure Git
    const handleConfigureGit = () => {
        toast.info("Mengarahkan ke GitHub App integration...");
        window.open('https://github.com/apps/nusantara-saas', '_blank');
    };
    return (
        <div className="space-y-6 pb-20">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                        <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                        <span>/</span>
                        <span className="text-white">{projectid}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-white tracking-tight">{projectData.name}</h1>
                        <Badge variant="outline" className={`${getStatusColor(projectData.status)} capitalize`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-current animate-pulse`} />
                            {projectData.status}
                        </Badge>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" asChild className="border-white/10 bg-black/40 text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer">
                        <a href={`https://github.com/${projectData.repo}`} target="_blank" rel="noreferrer">
                            <GithubIcon className="w-4 h-4 mr-2" />
                            <span className="font-mono text-xs">{projectData.repo}</span>
                        </a>
                    </Button>
                    <Button asChild className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)] cursor-pointer">
                        <a href={projectData.url} target="_blank" rel="noreferrer">
                            <Globe className="w-4 h-4 mr-2" />
                            Visit
                        </a>
                    </Button>
                </div>
            </div>

            {/* TABS */}
            <Tabs value={activeTab} className="space-y-6" onValueChange={setActiveTab}>
                <TabsList className="bg-black/40 border border-white/10 p-1 h-auto rounded-xl">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-950/50 data-[state=active]:text-cyan-400 py-2">Overview</TabsTrigger>
                    <TabsTrigger value="deployments" className="data-[state=active]:bg-cyan-950/50 data-[state=active]:text-cyan-400 py-2">Deployments</TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-cyan-950/50 data-[state=active]:text-cyan-400 py-2">Settings</TabsTrigger>
                </TabsList>

                {/* TAB OVERVIEW */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-md">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-500" /> CPU Usage</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold text-white">12%</div><div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden mt-2"><div className="h-full w-[12%] rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]" /></div></CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-md">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2"><HardDrive className="w-4 h-4 text-purple-500" /> Memory</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold text-white">512MB</div><div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden mt-2"><div className="h-full w-[45%] rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]" /> </div></CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-md">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2"><Activity className="w-4 h-4 text-amber-500" /> Requests (24h)</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold text-white">24.5k</div><div className="text-xs text-emerald-400 mt-2 flex items-center"><Activity className="w-3 h-3 mr-1" /> +12% from yesterday</div></CardContent>
                        </Card>
                    </div>
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <GitBranch className="w-5 h-5 text-zinc-400" /> Git Integration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-full">
                                        <GithubIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">shadcn/ui</div>
                                        <div className="text-xs text-zinc-500 font-mono">Connected to <span className="text-cyan-400">{projectData.branch}</span> branch</div>
                                    </div>
                                </div>
                                {/* BUTTON ACTION: CONFIGURE */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-zinc-400 hover:text-white hover:bg-white/10"
                                    onClick={handleConfigureGit}
                                >
                                    Configure
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB DEPLOYMENTS */}
                <TabsContent value="deployments">
                    <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div><CardTitle className="text-white">Recent Deployments</CardTitle><CardDescription className="text-zinc-400">Riwayat perubahan kode yang ditayangkan.</CardDescription></div>
                            <div className="relative w-64 hidden md:block">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input placeholder="Search commits..." className="pl-8 bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50 h-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredDeployments.map((deploy) => (
                                    <div key={deploy.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${deploy.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {deploy.status === 'Ready' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <div className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">{deploy.commit}</div>
                                                <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                                                    <span className="font-mono bg-white/5 px-1 rounded text-[10px]">{deploy.commitId}</span>
                                                    <span>•</span><span>{deploy.time}</span><span>•</span><span>by {deploy.user}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white h-8 w-8"><MoreVertical className="w-4 h-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-zinc-300">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                                {/* ACTION: Copy ID */}
                                                <DropdownMenuItem onClick={() => copyToClipboard(deploy.commitId)} className="cursor-pointer focus:text-white focus:bg-white/10">
                                                    <Copy className="mr-2 h-4 w-4" /> Copy Commit ID
                                                </DropdownMenuItem>

                                                {/* ACTION: View Logs */}
                                                <DropdownMenuItem onClick={() => handleViewLogs(deploy.commitId)} className="cursor-pointer focus:text-white focus:bg-white/10">
                                                    <FileText className="mr-2 h-4 w-4" /> View Logs
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator className="bg-white/10" />

                                                {/* ACTION: Rollback */}
                                                <DropdownMenuItem onClick={() => confirmRollback(deploy)} className="cursor-pointer text-amber-500 focus:text-amber-400 focus:bg-amber-500/10">
                                                    <RotateCcw className="mr-2 h-4 w-4" /> Rollback to this
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB SETTINGS */}
                <TabsContent value="settings" className="space-y-8">
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader><CardTitle className="text-white">General Configuration</CardTitle><CardDescription className="text-zinc-400">Pengaturan dasar nama dan domain project.</CardDescription></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-zinc-300">Project Name</label>
                                <div className="flex gap-2">
                                    <Input defaultValue={projectData.name} className="flex-1 bg-black/40 border border-white/10 text-white focus-visible:ring-cyan-500/50" />
                                    <Button variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/10" onClick={handleSaveSettings} disabled={isSaving}>
                                        {isSaving ? <Activity className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}{isSaving ? "Saving..." : "Save"}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <TeamSettings />

                    <Card className="bg-red-950/10 border-red-900/30">
                        <CardHeader><CardTitle className="text-red-400 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Danger Zone</CardTitle></CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="space-y-1"><div className="text-white font-medium">Delete Project</div><div className="text-xs text-zinc-500">Project yang dihapus tidak dapat dikembalikan.</div></div>
                            <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
                                <AlertDialogTrigger asChild><Button variant="destructive" className="bg-red-600/80 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]"><Trash2 className="w-4 h-4 mr-2" />Delete Project</Button></AlertDialogTrigger>
                                <AlertDialogContent className="bg-zinc-950 border-red-900/50 text-white">
                                    <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription className="text-zinc-400">Tindakan ini permanen.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-transparent border-white/10 hover:bg-white/10 text-white hover:text-white">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-700 text-white border-0">Yes, delete project</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* --- EXTRA COMPONENTS: LOGS SHEET & ROLLBACK ALERT --- */}

            {/* 1. BUILD LOGS SHEET */}
            <Sheet open={isLogsOpen} onOpenChange={setIsLogsOpen}>
                <SheetContent side="right" className="bg-zinc-950 border-l border-white/10 text-white w-full sm:w-160 sm:max-w-none">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="flex items-center gap-2"><Terminal className="w-5 h-5 text-cyan-500" /> Build Logs: {selectedLogId}</SheetTitle>
                        <SheetDescription className="text-zinc-400">Log lengkap dari proses build dan deployment.</SheetDescription>
                    </SheetHeader>
                    <div className="bg-black/50 border border-white/5 rounded-lg p-4 font-mono text-xs text-zinc-300 h-[80vh] overflow-y-auto">
                        <p className="text-emerald-400">$ git clone repository...</p>
                        <p className="text-zinc-500">[10:00:01] Cloning into &apos;project&apos...</p>
                        <p className="text-zinc-500">[10:00:05] Installing dependencies...</p>
                        <p className="text-blue-400">[10:00:15] Running build command...</p>
                        <p className="text-zinc-400">info  - Creating an optimized production build...</p>
                        <p className="text-zinc-400">info  - Compiled successfully</p>
                        <p className="text-zinc-400">info  - Collecting page data...</p>
                        <p className="text-zinc-400">info  - Generating static pages (5/5)</p>
                        <p className="text-emerald-400">[10:01:00] Build Completed Successfully.</p>
                        <p className="text-zinc-500">[10:01:02] Deploying to edge network...</p>
                        <p className="text-cyan-400">[10:01:05] Deployment Ready: https://nusantara-saas.com</p>
                    </div>
                </SheetContent>
            </Sheet>

            {/* 2. ROLLBACK CONFIRMATION ALERT */}
            <AlertDialog open={isRollbackAlertOpen} onOpenChange={setIsRollbackAlertOpen}>
                <AlertDialogContent className="bg-zinc-950 border-amber-900/50 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-amber-500">
                            <RotateCcw className="w-5 h-5" /> Confirm Rollback
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            Anda akan mengembalikan versi aplikasi ke commit <span className="text-white font-mono bg-white/10 px-1 rounded">{rollbackTarget?.id}</span> ({rollbackTarget?.commit}).
                            <br /><br />
                            Proses ini akan memicu deployment baru. Apakah Anda yakin?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-white/10 hover:bg-white/10 text-white hover:text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRollbackAction} className="bg-amber-600 hover:bg-amber-700 text-white border-0">
                            Yes, Rollback
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}