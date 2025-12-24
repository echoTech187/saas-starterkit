/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    ChevronRight, CreditCard, Building, Wallet, Smartphone
} from "lucide-react";
import {
    Dialog, DialogContent, DialogDescription, DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MidtransSnapProps, SnapResult } from "@/lib/types/midtrans";


export function MidtransSnap({ isOpen, onClose, onResult, orderDetails }: MidtransSnapProps) {
    const [step, setStep] = useState<"method" | "va" | "status">("method");
    const [selectedMethod, setSelectedMethod] = useState("");

    if (!orderDetails) return null;

    // Reset state saat modal ditutup
    const handleClose = () => {
        setStep("method");
        onClose();
    };

    const handleSelectMethod = (method: string) => {
        setSelectedMethod(method);
        setStep("va"); // Langsung ke simulasi bayar
    };

    const handleSimulate = (status: SnapResult) => {
        onResult(status);
        setStep("method");
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-100 p-0 gap-0 text-white  overflow-hidden rounded-xl border-0">
                {/* --- PERBAIKAN ACCESSIBILITY --- */}
                {/* DialogTitle wajib ada untuk Screen Reader. Kita sembunyikan visualnya (sr-only) */}
                <DialogTitle className="sr-only">
                    Payment Gateway Simulation
                </DialogTitle>
                <DialogDescription className="sr-only">
                    Pilih metode pembayaran untuk menyelesaikan transaksi {orderDetails.itemName}
                </DialogDescription>
                {/* ------------------------------- */}
                {/* HEADER SNAP (Mirip Midtrans Asli) */}
                <div className="bg-background border-b border-zinc-200 p-4 flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-2">
                        {/* Logo Dummy Merchant */}
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">NS</div>
                        <div>
                            <div className="font-bold text-sm">NusantaraSaaS</div>
                            <div className="text-xs text-zinc-500">Order ID: {orderDetails.orderId}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-zinc-500">Total</div>
                        <div className="font-bold text-blue-600">{orderDetails.grossAmount}</div>
                    </div>
                </div>

                {/* BODY CONTENT */}
                <div className="p-0 bg-background min-h-100 relative">

                    {/* STEP 1: PILIH METODE */}
                    {step === "method" && (
                        <div className="space-y-1 p-4 payment-methods">
                            <p className="text-xs font-semibold text-zinc-500 uppercase mb-3 px-1">Select Payment Method</p>

                            <PaymentOption icon={Wallet} label="GoPay / QRIS" onClick={() => handleSelectMethod("GoPay")} />
                            <PaymentOption icon={Building} label="BCA Virtual Account" onClick={() => handleSelectMethod("BCA VA")} />
                            <PaymentOption icon={Building} label="Mandiri Bill Payment" onClick={() => handleSelectMethod("Mandiri")} />
                            <PaymentOption icon={CreditCard} label="Credit Card" onClick={() => handleSelectMethod("CC")} />
                            <PaymentOption icon={Smartphone} label="ShopeePay" onClick={() => handleSelectMethod("ShopeePay")} />
                        </div>
                    )}

                    {/* STEP 2: SIMULASI PEMBAYARAN (VA DISPLAY) */}
                    {step === "va" && (
                        <div className="flex flex-col h-full justify-between p-6">
                            <div className="text-center space-y-4 mt-4">
                                <div className="w-16 h-16 bg-zinc-200 rounded-full mx-auto flex items-center justify-center">
                                    {selectedMethod === "GoPay" ? <Wallet className="w-8 h-8 text-blue-600" /> : <Building className="w-8 h-8 text-blue-600" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-800">{selectedMethod}</h3>
                                    <p className="text-sm text-zinc-500">Complete payment for {orderDetails.itemName}</p>
                                </div>

                                {selectedMethod.includes("VA") || selectedMethod.includes("Mandiri") ? (
                                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                                        <p className="text-xs text-yellow-700 mb-1">Virtual Account Number</p>
                                        <p className="text-xl font-mono font-bold text-zinc-800 tracking-wider">8277 0812 3456 7890</p>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-100 p-4 rounded-lg">
                                        <p className="text-sm text-zinc-500">Scan QR Code or proceed to app...</p>
                                    </div>
                                )}
                            </div>

                            {/* SIMULATION CONTROLS (Hanya untuk Demo) */}
                            <div className="space-y-2 pt-8 border-t border-zinc-200 mt-8">
                                <p className="text-[10px] text-center text-zinc-400 uppercase font-bold">--- Midtrans Simulator Controls ---</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button onClick={() => handleSimulate("success")} className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 text-xs">
                                        Simulate Success
                                    </Button>
                                    <Button onClick={() => handleSimulate("pending")} className="bg-amber-500 hover:bg-amber-600 text-white h-8 text-xs">
                                        Simulate Pending
                                    </Button>
                                    <Button onClick={() => handleSimulate("error")} variant="destructive" className="col-span-2 h-8 text-xs">
                                        Simulate Failure
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Helper Component untuk List Item
function PaymentOption({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg transition-all group"
        >
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-zinc-400 group-hover:text-blue-600" />
                <span className="text-sm font-medium text-zinc-700">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-300" />
        </button>
    )
}