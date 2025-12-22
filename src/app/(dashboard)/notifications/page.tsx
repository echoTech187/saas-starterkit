"use client";

import { useState } from "react";
import {
    Bell, Check, Trash2, Archive, MailOpen,
    Info, AlertTriangle, UserPlus,
    MoreHorizontal, Calendar, CheckCircle2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils"; // Pastikan utilitas cn ada (standar shadcn)

// --- DUMMY DATA ---
type Notification = {
    id: string;
    title: string;
    message: string;
    time: string;
    type: "info" | "success" | "warning" | "error" | "invite";
    read: boolean;
    category: string; // System, Billing, Project, Team
};

const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "Deployment Successful",
        message: "Project Toko Online V2 has been successfully deployed to production.",
        time: "2 minutes ago",
        type: "success",
        read: false,
        category: "Project"
    },
    {
        id: "2",
        title: "Payment Received",
        message: "Thank you! We received your payment of $29.00 for the Pro Plan.",
        time: "1 hour ago",
        type: "info",
        read: false,
        category: "Billing"
    },
    {
        id: "3",
        title: "High Memory Usage Alert",
        message: "Worker-01 is consuming 85% of available memory. Consider scaling up.",
        time: "3 hours ago",
        type: "warning",
        read: false,
        category: "System"
    },
    {
        id: "4",
        title: "Invitation Accepted",
        message: "Citra Dewi has accepted your invitation to join the team.",
        time: "Yesterday",
        type: "invite",
        read: true,
        category: "Team"
    },
    {
        id: "5",
        title: "Database Backup Failed",
        message: "Daily backup for 'Main DB' failed due to connection timeout.",
        time: "2 days ago",
        type: "error",
        read: true,
        category: "System"
    },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [activeTab, setActiveTab] = useState("all");

    // --- HANDLERS ---

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        toast.success("Marked as read");
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        toast.success("All notifications marked as read");
    };

    const handleDelete = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        toast.success("Notification deleted");
    };

    const handleClearAll = () => {
        setNotifications([]);
        toast.success("All notifications cleared");
    };

    // --- HELPER RENDER ICON ---
    const getIcon = (type: string) => {
        switch (type) {
            case "success": return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
            case "warning": return <AlertTriangle className="w-5 h-5 text-amber-400" />;
            case "error": return <AlertTriangle className="w-5 h-5 text-red-400" />;
            case "invite": return <UserPlus className="w-5 h-5 text-blue-400" />;
            case "info":
            default: return <Info className="w-5 h-5 text-cyan-400" />;
        }
    };

    // Filter Logic
    const filteredList = notifications.filter(n => {
        if (activeTab === "unread") return !n.read;
        if (activeTab === "system") return n.category === "System";
        return true; // "all"
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="space-y-6 pb-20">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Inbox</h1>
                    <p className="text-zinc-400 mt-2">
                        Anda memiliki <span className="text-cyan-400 font-bold">{unreadCount}</span> pesan belum dibaca.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5"
                        onClick={handleMarkAllRead}
                        disabled={unreadCount === 0}
                    >
                        <MailOpen className="w-4 h-4 mr-2" /> Mark all read
                    </Button>
                    {/* Tombol Clear All hanya muncul jika ada notifikasi */}
                    {notifications.length > 0 && (
                        <Button
                            variant="ghost"
                            className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                            onClick={handleClearAll}
                        >
                            Clear All
                        </Button>
                    )}
                </div>
            </div>

            {/* TABS & LIST */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-black/40 border border-white/10 p-1 h-auto rounded-xl">
                    <TabsTrigger value="all" className="data-[state=active]:bg-cyan-950/50 data-[state=active]:text-cyan-400 py-2 px-4">All</TabsTrigger>
                    <TabsTrigger value="unread" className="data-[state=active]:bg-cyan-950/50 data-[state=active]:text-cyan-400 py-2 px-4">
                        Unread {unreadCount > 0 && <span className="ml-2 bg-cyan-500 text-black text-[10px] px-1.5 rounded-full font-bold">{unreadCount}</span>}
                    </TabsTrigger>
                    <TabsTrigger value="system" className="data-[state=active]:bg-cyan-950/50 data-[state=active]:text-cyan-400 py-2 px-4">System</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4">

                    {/* EMPTY STATE */}
                    {filteredList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 rounded-xl border border-dashed border-white/10">
                            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                                <Bell className="w-8 h-8 text-zinc-600" />
                            </div>
                            <h3 className="text-lg font-medium text-white">No notifications</h3>
                            <p className="text-zinc-500 max-w-sm mt-1">
                                {activeTab === "unread" ? "You're all caught up! No new messages." : "There are no notifications in this category yet."}
                            </p>
                        </div>
                    ) : (
                        /* NOTIFICATION LIST */
                        <div className="grid gap-3">
                            {filteredList.map((notification) => (
                                <Card
                                    key={notification.id}
                                    className={cn(
                                        "border-white/5 transition-all duration-200 hover:border-cyan-500/30 group",
                                        notification.read ? "bg-zinc-900/30 opacity-70 hover:opacity-100" : "bg-zinc-900/80 border-l-4 border-l-cyan-500 shadow-[0_4px_20px_-10px_rgba(6,182,212,0.1)]"
                                    )}
                                >
                                    <CardContent className="p-4 flex gap-4 items-start">
                                        {/* Icon Box */}
                                        <div className={cn(
                                            "p-2.5 rounded-lg border border-white/5 shrink-0 mt-1",
                                            notification.read ? "bg-zinc-800/50 text-zinc-500" : "bg-black/40"
                                        )}>
                                            {getIcon(notification.type)}
                                        </div>

                                        {/* Content Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className={cn("text-sm font-semibold", notification.read ? "text-zinc-400" : "text-white")}>
                                                        {notification.title}
                                                    </h4>
                                                    {!notification.read && (
                                                        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 text-[10px] h-4 px-1 pointer-events-none">NEW</Badge>
                                                    )}
                                                </div>
                                                <span className="text-xs text-zinc-500 whitespace-nowrap flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> {notification.time}
                                                </span>
                                            </div>
                                            <p className={cn("text-sm leading-relaxed line-clamp-2 md:line-clamp-1", notification.read ? "text-zinc-500" : "text-zinc-300")}>
                                                {notification.message}
                                            </p>
                                        </div>

                                        {/* Actions Dropdown */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white shrink-0">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-zinc-300">
                                                {!notification.read && (
                                                    <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)} className="cursor-pointer focus:bg-white/10 focus:text-white">
                                                        <Check className="w-4 h-4 mr-2" /> Mark as read
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem onClick={() => toast.info("Archive functionality simulated")} className="cursor-pointer focus:bg-white/10 focus:text-white">
                                                    <Archive className="w-4 h-4 mr-2" /> Archive
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(notification.id)} className="cursor-pointer text-red-400 focus:bg-red-900/20 focus:text-red-300">
                                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                </TabsContent>
            </Tabs>
        </div>
    );
}