"use client";

import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { useState } from "react";
import { MidtransSnap } from "../billing/midtrans-snap";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { SnapResult } from "@/lib/types/midtrans";

const plans = [
    { id: "starter", name: "Starter", price: "$0", period: "/mo", description: "Untuk project hobi dan eksperimen.", features: ["1 Team Member", "3 Projects", "5GB Storage", "Community Support"], current: false },
    { id: "pro", name: "Pro", price: "$29", period: "/mo", description: "Untuk developer professional & tim kecil.", features: ["5 Team Members", "Unlimited Projects", "50GB Storage", "Priority Support", "Advanced Analytics"], current: true, recommended: true },
    { id: "enterprise", name: "Enterprise", price: "$99", period: "/mo", description: "Skala besar dengan keamanan tingkat tinggi.", features: ["Unlimited Members", "Unlimited Projects", "1TB Storage", "24/7 Dedicated Support", "SSO & Audit Logs"], current: false },
];


export function PricingSection() {
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [isSnapOpen, setIsSnapOpen] = useState(false);
    const [snapConfig, setSnapConfig] = useState<{ orderId: string, grossAmount: string, itemName: string } | null>(null);
    const [price, setPrice] = useState<string | null>(null);

    // --- HANDLERS UTAMA ---

    // 1. Handle tombol "Upgrade Plan"
    const handleUpgrade = (planId: string, planName: string, price: string) => {
        setLoadingPlan(planId);
        setPrice(price);

        // Simulasi request token ke backend (delay 1s)
        setTimeout(() => {
            setLoadingPlan(null);

            // Setup config Snap
            setSnapConfig({
                orderId: `ORD-${Date.now()}`,
                grossAmount: price,
                itemName: `Upgrade to ${planName} Plan`
            });

            // Buka Popup
            setIsSnapOpen(true);
        }, 1000);
    };


    const handlePaymentResult = (result: SnapResult) => {
        setIsSnapOpen(false);

        if (result === "success") {
            toast.success("Pembayaran Berhasil!", {
                description: `Paket langganan Anda telah diperbarui.`,
                className: "bg-green-500 text-white"
            });
            // Disini bisa tambahkan logika untuk update state UI paket aktif
        } else if (result === "pending") {
            toast.warning("Pembayaran Pending", {
                description: "Selesaikan pembayaran Anda melalui ATM/Mobile Banking.",
                className: "bg-yellow-500 text-white"
            });
        } else if (result === "error") {
            toast.error("Pembayaran Gagal", {
                description: "Terjadi kesalahan atau transaksi dibatalkan.",
                className: "bg-red-500 text-white"
            });
        }
    };

    return (
        <>
            <section className="bg-black py-24 relative overflow-hidden scroll-mt-8" id="pricing">
                <div className="w-full max-w-6xl mx-auto">
                    {/* Background Gradient Blob (Pemanis) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

                    <div className="w-full max-w-6xl mx-auto px-4 relative z-10">

                        {/* HEADER */}
                        <div className="text-center mb-16 w-full">
                            <RevealOnScroll width="100%">
                                <h2 className="text-3xl font-bold text-white md:text-5xl mb-6">
                                    Investasi Sekali, <br />
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-200 via-cyan-400 to-teal-300">
                                        Untung Berkali-kali.
                                    </span>
                                </h2>
                                <p className="mx-auto max-w-2xl text-zinc-400 text-lg">
                                    Stop bayar langganan bulanan. Dapatkan <em>full source code</em> dan hak milik selamanya.
                                    Kirim invoice ke klien Anda minggu depan.
                                </p>
                            </RevealOnScroll>
                        </div>

                        {/* PRICING GRID (Responsive: 1 col di HP, 2 col di Desktop) */}
                        <RevealOnScroll delay={0.1} width="100%">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {plans.map((plan) => (
                                    <Card key={plan.id} className={`relative flex flex-col bg-zinc-900/50 backdrop-blur-sm border-white/10 transition-all duration-200 ${plan.current ? "border-cyan-500/50 bg-cyan-950/10 shadow-[0_0_20px_rgba(6,182,212,0.1)]" : "hover:border-white/20 hover:-translate-y-1"}`}>
                                        {plan.recommended && (<div className="absolute top-0 right-0 -mt-3 mr-3"><Badge className="bg-linear-to-r from-cyan-500 to-blue-600 border-0">Paling Laris</Badge></div>)}
                                        <CardHeader>
                                            <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                                            <div className="mt-2 text-zinc-400"><span className="text-3xl font-bold text-white tracking-tight">{plan.price}</span><span className="text-sm">{plan.period}</span></div>
                                            <CardDescription className="text-zinc-500 mt-2">{plan.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <ul className="space-y-3">
                                                {plan.features.map((feature, i) => (<li key={i} className="flex items-start text-sm text-zinc-300"><Check className="w-4 h-4 text-cyan-500 mr-2 shrink-0 mt-0.5" />{feature}</li>))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                className={`w-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]`}

                                                // TRIGGER UPGRADE MIDTRANS
                                                onClick={() => handleUpgrade(plan.id, plan.name, plan.price)}
                                            >
                                                {loadingPlan === plan.id ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>) : ("Pilih Paket")}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </RevealOnScroll>
                        {/* Money Back Guarantee (Trust Signal) */}
                        <div className="mt-16 text-center">
                            <p className="text-zinc-500 text-sm">
                                Garansi uang kembali 30 hari jika kode tidak jalan di mesin lokal Anda.
                                <br className="hidden md:block" /> Tidak ada risiko sama sekali.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <MidtransSnap
                isOpen={isSnapOpen}
                onClose={() => setIsSnapOpen(false)}
                onResult={handlePaymentResult}
                orderDetails={snapConfig}
            />
        </>
    );
}