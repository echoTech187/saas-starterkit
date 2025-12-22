"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderOpen,
    CreditCard,
    Settings,
    ChevronDown,
    Users,
    LogOut,
    Activity,
    Bell,
    Plus,
    Check,
    Loader2
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Data Navigasi (Tetap)
const data = {
    navMain: [
        { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
        { title: "Projects", url: "/projects", icon: FolderOpen },
        { title: "Billing", url: "/billing", icon: CreditCard },
        { title: "Activity", url: "/activity", icon: Activity },
        { title: "Notifications", url: "/notifications", icon: Bell },
        { title: "Settings", url: "/settings", icon: Settings },
    ],
};

// Data Awal Tim
const initialTeams = [
    { id: "t1", name: "Tim Merdeka", plan: "Free Plan", logo: "M" },
    { id: "t2", name: "Nusantara Corp", plan: "Pro Plan", logo: "N" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const { state } = useSidebar();

    // --- STATE LOGIC ---
    const [teams, setTeams] = React.useState(initialTeams);
    const [activeTeam, setActiveTeam] = React.useState(initialTeams[0]);

    // State untuk Dialog Buat Tim
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [newTeamName, setNewTeamName] = React.useState("");
    const [isCreating, setIsCreating] = React.useState(false);

    // State untuk Popover agar bisa ditutup manual saat klik item
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    // Handler: Buat Tim Baru
    const handleCreateTeam = () => {
        if (!newTeamName.trim()) {
            toast.error("Nama tim tidak boleh kosong");
            return;
        }

        setIsCreating(true);

        // Simulasi API Request
        setTimeout(() => {
            const newTeam = {
                id: `t-${Date.now()}`,
                name: newTeamName,
                plan: "Free Plan", // Default plan
                logo: newTeamName.charAt(0).toUpperCase()
            };

            setTeams([...teams, newTeam]);
            setActiveTeam(newTeam); // Auto switch ke tim baru
            setNewTeamName("");
            setIsCreating(false);
            setIsDialogOpen(false); // Tutup Dialog
            setIsPopoverOpen(false); // Tutup Popover (jika masih terbuka di background)

            toast.success("Tim berhasil dibuat!", {
                description: `Anda sekarang berada di ${newTeam.name}`
            });
        }, 1000);
    };

    return (
        <>
            <Sidebar
                collapsible="icon"
                className="border-r border-white/10 bg-background text-white"
                {...props}
            >
                {/* --- HEADER: LOGO & TEAM --- */}
                <SidebarHeader className="bg-background border-b border-white/5 pb-4">
                    <SidebarMenu>
                        {/* LOGO */}
                        <SidebarMenuItem className="flex justify-center py-2">
                            {state === "collapsed" ? (
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/20">
                                    NS
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-2">
                                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-zinc-400">
                                        NusantaraSaaS
                                    </span>
                                </div>
                            )}
                        </SidebarMenuItem>

                        {/* TEAM SWITCHER (FUNGSI BARU) */}
                        <SidebarMenuItem>
                            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-white/10 data-[state=open]:text-white hover:bg-white/5 hover:text-white text-zinc-400 mt-2"
                                    >
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold">
                                            {activeTeam.logo}
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold text-white">{activeTeam.name}</span>
                                            <span className="truncate text-xs">{activeTeam.plan}</span>
                                        </div>
                                        <ChevronDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </PopoverTrigger>

                                <PopoverContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-background border-white/10 p-1 text-white shadow-xl"
                                    align="start"
                                    side="bottom"
                                    sideOffset={4}
                                >
                                    <div className="px-2 py-1.5 text-xs font-medium text-zinc-400">
                                        Pilih Tim
                                    </div>

                                    {/* LIST TIM DINAMIS */}
                                    <div className="space-y-1">
                                        {teams.map((team) => (
                                            <Button
                                                key={team.id}
                                                variant="ghost"
                                                onClick={() => {
                                                    setActiveTeam(team);
                                                    setIsPopoverOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full justify-start h-9 text-sm font-normal px-2",
                                                    activeTeam.id === team.id
                                                        ? "bg-white/10 text-cyan-400"
                                                        : "text-white hover:bg-white/10 hover:text-cyan-400"
                                                )}
                                            >
                                                <div className="mr-2 flex size-5 items-center justify-center rounded-md border border-white/10 bg-background text-xs font-bold">
                                                    {team.logo}
                                                </div>
                                                {team.name}
                                                {activeTeam.id === team.id && <Check className="ml-auto h-4 w-4" />}
                                            </Button>
                                        ))}

                                        {/* TOMBOL BUAT TIM BARU */}
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                setIsPopoverOpen(false); // Tutup popover dulu
                                                setIsDialogOpen(true);   // Buka modal
                                            }}
                                            className="w-full justify-start h-9 text-sm font-normal text-zinc-400 hover:bg-white/10 hover:text-white px-2 mt-2 border-t border-white/5 rounded-none"
                                        >
                                            <div className="mr-2 flex size-5 items-center justify-center rounded-md border border-white/10 bg-zinc-800">
                                                <Plus className="size-3" />
                                            </div>
                                            Buat Tim Baru
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                {/* --- CONTENT: MENU --- */}
                <SidebarContent className="bg-background pt-4">
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-zinc-500 text-xs uppercase tracking-wider">Platform</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.navMain.map((item) => {
                                    const isActive = pathname === item.url || (item.url !== '/dashboard' && pathname?.startsWith(item.url));

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                tooltip={item.title}
                                                className={cn(
                                                    "h-10 transition-all duration-200 mx-2 w-auto rounded-lg",
                                                    "text-zinc-400 hover:bg-white/5 hover:text-white",
                                                    isActive && [
                                                        "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                                                        "hover:bg-cyan-500/20 hover:text-cyan-300"
                                                    ]
                                                )}
                                            >
                                                <Link href={item.url} className="flex items-center gap-3">
                                                    <item.icon className={cn("size-4", isActive ? "text-cyan-400" : "text-zinc-400 group-hover:text-white")} />
                                                    <span className="font-medium">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                {/* --- FOOTER: USER PROFILE --- */}
                <SidebarFooter className="bg-background border-t border-white/5 p-2">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-white/10 data-[state=open]:text-white hover:bg-white/5 hover:text-white text-zinc-400"
                            >
                                <Avatar className="h-8 w-8 rounded-lg border border-white/10">
                                    <AvatarImage src="/avatars/shadcn.jpg" alt="@shadcn" />
                                    <AvatarFallback className="rounded-lg bg-zinc-800 text-zinc-400">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                                    <span className="truncate font-semibold text-white">Shadcn</span>
                                    <span className="truncate text-xs">m@example.com</span>
                                </div>
                                <LogOut className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>

                <SidebarRail />
            </Sidebar>

            {/* --- MODAL DIALOG: BUAT TIM BARU --- */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Buat Tim Baru</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Beri nama untuk tim baru Anda. Anda bisa menambahkan anggota nanti.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-zinc-300">Nama Tim</Label>
                            <Input
                                id="name"
                                placeholder="Contoh: Tim Engineering"
                                className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                value={newTeamName}
                                onChange={(e) => setNewTeamName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent">
                            Batal
                        </Button>
                        <Button
                            onClick={handleCreateTeam}
                            disabled={isCreating}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white"
                        >
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Buat Tim
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}