"use client";

import Link from "next/link";
import { ArrowLeft, Home, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden text-center p-4">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-lg mx-auto">

                {/* Glitchy 404 Text */}
                <div className="relative">
                    <h1 className="text-[150px] font-black text-white leading-none tracking-tighter select-none">
                        404
                    </h1>
                    <div className="absolute top-0 left-0 w-full h-full text-[150px] font-black text-cyan-500 opacity-50 blur-sm animate-pulse leading-none tracking-tighter select-none -z-10">
                        404
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Page not found</h2>
                    <p className="text-zinc-400">
                        Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada di dimensi ini.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/dashboard">
                        <Button className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)]">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto border-white/10 text-white hover:bg-white/5">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Footer decoration */}
                <div className="pt-12 flex justify-center opacity-50">
                    <Zap className="w-6 h-6 text-zinc-600" />
                </div>
            </div>
        </div>
    );
}