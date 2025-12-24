import { cn } from "@/lib/utils";
import IconImage from "./icon";
import { FeatureCardProps } from "@/lib/types/features";



export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300",
                "bg-transparent border-white/10 hover:bg-transparent border-2 backdrop-blur-xl",
                "hover:border-teal-200/50",
                "hover:shadow-[inset_0_0_40px_-10px_rgba(6,182,212,0.3)]",
                "flex flex-col items-center justify-center gap-4",
                className
            )}
        >
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-50" />


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
            <div className="relative z-10">
                <p className="leading-relaxed text-zinc-300 group-hover:text-zinc-100">
                    {description}
                </p>
            </div>
        </div>
    );
}