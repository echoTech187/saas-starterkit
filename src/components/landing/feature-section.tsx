
import { RevealOnScroll } from "../ui/reveal-on-scroll";
import { FeatureCard } from "./feature-card";
import HeaderCard from "./header-card";
import Image from "next/image";

export default function FeaturesSection() {
    return (
        <section id="features" className="relative h-full bg-gray-900 text-zinc-500 py-32 max-xl:px-6 scroll-mt-8">
            <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 ">
                <RevealOnScroll delay={0.2} width="100%">
                    <Image src={"/src/images/features/round-neon.png"} unoptimized loading="eager" alt="login illustration" width={2048} height={959} className="w-full mx-auto h-auto opacity-10 bg-blend-screen bg-cover bg-no-repeat bg-center bg-fixed" />
                </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0.1} width="100%">
                <HeaderCard title="Fondasi Kokoh untuk Skala Besar" subtitle="Semua boring stuff sudah kami kerjakan. Fokus pada ide bisnis Anda." className="text-white" />
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl gap-12 mx-auto mt-16">
                <RevealOnScroll delay={0.3} width="100%">
                    <FeatureCard
                        title="Arsitektur B2B Multi-Tenant"
                        description="Jangan bangun dari nol. Sistem kami sudah siap menangani ribuan organisasi dan tim dengan isolasi data yang sempurna. Skalakan bisnis Anda ke level enterprise tanpa pusing memikirkan struktur database."
                        icon="/src/images/features/neon-users.png"
                        className="max-lg:text-center"
                    />
                </RevealOnScroll>
                <RevealOnScroll delay={0.4} width="100%">
                    <FeatureCard
                        title="Autentikasi Sekuritas Tinggi"
                        description="Tidur nyenyak mengetahui data user Anda aman. Implementasi standar industri terkini, lengkap dengan Social Login (Google, GitHub) yang siap pakai. Lupakan kerumitan mengelola sesi dan password."
                        icon="/src/images/features/lock-neon.png"
                        className="max-lg:text-center"
                    />
                </RevealOnScroll>
                <RevealOnScroll delay={0.5} width="100%">
                    <FeatureCard
                        title="Integrasi Midtrans Siap Pakai"
                        description="Monetisasi instan di pasar Indonesia. Terima pembayaran via QRIS, Virtual Account, dan Kartu Kredit tanpa pusing menangani webhook yang rumit. Fokus pada produk, biarkan uang mengalir."
                        icon="/src/images/features/card-neon.png"
                        className="max-lg:text-center"
                    />
                </RevealOnScroll>
                <RevealOnScroll delay={0.6} width="100%">
                    <FeatureCard
                        title="Performa Ekstrem Next.js 15"
                        description="Dibangun di atas fondasi App Router terbaru yang modern. Nikmati waktu loading secepat kilat, SEO yang optimal, dan pengalaman pengguna yang mulus. Buat kompetitor Anda terasa lambat."
                        icon="/src/images/features/jet-neon.png"
                        className="max-lg:text-center"
                    />
                </RevealOnScroll>
            </div>
        </section >
    )
}