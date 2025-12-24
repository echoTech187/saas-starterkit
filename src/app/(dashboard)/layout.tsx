"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb"
import { useEffect, useState } from "react";
import { IUser } from "@/core/entities/IUser";
import { verifySession } from "@/lib/session";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        async function verifyUser() {
            const user = await verifySession();
            setUser(user);
        }
        verifyUser()
    }, [])

    return user ? (
        <SidebarProvider className="dark">
            <AppSidebar user={user} />
            <SidebarInset className="bg-background  relative overflow-x-hidden min-h-screen">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none z-0" />
                <header className="flex h-16 shrink-0 items-center gap-2 border-0 bg-background/5 backdrop-blur-xl px-4 sticky top-0 z-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-white/10" />
                        <DashboardBreadcrumb />
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-8 pt-6 relative z-1">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    ) : null;
}