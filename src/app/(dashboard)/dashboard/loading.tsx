"use client";
import React, { useEffect, useState } from "react";

export default function DashboardLoading() {
    const [randomHeight, setRandomHeight] = useState(0);

    useEffect(() => {
        function handleResize() {
            const random = Math.floor(Math.random() * (60 - 30 + 1) + 30);
            setRandomHeight(random);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
    }, []);
    return (
        <div className="min-h-screen bg-black p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">

            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-3">
                    <div className="h-8 w-48 md:w-64 bg-zinc-800/50 rounded-lg animate-pulse" />
                    <div className="h-4 w-72 md:w-96 bg-zinc-800/30 rounded-lg animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-24 bg-zinc-800/50 rounded-lg animate-pulse" />
                    <div className="h-10 w-10 bg-zinc-800/50 rounded-full animate-pulse" />
                </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <div className="h-5 w-24 bg-zinc-800/50 rounded animate-pulse" />
                            <div className="h-8 w-8 bg-zinc-800/30 rounded-lg animate-pulse" />
                        </div>
                        <div className="space-y-2 pt-2">
                            <div className="h-8 w-32 bg-zinc-800/50 rounded animate-pulse" />
                            <div className="h-4 w-full bg-zinc-800/20 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Skeleton (Charts & Lists) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Chart Area Skeleton */}
                <div className="lg:col-span-2 h-112.5 rounded-2xl bg-zinc-900/30 border border-white/5 p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="h-6 w-48 bg-zinc-800/50 rounded animate-pulse" />
                        <div className="h-8 w-32 bg-zinc-800/30 rounded-lg animate-pulse" />
                    </div>
                    {/* Mock Chart Bars */}
                    <div className="flex items-end justify-between h-80 gap-2 px-2 pb-2">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="w-full bg-zinc-800/20 rounded-t-md animate-pulse"
                                style={{ height: `${randomHeight}%` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Recent Activity / List Skeleton */}
                <div className="h-112.5 rounded-2xl bg-zinc-900/30 border border-white/5 p-6 space-y-6">
                    <div className="h-6 w-40 bg-zinc-800/50 rounded animate-pulse" />
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-zinc-800/50 animate-pulse shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-3/4 bg-zinc-800/50 rounded animate-pulse" />
                                    <div className="h-3 w-1/2 bg-zinc-800/30 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
