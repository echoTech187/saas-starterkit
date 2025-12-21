"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function PricingSection() {
    return (
        <section className="bg-black py-24 relative overflow-hidden">
            <div className="w-full max-w-6xl mx-auto">
                {/* Background Gradient Blob (Pemanis) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="w-full max-w-6xl mx-auto px-4 relative z-10">

                    {/* HEADER */}
                    <div className="text-center mb-16 w-full">
                        <RevealOnScroll width="100%">
                            <h2 className="text-3xl font-bold text-white md:text-5xl mb-6">
                                Investasi Sekali, <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-200 via-cyan-400 to-teal-300">
                                    Untung Berkali-kali.
                                </span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-zinc-400 text-lg">
                                Stop bayar langganan bulanan. Dapatkan <em>full source code</em> dan hak milik selamanya.
                                Kirim invoice ke klien Anda minggu depan.
                            </p>
                        </RevealOnScroll>
                    </div>

                    {/* PRICING GRID (Responsive: 1 col di HP, 2 col di Desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start w-full">

                        {/* --- PLAN 1: STANDARD (Indie Hacker) --- */}
                        <RevealOnScroll delay={0.1} width="100%">
                            <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:border-white/20">
                                <h3 className="text-xl font-semibold text-zinc-100">Indie Hacker</h3>
                                <p className="mt-2 text-zinc-400 text-sm">Cocok untuk solo developer membangun MVP.</p>

                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$49</span>
                                    <span className="text-zinc-500">/ license</span>
                                </div>

                                <Button className="w-full rounded-full bg-white/10 text-white hover:bg-white hover:text-teal-600 h-12" variant="outline">
                                    Beli Standard
                                </Button>

                                <ul className="mt-8 space-y-4 text-sm text-zinc-300">
                                    <li className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-white shrink-0" /> <span>Full Source Code Next.js 15</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-white shrink-0" /> <span>Database Schema & Auth</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-white shrink-0" /> <span>Akses Lifetime Update</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-zinc-500">
                                        <X className="h-5 w-5 shrink-0" /> <span>Figma Design File</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-zinc-500">
                                        <X className="h-5 w-5 shrink-0" /> <span>Prioritas Support 24/7</span>
                                    </li>
                                </ul>
                            </div>
                        </RevealOnScroll>

                        {/* --- PLAN 2: PRO (Software House) - THE GLOWING ONE --- */}
                        <RevealOnScroll delay={0.2} width="100%">
                            <div className="relative rounded-3xl border border-cyan-500/50 bg-zinc-900/80 p-8 shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)] transition-transform hover:scale-[1.02]">

                                {/* Badge Popular */}
                                <div className="absolute z-50 -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-4 py-1 text-xs font-bold text-black shadow-lg shadow-cyan-500/20">
                                    PALING LARIS
                                </div>

                                <h3 className="text-xl font-semibold text-white">Software House</h3>
                                <p className="mt-2 text-cyan-200/70 text-sm">Paket lengkap untuk tim dan agency.</p>

                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$99</span>
                                    <span className="text-zinc-500">/ license</span>
                                </div>

                                {/* Tombol CTA Menyala */}
                                <Button className="w-full rounded-full bg-linear-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 h-12 border-0 shadow-lg shadow-cyan-500/20 font-semibold">
                                    Beli Paket Komplit 🚀
                                </Button>

                                <ul className="mt-8 space-y-4 text-sm text-zinc-200">
                                    <li className="flex items-center gap-3">
                                        <div className="rounded-full bg-cyan-500/20 p-1"><Check className="h-3 w-3 text-cyan-400" /></div>
                                        <span className="font-medium">Semua Fitur Indie Hacker</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="rounded-full bg-cyan-500/20 p-1"><Check className="h-3 w-3 text-cyan-400" /></div>
                                        <span className="font-medium">Figma Design System (.fig)</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="rounded-full bg-cyan-500/20 p-1"><Check className="h-3 w-3 text-cyan-400" /></div>
                                        <span className="font-medium">Prioritas Support via Discord</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="rounded-full bg-cyan-500/20 p-1"><Check className="h-3 w-3 text-cyan-400" /></div>
                                        <span className="font-medium">Multi-Project License</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="rounded-full bg-cyan-500/20 p-1"><Check className="h-3 w-3 text-cyan-400" /></div>
                                        <span className="font-medium">Setup Consultation (30 min)</span>
                                    </li>
                                </ul>
                            </div>
                        </RevealOnScroll>

                    </div>

                    {/* Money Back Guarantee (Trust Signal) */}
                    <div className="mt-16 text-center">
                        <p className="text-zinc-500 text-sm">
                            Garansi uang kembali 30 hari jika kode tidak jalan di mesin lokal Anda.
                            <br className="hidden md:block" /> Tidak ada risiko sama sekali.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}