"use client";

import Image from "next/image";
import { CheckCircle2, XCircle } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function ProblemSolutionSection() {
    return (
        <section className="bg-gray-950 py-24 md:py-32 overflow-hidden max-lg:px-6">
            <div className="container mx-auto px-4 space-y-32 w-full max-w-6xl">

                {/* --- PART 1: THE PROBLEM (Text Left, Image Right) --- */}
                <div id="problem" className="grid items-center gap-12 md:grid-cols-2 lg:gap-24 max-lg:grid-reverse scroll-mt-8">

                    {/* Kolom Teks */}
                    <RevealOnScroll>
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400 border border-red-500/20">
                                <XCircle className="h-4 w-4" />
                                <span>The Pain Point</span>
                            </div>

                            <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                                Masalah Klasik: <br />
                                <span className="text-red-500">Terjebak di Fase Setup.</span>
                            </h2>

                            <p className="text-lg text-zinc-400 leading-relaxed">
                                Anda punya ide brilian, tapi realitanya? 2 bulan pertama habis hanya untuk konfigurasi Docker,
                                <em>fighting</em> dengan Auth, dan debugging webhook pembayaran. Semangat habis, ide pun layu sebelum sempat rilis.
                            </p>

                            <ul className="space-y-3 mt-4">
                                {[
                                    "Konfigurasi Nginx & SSL yang bikin pusing.",
                                    "Database schema yang berantakan dan sulit di-scale.",
                                    "Integrasi Payment Gateway yang dokumentasinya ribet."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                                        <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-500/50" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </RevealOnScroll>

                    {/* Kolom Gambar (Problem) */}
                    <RevealOnScroll delay={0.2}>
                        <div className="relative aspect-square w-full max-w-2xl mx-auto md:max-w-none  flex items-end">
                            {/* Efek Glow Merah samar di belakang */}
                            <div className="absolute inset-0  blur-[100px] rounded-full opacity-50" />

                            <Image
                                src="/src/images/illustration/face-neon.png" // GANTI DENGAN GAMBAR KEPALA RUWET (Black BG)
                                alt="Chaos of Development"
                                width={600}
                                height={600}
                                unoptimized
                                loading="eager"
                                className="relative z-10 w-full h-auto object-contain"
                            />
                        </div>
                    </RevealOnScroll>

                </div>

                {/* --- PART 2: THE SOLUTION (Image Left, Text Right) --- */}
                <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-24">

                    {/* Kolom Gambar (Solution) - Order pertama di mobile, order pertama di desktop */}
                    {/* Kita gunakan 'order-last md:order-first' supaya di mobile gambar ada di bawah teks, atau biarkan default */}
                    <RevealOnScroll delay={0.2}>
                        <div className="relative aspect-square w-full max-w-2xl mx-auto md:max-w-none order-last md:order-first flex items-end">
                            {/* Efek Glow Biru/Cyan samar di belakang */}
                            <div className="absolute inset-0  blur-[100px] rounded-full opacity-50" />

                            <Image
                                src="/src/images/illustration/server-neon.png" // GANTI DENGAN GAMBAR CORE SERVER (Black BG)
                                alt="Structured Solution"
                                width={600}
                                height={600}
                                unoptimized
                                loading="eager"
                                className="relative z-10 w-full h-auto object-contain"
                            />
                        </div>
                    </RevealOnScroll>

                    {/* Kolom Teks */}
                    <RevealOnScroll>
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400 border border-cyan-500/20">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>The Solution</span>
                            </div>

                            <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                                Jalan Tol Menuju <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-200 via-cyan-400 to-teal-300">
                                    MVP Siap Jual.
                                </span>
                            </h2>

                            <p className="text-lg text-zinc-400 leading-relaxed">
                                Lewati 200+ jam kerja sia-sia. NusantaraSaaS memberikan arsitektur standar industri yang sudah teruji.
                                Tinggal <em>clone</em>, config sedikit, dan Anda siap fokus pada fitur unik yang menghasilkan uang.
                            </p>

                            <ul className="space-y-3 mt-4">
                                {[
                                    "Struktur Modular yang rapi dan mudah di-scale.",
                                    "Type-safe dari ujung ke ujung (End-to-end TypeScript).",
                                    "UI Component (Shadcn) yang gampang dikustomisasi."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </RevealOnScroll>

                </div>

            </div>
        </section>
    );
}