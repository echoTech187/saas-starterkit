"use client";

import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function DashboardBreadcrumb() {
    const pathname = usePathname();

    // Fungsi sederhana untuk menentukan nama halaman berdasarkan URL
    const getPageName = (path: string) => {
        if (path === "/dashboard") return "Overview";
        if (path.startsWith("/projects")) return "Projects";
        if (path.startsWith("/billing")) return "Billing";
        if (path.startsWith("/settings")) return "Settings";

        // Default fallback (ambil segmen terakhir dan kapitalisasi)
        const segments = path.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        return lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : "Dashboard";
    };

    const currentPageName = getPageName(pathname);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Level 1: Platform (Static) */}
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard" className="text-zinc-500 hover:text-zinc-300">
                        Platform
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block text-zinc-600" />

                {/* Level 2: Current Page (Dynamic) */}
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-white font-medium">
                        {currentPageName}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}