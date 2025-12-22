"use client";

import { useState } from "react";
import { toast } from "sonner";

export type Invoice = {
    id: string;
    date: string;
    amount: string;
    status: "Paid" | "Pending" | "Failed";
    items?: { description: string; amount: string }[]; // <-- Tambahan: Rincian Item
};

const initialInvoices: Invoice[] = [
    {
        id: "INV-001",
        date: "Oct 22, 2024",
        amount: "$29.00",
        status: "Paid",
        items: [
            { description: "Pro Plan - Monthly Subscription", amount: "$29.00" },
            { description: "Tax (VAT 0%)", amount: "$0.00" }
        ]
    },
    {
        id: "INV-002",
        date: "Sep 22, 2024",
        amount: "$29.00",
        status: "Paid",
        items: [
            { description: "Pro Plan - Monthly Subscription", amount: "$29.00" }
        ]
    },
];

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