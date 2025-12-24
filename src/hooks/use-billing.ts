"use client";

import initialInvoices from "@/features/data/invoices";
import { Invoice } from "@/lib/types/invoices";
import { useState } from "react";
import { toast } from "sonner";

export function useBilling() {
    const [invoices] = useState<Invoice[]>(initialInvoices);
    const [plan] = useState("Pro Plan");
    const [isLoading, setIsLoading] = useState(false);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

    // --- STATE MODAL DETAIL ---
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    const handleDownloadInvoice = (id: string) => {
        setIsLoading(true);
        setTimeout(() => {
            toast.success(`Downloaded invoice ${id}`);
            setIsLoading(false);
        }, 1000);
    };

    const handleUpgradePlan = () => {
        setIsUpgradeOpen(true);
    };

    const handleUpgradeClick = () => {
        setIsUpgradeOpen(true);
    };
    // Function Buka Modal
    const handleViewInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsDetailOpen(true);
    }
    const handleCheckout = (planName: string, cycle: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsUpgradeOpen(false);
            // Di sini nanti panggil API backend buat dapat Snap Token Midtrans
            toast.success(`Pembayaran berhasil: ${planName} (${cycle})...`);
        }, 2000);
    };

    return {
        invoices,
        plan,
        isLoading,
        isDetailOpen,
        setIsDetailOpen,
        selectedInvoice,
        handleDownloadInvoice,
        handleUpgradePlan,
        handleViewInvoice, // <-- Export function ini
        isUpgradeOpen,
        setIsUpgradeOpen,
        handleUpgradeClick,
        handleCheckout
    };
}