"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FileCode, User, CreditCard, Trash2, Settings, ShieldAlert } from "lucide-react";

// Tipe Data Log
type ActivityLog = {
    id: string;
    user: { name: string; avatar: string; initial: string };
    action: string;
    target: string;
    date: string;
    type: "project" | "billing" | "team" | "security";
};

const dummyLogs: ActivityLog[] = [
    {
        id: "1",
        user: { name: "Shadcn Admin", avatar: "/avatars/shadcn.jpg", initial: "SA" },
        action: "created project",
        target: "Toko Online V2",
        date: "Just now",
        type: "project"
    },
    {
        id: "2",
        user: { name: "John Doe", avatar: "", initial: "JD" },
        action: "updated billing info",
        target: "Visa ending 4242",
        date: "2 hours ago",
        type: "billing"
    },
    {
        id: "3",
        user: { name: "Shadcn Admin", avatar: "/avatars/shadcn.jpg", initial: "SA" },
        action: "invited user",
        target: "jane@example.com",
        date: "5 hours ago",
        type: "team"
    },
    {
        id: "4",
        user: { name: "System", avatar: "", initial: "SYS" },
        action: "detected failed login",
        target: "IP: 192.168.1.1",
        date: "1 day ago",
        type: "security"
    },
];

export default function ActivityPage() {
    const [logs] = useState<ActivityLog[]>(dummyLogs);

    // Helper Icon berdasarkan Tipe Log
    const getIcon = (type: string) => {
        switch (type) {
            case "project": return <FileCode className="h-4 w-4 text-blue-400" />;
            case "billing": return <CreditCard className="h-4 w-4 text-emerald-400" />;
            case "team": return <User className="h-4 w-4 text-purple-400" />;
            case "security": return <ShieldAlert className="h-4 w-4 text-red-400" />;
            default: return <Settings className="h-4 w-4 text-zinc-400" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Activity Log</h2>
                <p className="text-zinc-400">Jejak audit aktivitas tim dan sistem Anda.</p>
            </div>

            {/* Toolbar Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input placeholder="Cari aktivitas..." className="pl-9 bg-zinc-900/50 border-white/10 text-white" />
                    </div>
                    <Button variant="outline" className="border-white/10 bg-zinc-900/50 text-zinc-300 hover:text-white">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="7d">
                        <SelectTrigger className="w-35 bg-zinc-900/50 border-white/10 text-white">
                            <SelectValue placeholder="Rentang Waktu" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                            <SelectItem value="24h">Last 24 Hours</SelectItem>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" className="text-zinc-400 hover:text-red-400 hover:bg-red-900/10">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Log List */}
            <Card className="bg-zinc-900/50 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-zinc-400">Menampilkan 4 dari 128 total event.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {logs.map((log, index) => (
                            <div key={log.id} className="relative flex gap-4 group">
                                {/* Garis Vertikal (Timeline) */}
                                {index !== logs.length - 1 && (
                                    <div className="absolute left-5 top-10 -bottom-5 w-px bg-white/10 group-hover:bg-cyan-500/30 transition-colors" />
                                )}

                                {/* Avatar User */}
                                <Avatar className="h-10 w-10 border border-white/10 z-10">
                                    <AvatarImage src={log.user.avatar} />
                                    <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">{log.user.initial}</AvatarFallback>
                                </Avatar>

                                {/* Content */}
                                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-white">
                                            <span className="font-bold text-cyan-400">{log.user.name}</span>{" "}
                                            <span className="text-zinc-400">{log.action}</span>{" "}
                                            <span className="font-bold text-white">{log.target}</span>
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="bg-black/40 text-xs font-normal border-white/10 flex items-center gap-1">
                                                {getIcon(log.type)} {log.type.toUpperCase()}
                                            </Badge>
                                            <span className="text-xs text-zinc-500">{log.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}