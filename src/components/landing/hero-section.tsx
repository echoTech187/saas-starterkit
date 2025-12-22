"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { useRouter } from "next/navigation";

export function HeroSection() {
    const router = useRouter();

    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }

    const goToDashboard = () => {
        router.push("/dashboard");
    };

    return (
        // Tambahkan ID hero disini
        <section id="hero" className="max-lg:px-6 w-full h-fit relative overflow-hidden max-md:max-h-170 md:max-h-180 max-md:overflow-hidden xl:max-h-screen bg-gray-900 text-white dark:bg-black m-auto py-12 scroll-mt-24">

            {/* ... (Code Image Background Tetap) ... */}

            <RevealOnScroll delay={0} width="100%">
                <div className="flex justify-center">
                    {/* ... (Badge Rocket Tetap) ... */}
                    <div className="z-10 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 mx-4 px-4 py-1.5 max-md:text-xs text-sm font-medium text-purple-300 mb-8 backdrop-blur-sm">
                        <Rocket className="h-4 w-4" />
                        <span>Rilis v1.0: Next.js 15 Starter Kit</span>
                    </div>
                </div>
            </RevealOnScroll>

            {/* ... (Typography Tetap) ... */}
            <RevealOnScroll delay={0.1} width="100%">
                <h1 className="z-10 mx-auto w-full max-w-4xl font-extrabold tracking-tight text-4xl md:text-6xl text-center xl:text-6xl leading-[1.1]">
                    Kirim SaaS Anda ke Pasar dalam{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 via-cyan-400 to-teal-300">
                        Hitungan Hari.
                    </span>
                </h1>
            </RevealOnScroll>

            {/* ... (Description Tetap) ... */}
            <RevealOnScroll delay={0.2} width="100%">
                <p className="w-full z-10 mx-auto mt-8 max-w-3xl max-md:text-base md:text-xl text-muted text-xl leading-relaxed text-center">
                    Jangan habiskan waktu berbulan-bulan untuk setup. Dapatkan fondasi
                    Next.js lengkap dengan Autentikasi, Multi-Tenancy, dan{" "}
                    <strong className="text-white">Midtrans Payment</strong> siap pakai. Fokus pada ide bisnis Anda.
                </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3} width="100%">
                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center px-4 md:px-0">
                    {/* BUTTON ACTIONS */}
                    <Button onClick={scrollToPricing} size="lg" className="h-12 md:h-16 w-full sm:w-auto px-8 md:px-12 lg:px-8 text-base rounded-full bg-white text-black hover:bg-zinc-200 cursor-pointer">
                        Beli Starter Kit - $49
                    </Button>
                    <Button onClick={goToDashboard} size="lg" variant="outline" className="h-12 md:h-16 w-full sm:w-auto px-8 md:px-12! lg:px-8 text-base rounded-full text-center bg-linear-to-r from-cyan-500 to-blue-600 border-0 text-white transition-all duration-300 font-bold shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] cursor-pointer group">
                        Lihat Demo Live
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </RevealOnScroll>

            {/* ... (Image Dashboard Preview Tetap) ... */}
            <div className="max-md:hidden mt-12 mx-auto w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex justify-center items-center">
                <RevealOnScroll delay={0.1} width="100%">
                    <Image src="/src/images/illustration/dashboard-preview.png" width={1024} height={768} alt="dashboard preview" unoptimized loading="eager" className="w-full object-cover max-auto rounded-2xl shadow-xl border border-white/10" />
                </RevealOnScroll>
            </div>

        </section>
    );
}