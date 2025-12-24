"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search, Plus, MoreVertical,
    ExternalLink, GitBranch, Clock,
    Trash2, Settings, Eye
} from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { GithubIcon } from "@/components/ui/github-icon";
import DynamicProjectIcon from "@/lib/utils/dynamic-procted-icon";


export default function ProjectsPage() {
    const {
        searchQuery, setSearchQuery,
        activeTab, setActiveTab,
        filteredProjects
    } = useProjects();

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    <p className="text-zinc-400 mt-1">Manage and monitor your deployments.</p>
                </div>
                <Link href="/projects/new">
                    <Button className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold shadow-[0_0_15px_-3px_rgba(6,182,212,0.5)] border border-transparent hover:border-cyan-300">
                        <Plus className="h-4 w-4 mr-2" /> Create Project
                    </Button>
                </Link>
            </div>

            {/* TOOLBAR */}
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-zinc-900/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search projects..."
                        className="pl-9 bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-500/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* --- FIX 2: TABS STYLING (Active State Hover Fix) --- */}
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
                    {["All", "Production", "Development"].map((tab) => {
                        // Tentukan warna berdasarkan tab
                        const colorClass = tab === 'Production' ? 'emerald' : tab === 'Development' ? 'amber' : 'cyan';
                        const isActive = activeTab === tab;

                        return (
                            <Button
                                key={tab}
                                variant={isActive ? "outline" : "ghost"}
                                className={
                                    isActive
                                        // Kalau AKTIF: Set warna border/text/bg DAN paksa hover-nya tetap berwarna (jangan jadi hitam)
                                        ? `border-${colorClass}-500/30 text-${colorClass}-400 bg-${colorClass}-500/10 hover:bg-${colorClass}-500/20 hover:text-${colorClass}-300 hover:border-${colorClass}-500/50`
                                        // Kalau TIDAK AKTIF: Standar abu-abu
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </Button>
                        )
                    })}
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-zinc-900/30 rounded-xl border border-white/5">
                        <Search className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                        <p className="text-zinc-400">No projects found matching &quot;<span className="text-white font-semibold">{searchQuery}</span>&quot;</p>
                        <Button variant="link" onClick={() => { setSearchQuery(""); setActiveTab("All") }} className="text-cyan-400">Clear filters</Button>
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative overflow-hidden rounded-xl p-px transition-all hover:scale-[1.01]"
                        >
                            <div className={`absolute inset-[-1000%] animate-spin-slow opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${project.status === 'Live' ? 'bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00000000_50%,#10b981_100%)]' :
                                project.status === 'Building' ? 'bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00000000_50%,#f59e0b_100%)]' :
                                    'bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00000000_50%,#71717a_100%)]'
                                }`} />

                            <div className="relative flex flex-col h-full w-full rounded-xl bg-zinc-900 border border-white/10 group-hover:border-transparent transition-colors">

                                <div className="p-6 pb-4 flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center border border-white/10 shadow-inner transition-all group-hover:scale-110 ${project.status === 'Live' ? 'bg-emerald-500/10 border-emerald-500/20' :
                                            project.status === 'Building' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-zinc-800'
                                            }`}>
                                            <DynamicProjectIcon name={project.iconName} className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <Link href={`/projects/${project.id}`} className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                                {project.name}
                                            </Link>
                                            <div className="flex items-center gap-2 mt-1">
                                                <a href="#" className="text-xs text-zinc-500 hover:text-white flex items-center gap-1">
                                                    <GithubIcon className="h-3 w-3" /> {project.repo}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <Badge variant="outline" className={`border-0 ${project.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400' :
                                        project.status === 'Building' ? 'bg-amber-500/10 text-amber-400 animate-pulse' :
                                            'bg-zinc-500/10 text-zinc-400'
                                        }`}>
                                        <div className={`h-1.5 w-1.5 rounded-full mr-2 ${project.statusColor}`} />
                                        {project.status}
                                    </Badge>
                                </div>

                                <div className="px-6 pb-6 flex-1">
                                    <p className="text-sm text-zinc-400 line-clamp-2 group-hover:text-zinc-300 transition-colors">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="px-6 py-4 border-t border-white/5 bg-black/20 rounded-b-xl flex items-center justify-between text-xs text-zinc-500">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1.5">
                                            <GitBranch className="h-3.5 w-3.5" />
                                            {project.branch}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            {project.lastDeploy}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {project.url !== "-" && (
                                            <a href={project.url} target="_blank" className="p-2 rounded-md hover:bg-white/10 hover:text-white transition-colors">
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        )}

                                        {/* --- FIX 1: DROPDOWN ACTION CLICKS --- */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 hover:text-white">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-white/10 text-zinc-200">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                                {/* Action 1: View Details (Link) */}
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/projects/${project.id}`}
                                                        className="cursor-pointer flex items-center w-full focus:bg-white/10"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" /> View Details
                                                    </Link>
                                                </DropdownMenuItem>

                                                {/* Action 2: Settings (Link) */}
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/projects/${project.id}?tab=settings`}
                                                        className="cursor-pointer flex items-center w-full focus:bg-white/10"
                                                    >
                                                        <Settings className="mr-2 h-4 w-4" /> Project Settings
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator className="bg-white/10" />

                                                {/* Action 3: Delete (Button onClick) */}
                                                <DropdownMenuItem
                                                    className="text-red-400 focus:text-red-400 cursor-pointer focus:bg-red-500/10"
                                                    onClick={() => alert(`Delete functionality for ${project.name} coming soon!`)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}