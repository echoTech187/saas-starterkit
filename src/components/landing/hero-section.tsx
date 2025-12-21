"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
// Import komponen animasi pembungkus kita
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function HeroSection() {
    return (
        <section className="max-lg:px-6 w-full relative overflow-hidden max-md:h-170 md:h-180 max-md:overflow-hidden xl:h-screen bg-gray-800 text-white dark:bg-black m-auto py-12">

            <div className="absolute bottom-0 left-0 right-0 w-full h-1/3 z-2 max-lg:hidden">
                <RevealOnScroll delay={0.8} width="100%">
                    <Image src={"/src/images/illustration/neon-wave.png"} unoptimized loading="eager" alt="login illustration" width={2048} height={959} className="w-full mx-auto h-auto opacity-20 bg-blend-screen bg-cover bg-no-repeat bg-center bg-fixed" />
                </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0} width="100%">
                <div className="flex justify-center">
                    <div className="z-10 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 mx-4 px-4 py-1.5 max-md:text-xs text-sm font-medium text-purple-300 mb-8 backdrop-blur-sm">
                        <Rocket className="h-4 w-4" />
                        <span>Rilis v1.0: Next.js 15 Starter Kit</span>
                    </div>
                </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1} width="100%">
                <h1 className="z-10 mx-auto w-full max-w-4xl font-extrabold tracking-tight text-3xl md:text-6xl text-center xl:text-6xl leading-[1.1]">
                    Kirim SaaS Anda ke Pasar dalam{" "}
                    {/* Teks bergradasi biar makin cyberpunk */}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 via-cyan-400 to-teal-300">
                        Hitungan Hari.
                    </span>
                </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2} width="100%">
                <p className="w-full z-10 mx-auto mt-8 max-w-3xl max-md:text-lg md:text-xl text-muted text-xl leading-relaxed text-center">
                    Jangan habiskan waktu berbulan-bulan untuk setup. Dapatkan fondasi
                    Next.js lengkap dengan Autentikasi, Multi-Tenancy, dan{" "}
                    <strong className="text-white">Midtrans Payment</strong> siap pakai. Fokus pada ide bisnis Anda.
                </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3} width="100%">
                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center px-4 md:px-0">
                    <Button size="lg" className="h-12 md:h-16 w-full sm:w-auto px-8 md:px-12 lg:px-8 text-base rounded-full bg-white text-black hover:bg-zinc-200">
                        Beli Starter Kit - $49
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 md:h-16 w-full sm:w-auto px-8 md:px-12! lg:px-8 text-base rounded-full border-zinc-800 text-black hover:bg-zinc-900 hover:text-white">
                        Lihat Demo Live
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </RevealOnScroll>
            <div className="md:mt-12 max-md:px-6 z-1 max-md:absolute max-md:-bottom-26 md:-bottom-68  max-lg:left-0 max-lg:right-0 mx-auto w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex justify-center items-center">
                <RevealOnScroll delay={0.1} width="100%">
                    <Image src="/src/images/illustration/dashboard-preview.png" width={1024} height={768} alt="login illustration" unoptimized loading="eager" className="container max-auto" />
                </RevealOnScroll>
            </div>

        </section>
    );
}