"use client";

import { useEffect, useState } from "react";
import {
    Activity, Globe, GitBranch, Clock,
    Terminal, Shield, Key, Copy, RefreshCw,
    Trash2, ExternalLink, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProjects } from "@/hooks/use-projects";

export default function ProjectDetailPage({ params }: { params: { projectid: string } }) {
    const { handleProjectsId, projectId } = useProjects();
    useEffect(() => {
        async function getProjectsId() {
            await handleProjectsId(params);
        }
        getProjectsId();

    }, [handleProjectsId, params]);


    const project = {
        id: projectId,
        name: "Toko Online V2",
        framework: "Next.js",
        domain: "toko-online.app",
        gitRepo: "github.com/alex/toko-online",
        status: "Ready",
    };

    const [apiKey, setApiKey] = useState("sk_live_51Mz...");
    const [showKey, setShowKey] = useState(false);

    return (
        <div className="space-y-6">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                        <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10">
                            ● {project.status}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <a href={`https://${project.domain}`} target="_blank" className="flex items-center hover:text-white transition-colors">
                            <Globe className="w-3 h-3 mr-1.5" /> {project.domain}
                        </a>
                        <a href={`https://${project.gitRepo}`} target="_blank" className="flex items-center hover:text-white transition-colors">
                            <GitBranch className="w-3 h-3 mr-1.5" /> main
                        </a>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/10">
                        Visit Site <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                    <Button className="bg-white text-black hover:bg-zinc-200">
                        Redeploy
                    </Button>
                </div>
            </div>

            {/* --- TABS CONTROL ROOM --- */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-zinc-900 border border-white/10">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="deployments">Deployments</TabsTrigger>
                    <TabsTrigger value="configuration">Configuration</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* 1. OVERVIEW (Stats) */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400">Total Requests</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold text-white">1.2M</div><p className="text-xs text-emerald-400 mt-1">+12% from last month</p></CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400">Avg. Latency</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold text-white">124ms</div><p className="text-xs text-zinc-500 mt-1">P99 is 340ms</p></CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400">Bandwidth</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold text-white">45 GB</div><p className="text-xs text-zinc-500 mt-1">Global CDN usage</p></CardContent>
                        </Card>
                    </div>

                    {/* Grafik Placeholder */}
                    <Card className="bg-zinc-900/50 border-white/10 h-75 flex items-center justify-center">
                        <div className="text-center text-zinc-500">
                            <Activity className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p>Analytics Chart Component Here</p>
                        </div>
                    </Card>
                </TabsContent>

                {/* 2. DEPLOYMENTS (CI/CD Logs) */}
                <TabsContent value="deployments">
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Deployment History</CardTitle>
                            <CardDescription className="text-zinc-400">Daftar build terbaru dari git repository.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/10 hover:bg-transparent"><TableHead>Commit</TableHead><TableHead>Status</TableHead><TableHead>Environment</TableHead><TableHead>Time</TableHead><TableHead className="text-right"></TableHead></TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[1, 2, 3].map((i) => (
                                        <TableRow key={i} className="border-white/5 hover:bg-white/5">
                                            <TableCell className="text-white">
                                                <div className="font-medium">Update landing page</div>
                                                <div className="text-xs text-zinc-500 font-mono">git-a1b2c3d</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={i === 1 ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" : "text-zinc-400 border-zinc-500/20"}>
                                                    {i === 1 ? "Ready" : "Built"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-zinc-300">Production</TableCell>
                                            <TableCell className="text-zinc-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {i}h ago</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400"><MoreHorizontal className="w-4 h-4" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 3. CONFIGURATION (API Keys & Env Vars) */}
                <TabsContent value="configuration" className="space-y-6">
                    {/* API Key Card */}
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2"><Key className="w-5 h-5 text-amber-400" /> API Keys</CardTitle>
                            <CardDescription className="text-zinc-400">Gunakan key ini untuk mengakses API project dari luar.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Secret Key</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Input
                                            type={showKey ? "text" : "password"}
                                            value={apiKey}
                                            readOnly
                                            className="bg-black border-white/10 text-white font-mono pr-10"
                                        />
                                    </div>
                                    <Button variant="outline" onClick={() => setShowKey(!showKey)} className="border-white/10 text-zinc-300">{showKey ? "Hide" : "Show"}</Button>
                                    <Button variant="outline" className="border-white/10 text-zinc-300"><Copy className="w-4 h-4" /></Button>
                                </div>
                                <p className="text-xs text-zinc-500">Jangan pernah share secret key di client-side code.</p>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-white/5 border-t border-white/5 flex justify-between items-center py-3">
                            <span className="text-xs text-zinc-500">Last used: Just now</span>
                            <Button variant="destructive" size="sm" className="h-8 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50">
                                <RefreshCw className="w-3 h-3 mr-2" /> Roll Key
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Env Vars Card */}
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2"><Terminal className="w-5 h-5 text-blue-400" /> Environment Variables</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <Input placeholder="KEY" className="bg-black border-white/10 text-white font-mono flex-1" />
                                    <Input placeholder="VALUE" className="bg-black border-white/10 text-white font-mono flex-1" />
                                </div>
                                <Button variant="outline" className="w-full border-dashed border-white/20 text-zinc-400 hover:text-white hover:border-white/40">
                                    + Add Variable
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 4. SETTINGS (Delete, Domain) */}
                <TabsContent value="settings" className="space-y-6">
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">General Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-black/20">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-white">Maintenance Mode</Label>
                                    <p className="text-xs text-zinc-500">Tampilkan halaman maintenance untuk semua visitor.</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-cyan-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-950/10 border-red-900/30 border">
                        <CardHeader>
                            <CardTitle className="text-red-400 flex items-center gap-2"><Shield className="w-5 h-5" /> Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400 mb-4">Menghapus project akan menghapus semua database dan deployment terkait. Tindakan ini tidak dapat dibatalkan.</p>
                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Project
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}