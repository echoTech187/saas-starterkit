import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"

import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-black overflow-x-hidden">
                {/* Header Glassmorphism */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 bg-black/50 backdrop-blur-xl px-4 sticky top-0 z-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white hover:bg-white/10" />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-white/10" />

                        <DashboardBreadcrumb />
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-8 pt-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}