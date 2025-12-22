"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Zap, Users, ArrowUpRight,
    Server, Database, Globe
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">

            {/* --- 1. WELCOME BANNER --- */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-r from-cyan-900/40 to-blue-900/40 p-6 md:p-10 backdrop-blur-md">
                <div className="relative z-10 flex max-lg:flex-col lg:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Shadcn! 👋</h1>
                        <p className="text-zinc-300 max-w-xl">
                            Semua sistem berjalan normal. Project <span className="text-cyan-400 font-bold">Toko Online V2</span> sedang mengalami lonjakan traffic.
                        </p>
                        <div className="flex gap-3 mt-6">
                            {/* FUNGSI 1: CHECK ANALYTICS -> Ke Detail Project */}
                            {/* Kita arahkan ke project dummy id 'toko-online-v2' */}
                            <Link href="/projects/toko-online-v2">
                                <Button className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] cursor-pointer">
                                    Check Analytics
                                </Button>
                            </Link>

                            {/* FUNGSI 2: VIEW LOGS -> Ke Halaman Activity */}
                            <Link href="/activity">
                                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 cursor-pointer">
                                    View Logs
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Visual Stats Ringan */}
                    <div className="flex gap-4 bg-black/40 p-4 rounded-xl backdrop-blur-sm border border-white/5 max-lg:w-full">
                        <div className="text-center px-4 border-r border-white/10">
                            <p className="text-zinc-400 text-xs uppercase mb-1">Status</p>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Healthy
                            </div>
                        </div>
                        <div className="text-center px-4">
                            <p className="text-zinc-400 text-xs uppercase mb-1">Uptime</p>
                            <p className="text-white font-bold">99.9%</p>
                        </div>
                    </div>
                </div>

                {/* Background Decorative */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-1" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* --- 2. MAIN CONTENT (Left Column) --- */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Stats Grid (FINAL FIX: SOLID BACKGROUND) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                        {/* --- KARTU 1: ACTIVE PROJECTS --- */}
                        <div className="group relative overflow-hidden rounded-xl p-px transition-all hover:scale-[1.02]">
                            {/* Animasi Border (Belakang) */}
                            <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00000000_50%,#06b6d4_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Konten (Depan) - GANTI bg-zinc-900/90 JADI bg-zinc-900 (SOLID) */}
                            <div className="relative h-full w-full rounded-xl bg-zinc-900 p-6">
                                <div className="relative z-10">
                                    <h3 className="text-sm font-medium text-cyan-200/80 transition-all group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">Active Projects</h3>
                                    <div className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
                                        <Globe className="h-6 w-6 text-cyan-400 transition-all group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" /> 12
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- KARTU 2: API CALLS --- */}
                        <div className="group relative overflow-hidden rounded-xl p-px transition-all hover:scale-[1.02]">
                            <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00000000_50%,#f59e0b_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* FIX: Solid Background */}
                            <div className="relative h-full w-full rounded-xl bg-zinc-900 p-6">
                                <div className="relative z-10">
                                    <h3 className="text-sm font-medium text-amber-200/80 transition-all group-hover:text-amber-400 group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">Total API Calls</h3>
                                    <div className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
                                        <Zap className="h-6 w-6 text-amber-400 transition-all group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" /> 84.2K
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- KARTU 3: TEAM MEMBERS --- */}
                        <div className="group relative overflow-hidden rounded-xl p-px transition-all hover:scale-[1.02] col-span-1">
                            <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00000000_50%,#a855f7_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* FIX: Solid Background */}
                            <div className="relative h-full w-full rounded-xl bg-zinc-900 p-6">
                                <div className="relative z-10">
                                    <h3 className="text-sm font-medium text-purple-200/80 transition-all group-hover:text-purple-400 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">Team Members</h3>
                                    <div className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
                                        <Users className="h-6 w-6 text-purple-400 transition-all group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" /> 8
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Deployments */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Active Deployments</h3>
                            <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">View All</Link>
                        </div>

                        {/* List Card Style */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 transition-all">
                                <div className="h-12 w-12 rounded-lg bg-black/40 backdrop-blur-lg flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform group-hover:border-cyan-500/30">
                                    {i === 1 ? <Globe className="text-cyan-400 h-5 w-5" /> : i === 2 ? <Database className="text-emerald-400 h-5 w-5" /> : <Server className="text-purple-400 h-5 w-5" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <h4 className="font-semibold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                                            {i === 1 ? "Landing Page V1" : i === 2 ? "Backend API Production" : "Worker Nodes"}
                                        </h4>
                                        <span className="text-xs text-zinc-500">2h ago</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                                        <span>main-branch</span>
                                        <span>•</span>
                                        <span className={i === 1 ? "text-emerald-400" : "text-yellow-400"}>
                                            {i === 1 ? "Live" : "Building..."}
                                        </span>
                                    </div>
                                </div>
                                <Link href={`/projects/${i}`}>
                                    <Button size="icon" variant="ghost" className="text-zinc-500 hover:text-white hover:bg-white/10 cursor-pointer">
                                        <ArrowUpRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 3. SIDEBAR WIDGETS (Right Column) --- */}
                <div className="space-y-6">

                    {/* Resource Usage (FIX: DISTINCT COLORS) */}
                    <Card className="bg-zinc-900/40 border-white/10 backdrop-blur-sm">
                        <CardHeader><CardTitle className="text-white">Resource Usage</CardTitle></CardHeader>
                        <CardContent className="space-y-6">

                            {/* Bandwidth (Emerald) */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Bandwidth</span>
                                    <span className="text-white font-medium">75%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                    <div className="h-full w-[75%] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                                </div>
                            </div>

                            {/* Storage (Blue) */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Storage</span>
                                    <span className="text-white font-medium">42%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                    <div className="h-full w-[42%] rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                                </div>
                            </div>

                            {/* Build Minutes (Pink) */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Build Minutes</span>
                                    <span className="text-white font-medium">10%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                    <div className="h-full w-[10%] rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)]" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                {/* FUNGSI 3: UPGRADE PLAN -> Ke Halaman Billing */}
                                <Link href="/billing">
                                    <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700 border border-transparent transition-all cursor-pointer">
                                        Upgrade Plan
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Team Activity */}
                    <Card className="bg-zinc-900/40 border-white/10 backdrop-blur-sm">
                        <CardHeader><CardTitle className="text-white">Recent Activity</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-start gap-3 group">
                                        <Avatar className="h-8 w-8 border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                            <AvatarImage src={`/avatars/${i}.png`} />
                                            <AvatarFallback className="text-xs bg-zinc-800 text-zinc-400">U{i}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm text-zinc-300">
                                                <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">User {i}</span> deployed new version
                                            </p>
                                            <p className="text-xs text-zinc-500">10m ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}