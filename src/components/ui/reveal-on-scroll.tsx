// components/ui/reveal-on-scroll.tsx
"use client";
import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
}

export const RevealOnScroll = ({ children, width = "fit-content", delay = 0 }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-75px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) { mainControls.start("visible"); }
    }, [isInView, mainControls]);

    const variants: { [key: string]: Variant } = {
        hidden: { opacity: 0, y: 50, scale: 0.98 }, // Sedikit scale biar lebih dramatis
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0], delay: delay },
        },
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div variants={variants} initial="hidden" animate={mainControls}>
                {children}
            </motion.div>
        </div>
    );
};