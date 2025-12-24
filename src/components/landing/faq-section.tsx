"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import faqs from "@/features/data/faq";



export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-gray-900 text-white py-24 scroll-mt-8">
            <div className="w-full max-w-6xl mx-auto px-4">

                <div className="mb-12 text-center">
                    <RevealOnScroll width="100%">
                        <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">
                            Pertanyaan Umum
                        </h2>
                        <p className="text-zinc-400">
                            Masih ragu? Berikut jawaban dari pertanyaan yang sering diajukan.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <RevealOnScroll width="100%" key={index} delay={index * 0.1}>
                            <div
                                className={`w-full group rounded-2xl border bg-zinc-900/10 transition-all duration-200 ${openIndex === index ? "border-cyan-500/30 bg-zinc-900/80" : "border-white/5 hover:border-white/10"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <span className={`font-medium transition-colors ${openIndex === index ? "text-cyan-400" : "text-zinc-200"}`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-cyan-400" : ""
                                            }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-0 text-zinc-400 leading-relaxed text-sm md:text-base">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

            </div>
        </section>
    );
}