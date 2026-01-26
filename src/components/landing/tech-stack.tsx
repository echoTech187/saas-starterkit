"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { tech_stack } from "@/features/data/tech-stack";

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
                            unoptimized
                            loading="eager"
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
                                {tech_stack.map((tech, index) => (
                                    <TechCard key={`tech-1-${index}`} {...tech} />
                                ))}

                                {/* Render Set Kedua (Duplikat untuk Seamless Loop) */}
                                {tech_stack.map((tech, index) => (
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