
export default function HeaderCard({ title, subtitle, className }: { title: string, subtitle?: string, className?: string }) {
    return (
        <div className={`w-full mx-auto max-w-3xl text-center mb-12 lg:mb-16 scroll-mt-32 ${className}`}>
            <h2 className="text-4xl font-bold leading-tight tracking-tighter mb-2 font-display sm:text-4xl md:text-5xl">
                {title}
            </h2>
            {
                subtitle && (
                    <p className="text-lg text-white/80 mb-8 font-medium">{subtitle}</p>
                )
            }
        </div>
    );
}