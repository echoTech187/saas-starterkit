import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // Pastikan punya utility cn (bawaan shadcn)
import IconImage from "./icon";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon | string;
    className?: string;
}

export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
    return (
        <div
            className={cn(
                // --- BASE STYLES ---
                "group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300",

                // --- COLORS & GLASS EFFECT (State Awal) ---
                // Background hitam transparan, border abu-abu tipis
                "bg-transparent border-white/10 hover:bg-transparent border-2 backdrop-blur-xl",

                // --- NEON GLOW EFFECT (State Hover) ---
                // Saat di-hover: Border jadi Cyan, dan muncul Shadow Cyan (Glow)
                "hover:border-teal-200/50",
                "hover:shadow-[inset_0_0_40px_-10px_rgba(6,182,212,0.3)]", // Custom shadow warna cyan

                // --- POSISI ---
                "flex flex-col items-center justify-center gap-4",
                className
            )}
        >
            {/* Efek Gradient Halus di dalam kartu (Opsional, buat depth) */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-50" />

            {/* --- IKON CONTAINER --- */}
            <div className="relative rounded-2xl transition-all duration-300 flex max-lg:flex-col items-center justify-start gap-4">
                {
                    typeof Icon === 'string' ? (
                        <IconImage src={Icon} className="h-auto w-42 text-zinc-400 transition-colors duration-300 group-hover:text-cyan-400" />
                    ) : (
                        <Icon className="h-6 w-6 text-zinc-400 transition-colors duration-300 group-hover:text-cyan-400" />
                    )
                }
                <h3 className="mb-2 text-3xl font-bold text-white transition-colors group-hover:text-cyan-100">
                    {title}
                </h3>
            </div>

            {/* --- TEXT CONTENT --- */}
            <div className="relative z-10">

                <p className="leading-relaxed text-zinc-300 group-hover:text-zinc-100">
                    {description}
                </p>
            </div>
        </div>
    );
}