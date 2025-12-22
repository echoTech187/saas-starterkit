"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
    Mail, MapPin, Calendar, GitCommit, GitPullRequest,
    Zap, Clock, ArrowLeft, ExternalLink, Shield
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- DUMMY DATA ---
const memberData = {
    id: "user-123",
    name: "Agus Santoso",
    role: "Senior Frontend Engineer",
    email: "agus@nusantara.id",
    location: "Jakarta, ID",
    joined: "September 2023",
    avatar: "/avatars/01.png",
    initials: "AG",
    bio: "Passionate about UI/UX and building accessible web applications. Love Shadcn UI and Tailwind CSS.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    performance: {
        commits: 452,
        prs: 86,
        deployments: 124,
        uptime: "99.9%",
        score: 92 // Productivity Score
    }
};

const assignedProjects = [
    { name: "Nusantara SaaS", role: "Owner", status: "Live", tech: "Next.js" },
    { name: "Marketing Site", role: "Editor", status: "Building", tech: "Astro" },
    { name: "Documentation", role: "Viewer", status: "Live", tech: "Markdoc" },
];

const memberActivity = [
    { action: "pushed commit", target: "feat: add user profile page", time: "2 hours ago", icon: GitCommit },
    { action: "opened PR", target: "fix: mobile responsiveness", time: "5 hours ago", icon: GitPullRequest },
    { action: "deployed", target: "production v1.2.0", time: "Yesterday", icon: Zap },
];

export default function MemberDetailPage({ params }: { params: Promise<{ memberId: string }> }) {
    // Unwrap params (Next.js 15)
    const { memberId } = use(params);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="space-y-6 pb-20">

            {/* HEADER & NAV */}
            <div className="flex items-center gap-4">
                <Link href="/activity">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Team Member Profile</h1>
                    <p className="text-zinc-400 text-sm">Detail aktivitas dan performa anggota tim.</p>
                </div>
            </div>

            {/* --- PROFILE CARD (HERO) --- */}
            <Card className="bg-zinc-900/50 border-white/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-cyan-900/40 to-blue-900/40" />
                <CardContent className="pt-12 px-6 pb-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <Avatar className="w-24 h-24 border-4 border-zinc-950 shadow-xl">
                            <AvatarImage src={memberData.avatar} />
                            <AvatarFallback className="text-2xl bg-zinc-800 text-zinc-400">{memberData.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2 mt-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{memberData.name}</h2>
                                    <p className="text-cyan-400 font-medium">{memberData.role}</p>
                                </div>
                                <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-3 py-1">
                                    <Shield className="w-3 h-3 mr-2" /> Verified Member
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mt-2">
                                <div className="flex items-center gap-1"><Mail className="w-4 h-4" /> {memberData.email}</div>
                                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {memberData.location}</div>
                                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {memberData.joined}</div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {memberData.skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="bg-white/5 text-zinc-300 hover:bg-white/10">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* --- CONTENT TABS --- */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-black/40 border border-white/10 p-1 h-auto rounded-xl">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-950/50 data-[state=active]:text-cyan-400 py-2 px-4">Overview & Stats</TabsTrigger>
                    <TabsTrigger value="projects" className="data-[state=active]:bg-cyan-950/50 data-[state=active]:text-cyan-400 py-2 px-4">Assigned Projects</TabsTrigger>
                </TabsList>

                {/* TAB: OVERVIEW (PERFORMANCE) */}
                <TabsContent value="overview" className="space-y-6">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400">Total Commits</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{memberData.performance.commits}</div>
                                <p className="text-xs text-emerald-400 mt-1">+12 this week</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400">PRs Merged</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{memberData.performance.prs}</div>
                                <p className="text-xs text-zinc-500 mt-1">High collaboration</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400">Deployments</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{memberData.performance.deployments}</div>
                                <p className="text-xs text-zinc-500 mt-1">To production</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-white/10 relative overflow-hidden">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400">Productivity Score</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-cyan-400">{memberData.performance.score}/100</div>
                                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                    <div className={`h-full w-[${memberData.performance.score}%] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"`} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity Timeline */}
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Activity</CardTitle>
                            <CardDescription className="text-zinc-400">Aktivitas terakhir yang dilakukan user ini.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {memberActivity.map((log, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {/* Connector Line */}
                                    {i !== memberActivity.length - 1 && (
                                        <div className="absolute left-3.75 top-8 -bottom-6 w-px bg-white/10" />
                                    )}

                                    <div className="relative z-10 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                                        <log.icon className="w-4 h-4 text-cyan-500" />
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <div className="text-sm text-zinc-200">
                                            <span className="font-semibold">{memberData.name}</span> {log.action} <span className="text-cyan-400 font-mono bg-cyan-950/30 px-1 rounded">{log.target}</span>
                                        </div>
                                        <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                                            <Clock className="w-3 h-3" /> {log.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB: PROJECTS */}
                <TabsContent value="projects">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {assignedProjects.map((project, i) => (
                            <Card key={i} className="bg-zinc-900/50 border-white/10 hover:border-cyan-500/30 transition-colors group cursor-pointer">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">{project.name}</CardTitle>
                                            <CardDescription className="mt-1">{project.tech}</CardDescription>
                                        </div>
                                        <Badge variant="outline" className="border-white/10 text-zinc-400">{project.role}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            <span className="text-zinc-300">{project.status}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 text-zinc-500 hover:text-white">
                                            View Details <ExternalLink className="w-3 h-3 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    );
}