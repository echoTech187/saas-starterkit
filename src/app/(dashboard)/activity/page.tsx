"use client";

import { useState } from "react";
import {
    History, Search, Filter, FileCode, CreditCard,
    Settings, UserPlus, Trash2, Shield, GitCommit, FileText
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"; // Import toast untuk notifikasi
import Link from "next/link";

// --- DUMMY DATA LOGS ---
const initialLogs = [
    {
        id: 1,
        user: { name: "Agus Santoso", avatar: "/avatars/01.png", initials: "AG" },
        action: "deployed version",
        target: "v1.2.5",
        project: "Nusantara SaaS",
        type: "deployment",
        time: "Just now",
        date: "Today"
    },
    {
        id: 2,
        user: { name: "Budi Pratama", avatar: "/avatars/02.png", initials: "BP" },
        action: "updated billing info",
        target: "Visa ending 4242",
        project: "Global",
        type: "billing",
        time: "2 hours ago",
        date: "Today"
    },
    {
        id: 3,
        user: { name: "Agus Santoso", avatar: "/avatars/01.png", initials: "AG" },
        action: "invited member",
        target: "citra@design.com",
        project: "Nusantara SaaS",
        type: "team",
        time: "5 hours ago",
        date: "Today"
    },
    {
        id: 4,
        user: { name: "System", avatar: "", initials: "SYS" },
        action: "auto-backup completed",
        target: "Database",
        project: "Worker Nodes",
        type: "system",
        time: "Yesterday at 10:00 PM",
        date: "Yesterday"
    },
    {
        id: 5,
        user: { name: "Budi Pratama", avatar: "/avatars/02.png", initials: "BP" },
        action: "changed project settings",
        target: "Environment Variables",
        project: "Marketing Site",
        type: "settings",
        time: "Yesterday at 2:30 PM",
        date: "Yesterday"
    },
    {
        id: 6,
        user: { name: "Agus Santoso", avatar: "/avatars/01.png", initials: "AG" },
        action: "deleted project",
        target: "Old Landing Page",
        project: "-",
        type: "danger",
        time: "Oct 24, 2024",
        date: "Previous 7 Days"
    },
];

export default function ActivityPage() {
    const [filterType, setFilterType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Handler Export PDF
    const handleExportPdf = () => {
        toast.info("Menyiapkan laporan PDF...", {
            description: "Sedang mengumpulkan data audit log."
        });

        // Simulasi delay generate PDF
        setTimeout(() => {
            toast.success("Laporan berhasil diunduh!", {
                description: "activity-log-2024.pdf telah disimpan."
            });
        }, 2000);
    };

    // Filter Logic
    const filteredLogs = initialLogs.filter((log) => {
        const matchesType = filterType === "all" || log.type === filterType;
        const matchesSearch =
            log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.target.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    // Group by Date for UI
    const groupedLogs = filteredLogs.reduce((groups, log) => {
        const date = log.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(log);
        return groups;
    }, {} as Record<string, typeof initialLogs>);

    // Helper Icon
    const getIcon = (type: string) => {
        switch (type) {
            case "deployment": return <GitCommit className="w-4 h-4 text-emerald-400" />;
            case "billing": return <CreditCard className="w-4 h-4 text-amber-400" />;
            case "team": return <UserPlus className="w-4 h-4 text-blue-400" />;
            case "settings": return <Settings className="w-4 h-4 text-zinc-400" />;
            case "danger": return <Trash2 className="w-4 h-4 text-red-400" />;
            case "security": return <Shield className="w-4 h-4 text-purple-400" />;
            default: return <FileCode className="w-4 h-4 text-cyan-400" />;
        }
    };

    return (
        <div className="space-y-6 pb-20">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Audit Log</h1>
                <p className="text-zinc-400 mt-2">Rekam jejak aktivitas tim dan perubahan sistem.</p>
            </div>

            {/* FILTERS & ACTIONS */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search by user, action, or target..."
                        className="pl-9 bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-45 bg-black/40 border-white/10 text-zinc-300">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                <SelectValue placeholder="Filter Type" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="deployment">Deployments</SelectItem>
                            <SelectItem value="team">Team & Access</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="danger">Danger Zone</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* ACTION BUTTON: EXPORT PDF */}
                    <Button
                        variant="outline"
                        className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5"
                        onClick={handleExportPdf}
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* TIMELINE LIST */}
            <div className="space-y-8">
                {Object.keys(groupedLogs).length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
                        <History className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                        <h3 className="text-zinc-300 font-medium">No activity found</h3>
                        <p className="text-zinc-500 text-sm">Coba ubah filter atau kata kunci pencarian Anda.</p>
                    </div>
                ) : (
                    Object.keys(groupedLogs).map((dateGroup) => (
                        <div key={dateGroup} className="relative">
                            <div className="sticky top-0 z-10 bg-transparent backdrop-blur-sm py-2 px-6 mb-4 border-b border-white/5">
                                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">{dateGroup}</h3>
                            </div>

                            <div className="space-y-4 pl-2">
                                {/* Vertical Line */}
                                <div className="absolute left-10 top-10 bottom-0 w-px bg-white/10 -z-10" />

                                {groupedLogs[dateGroup].map((log) => (
                                    <div key={log.id} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                        {/* Icon Bubble */}
                                        <div className="relative mt-1">
                                            <Avatar className="w-10 h-10 border border-white/10 bg-black">
                                                <AvatarImage src={log.user.avatar} />
                                                <AvatarFallback className="text-xs bg-zinc-800 text-zinc-400 font-bold">{log.user.initials}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 bg-zinc-900 p-1 rounded-full border border-zinc-800">
                                                {getIcon(log.type)}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                                                <div className="text-sm text-zinc-300">
                                                    <Link
                                                        href={`/team/${log.user.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className="font-semibold text-white hover:text-cyan-400 hover:underline decoration-cyan-500/50 underline-offset-4 transition-all"
                                                    >
                                                        {log.user.name}
                                                    </Link>
                                                    <span className="text-zinc-500 mx-1.5">{log.action}</span>
                                                    <span className="font-medium text-cyan-400 font-mono bg-cyan-950/30 px-1.5 py-0.5 rounded text-xs border border-cyan-900/50">
                                                        {log.target}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-zinc-500 whitespace-nowrap">{log.time}</span>
                                            </div>
                                            <div className="text-xs text-zinc-600 mt-1 flex items-center gap-2">
                                                <span>Project: {log.project}</span>
                                                {log.type === "danger" && <Badge variant="destructive" className="h-4 px-1 text-[10px]">Critical</Badge>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}