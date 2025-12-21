"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Info, AlertTriangle, XCircle, MailOpen } from "lucide-react";

type Notification = {
    id: number;
    title: string;
    message: string;
    type: "info" | "warning" | "error" | "success";
    date: string;
    read: boolean;
};

const initialNotifs: Notification[] = [
    { id: 1, title: "Welcome to NusantaraSaaS!", message: "Terima kasih telah bergabung. Mulai buat project pertamamu sekarang.", type: "success", date: "2 mins ago", read: false },
    { id: 2, title: "Maintenance Scheduled", message: "Server akan maintenance pada hari Minggu jam 02:00 WIB.", type: "warning", date: "1 hour ago", read: false },
    { id: 3, title: "Payment Failed", message: "Gagal memproses pembayaran untuk Invoice #INV-003. Silakan cek kartu Anda.", type: "error", date: "Yesterday", read: true },
    { id: 4, title: "New Feature Available", message: "Sekarang kamu bisa invite member via link.", type: "info", date: "2 days ago", read: true },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifs);

    // Mark All as Read
    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    // Helper Icon
    const getIcon = (type: string) => {
        switch (type) {
            case "success": return <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Check className="h-4 w-4" /></div>;
            case "warning": return <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400"><AlertTriangle className="h-4 w-4" /></div>;
            case "error": return <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400"><XCircle className="h-4 w-4" /></div>;
            default: return <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Info className="h-4 w-4" /></div>;
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Inbox</h2>
                    <p className="text-zinc-400">Pemberitahuan terbaru dari sistem.</p>
                </div>
                <Button onClick={markAllRead} variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/10">
                    <MailOpen className="mr-2 h-4 w-4" /> Mark all as read
                </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-zinc-900 border border-white/10 w-full justify-start h-12 p-1">
                    <TabsTrigger value="all" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">All</TabsTrigger>
                    <TabsTrigger value="unread" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">Unread</TabsTrigger>
                    <TabsTrigger value="archived" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">Archived</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                    {notifications.map((item) => (
                        <Card key={item.id} className={`bg-zinc-900/50 border-white/10 p-4 transition-all hover:border-cyan-500/30 ${!item.read ? 'bg-zinc-900 border-l-4 border-l-cyan-500' : ''}`}>
                            <div className="flex gap-4">
                                <div className="shrink-0 pt-1">
                                    {getIcon(item.type)}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className={`text-sm font-semibold ${!item.read ? 'text-white' : 'text-zinc-400'}`}>
                                            {item.title}
                                            {!item.read && <Badge className="ml-2 bg-cyan-500 text-black text-[10px] px-1 py-0 h-4">NEW</Badge>}
                                        </h4>
                                        <span className="text-xs text-zinc-500">{item.date}</span>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="unread">
                    <div className="text-center py-10 text-zinc-500">
                        <Bell className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>Hanya menampilkan pesan yang belum dibaca.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}