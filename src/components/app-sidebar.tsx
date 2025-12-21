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
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Data menu
const data = {
    navMain: [
        {
            title: "Overview",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Projects",
            url: "/projects",
            icon: FolderOpen,
        },
        {
            title: "Billing",
            url: "/billing",
            icon: CreditCard,
        },
        {
            title: "Activity",
            url: "/activity",
            icon: ChevronDown,
        },
        {
            title: "Notifications",
            url: "/notifications",
            icon: ChevronDown,
        },
        {
            title: "Team",
            url: "/team",
            icon: Users,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const { state } = useSidebar();

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-white/10 bg-black text-white"
            {...props}
        >

            {/* --- HEADER: LOGO & TEAM --- */}
            <SidebarHeader className="bg-black border-b border-white/5 pb-4">
                <SidebarMenu>

                    {/* LOGO */}
                    <SidebarMenuItem className="flex justify-center py-2">
                        {state === "collapsed" ? (
                            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/20">
                                NS
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 px-2">
                                {/* Ganti src logo sesuai file Anda */}
                                {/* Gunakan Logo Text putih jika ada, atau teks manual */}
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-zinc-400">
                                    NusantaraSaaS
                                </span>
                            </div>
                        )}
                    </SidebarMenuItem>

                    {/* TEAM SWITCHER */}
                    <SidebarMenuItem>
                        <Popover>
                            <PopoverTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-white/10 data-[state=open]:text-white hover:bg-white/5 hover:text-white text-zinc-400 mt-2"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                        <Users className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold text-white">Tim Merdeka</span>
                                        <span className="truncate text-xs">Free Plan</span>
                                    </div>
                                    <ChevronDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </PopoverTrigger>

                            <PopoverContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-zinc-900 border-white/10 p-1 text-white shadow-xl"
                                align="start"
                                side="bottom"
                                sideOffset={4}
                            >
                                <div className="px-2 py-1.5 text-xs font-medium text-zinc-400">
                                    Pilih Tim
                                </div>
                                <div className="space-y-1">
                                    <Button variant="ghost" className="w-full justify-start h-9 text-sm font-normal text-white hover:bg-white/10 hover:text-cyan-400 px-2">
                                        <div className="mr-2 flex size-5 items-center justify-center rounded-md border border-white/10 bg-black">
                                            <span className="text-xs">M</span>
                                        </div>
                                        Tim Merdeka
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start h-9 text-sm font-normal text-zinc-400 hover:bg-white/10 hover:text-white px-2">
                                        <div className="mr-2 flex size-5 items-center justify-center rounded-md border border-white/10 bg-zinc-800">
                                            <span className="text-xs">+</span>
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
            <SidebarContent className="bg-black pt-4">
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
                                                // INACTIVE STATE
                                                "text-zinc-400 hover:bg-white/5 hover:text-white",
                                                // ACTIVE STATE (The Glow)
                                                isActive && [
                                                    "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                                                    "shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]",
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
            <SidebarFooter className="bg-black border-t border-white/5 p-2">
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
    );
}