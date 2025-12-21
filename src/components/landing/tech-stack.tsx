"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { Database, Lock, Server, CreditCard } from "lucide-react";

// --- 1. DATA TECH STACK (Dipisah biar rapi dan mudah diduplikasi untuk marquee) ---
const TECH_STACK_DATA = [
    {
        name: "Next.js 15",
        colorClass: "hover:border-white/50 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]",
        icon: (
            <svg viewBox="0 0 180 180" fill="none" className="w-12 h-12 fill-current"><mask id="mask0_408_134" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black" /></mask><g mask="url(#mask0_408_134)"><circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" /><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" /><rect x="115" y="54" width="12" height="72" fill="white" /></g></svg>
        ),
    },
    {
        name: "React",
        colorClass: "hover:border-blue-400/50 hover:shadow-[0_0_20px_-5px_rgba(96,165,250,0.3)]",
        icon: (
            <svg viewBox="-10.5 -9.45 21 18.9" fill="none" className="w-12 h-12 text-blue-400 fill-current"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
        ),
    },
    {
        name: "TypeScript",
        colorClass: "hover:border-blue-600/50 hover:shadow-[0_0_20px_-5px_rgba(37,99,235,0.3)]",
        icon: (
            <svg viewBox="0 0 128 128" className="w-12 h-12"><path fill="#007ACC" d="M0 0h128v128H0z" /><path fill="#FFF" d="M71.4 78.3c1.3-2.6 3.1-4.7 5.4-6.4 2.3-1.6 5.1-2.4 8.5-2.4 4.5 0 8.1 1.5 10.9 4.6 2.8 3 4.1 7.4 4.1 13 0 3.3-.5 6.2-1.4 8.6s-2.3 4.5-4.1 6.1c-1.8 1.6-4 2.8-6.6 3.6-2.6.8-5.4 1.2-8.5 1.2-2.8 0-5.3-.3-7.5-1-2.2-.7-4.1-1.6-5.6-2.9-1.5-1.3-2.8-2.8-3.7-4.7-1-1.8-1.5-3.9-1.6-6.4h11.9c.1 1.6.6 2.8 1.5 3.7.9.8 2.3 1.3 4.1 1.3 1.9 0 3.3-.5 4.1-1.4.8-1 1.3-2.4 1.3-4.4 0-1.8-.4-3.1-1.3-4-.9-.8-2.3-1.3-4.2-1.3-1.8 0-3.3.4-4.5 1.3-1.2.9-2.1 2.3-2.8 4.3H60.1c1.2-4.9 3.5-8.8 6.9-11.6 3.4-2.8 7.8-4.2 13.3-4.2 4.4 0 7.9 1 10.4 3s3.8 4.9 3.8 8.6c0 1.9-.4 3.5-1.2 4.9-.8 1.4-1.9 2.5-3.3 3.4-1.4.9-3 1.5-4.8 1.9-1.8.4-3.6.6-5.5.6H71.4zm-14-6.7V105H43.9V71.6H31.7V60h37.4v11.6H57.4z" /></svg>
        ),
    },
    {
        name: "Tailwind CSS",
        colorClass: "hover:border-cyan-400/50 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]",
        icon: (
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-cyan-400 fill-current"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /></svg>
        ),
    },
    {
        name: "Prisma ORM",
        icon: <Database className="w-10 h-10" />,
        colorClass: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:text-emerald-400",
    },
    {
        name: "NextAuth.js",
        icon: <Lock className="w-10 h-10" />,
        colorClass: "hover:border-purple-500/50 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] hover:text-purple-400",
    },
    {
        name: "Midtrans",
        icon: <CreditCard className="w-10 h-10" />,
        colorClass: "hover:border-indigo-500/50 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] hover:text-indigo-400",
    },
    {
        name: "Docker Ready",
        icon: <Server className="w-10 h-10" />,
        colorClass: "hover:border-sky-500/50 hover:shadow-[0_0_20px_-5px_rgba(14,165,233,0.3)] hover:text-sky-400",
    },
];

// --- KOMPONEN KARTU TECH (Reusable) ---
const TechCard = ({ name, icon, colorClass }: { name: string; icon: React.ReactNode; colorClass: string }) => (
    <div
        // Tambahkan min-w-max agar kartu tidak menyusut saat di dalam flex container
        className={`group flex min-w-max items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 md:p-4 transition-all duration-300 hover:bg-white/10 ${colorClass}`}
    >
        <div className="flex h-12 w-12 md:h-18 md:w-18 shrink-0 items-center justify-center rounded-lg bg-black/50 text-zinc-400 transition-colors duration-300 group-hover:text-white">
            {icon}
        </div>
        <span className="font-semibold text-sm md:text-base text-zinc-400 transition-colors duration-300 group-hover:text-white">
            {name}
        </span>
    </div>
);

export function TechStackSection() {
    return (
        // Gunakan w-full dan overflow-hidden di section agar marquee tidak bocor
        <section className="bg-black py-24 w-full overflow-hidden">
            <div className="w-full max-w-6xl mx-auto">
                <div className="container mx-auto px-4 mb-12">
                    {/* HEADER */}
                    <div className="text-center w-full">
                        <RevealOnScroll width="100%">
                            <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">
                                Ditenagai Teknologi <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-200 via-cyan-400 to-teal-300">
                                    Kelas Dunia.
                                </span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-zinc-400">
                                Foundation solid tanpa *legacy code*. Stack modern untuk performa, keamanan, dan skalabilitas maksimal.
                            </p>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* CONTENT WRAPPER */}
                <div className="relative flex flex-col items-center">

                    {/* 1. CENTER IMAGE (FLOATING ANIMATION) */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }} // Gerakan naik turun sedikit lebih halus
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 mb-16 w-full max-w-70 md:max-w-95"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-cyan-500/30 blur-[60px] rounded-full opacity-40 animate-pulse" />

                        <Image
                            src="/src/images/illustration/database-neon.png" // PASTIIN PATH GAMBAR ISOMETRIK BENAR
                            alt="Core Engine"
                            width={500}
                            height={500}
                            className="relative z-10 w-full h-auto mix-blend-mode-screen object-contain"
                        />
                    </motion.div>

                    {/* --- 2. MARQUEE INFINITE SCROLL --- */}
                    <RevealOnScroll width="100%" delay={0.3}>

                        {/* Container Marquee dengan Masking Gradient di Kiri Kanan */}
                        <div className="relative w-full max-w-full overflow-hidden py-4">
                            {/* Gradient Fade Left */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-black to-transparent z-20"></div>
                            {/* Gradient Fade Right */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-black to-transparent z-20"></div>

                            {/* Track yang Bergerak */}
                            <motion.div
                                className="flex gap-4 md:gap-6 w-max"
                                // Animasi dari X:0 ke X:-50%. Karena kita menduplikasi konten,
                                // saat mencapai -50%, set kedua akan berada di posisi awal set pertama, menciptakan loop halus.
                                animate={{ x: "-50%" }}
                                initial={{ x: 0 }}
                                transition={{
                                    ease: "linear",
                                    duration: 30, // Kecepatan scroll (makin kecil makin ngebut)
                                    repeat: Infinity,
                                }}
                            >
                                {/* Render Set Pertama */}
                                {TECH_STACK_DATA.map((tech, index) => (
                                    <TechCard key={`tech-1-${index}`} {...tech} />
                                ))}

                                {/* Render Set Kedua (Duplikat untuk Seamless Loop) */}
                                {TECH_STACK_DATA.map((tech, index) => (
                                    <TechCard key={`tech-2-${index}`} {...tech} />
                                ))}
                            </motion.div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}