"use client";

import { useState } from "react";
import {
    CreditCard, Check, Zap, Download, Clock, AlertTriangle,
    HardDrive, Layout, Loader2, MoreHorizontal, Eye, FileText
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle
} from "@/components/ui/sheet";
import { toast } from "sonner";

// Import Komponen Simulasi Midtrans
import { MidtransSnap, SnapResult } from "@/components/billing/midtrans-snap";

// ... (DUMMY DATA: 'plans' dan 'invoices' biarkan sama seperti sebelumnya) ...
const plans = [
    { id: "starter", name: "Starter", price: "$0", period: "/mo", description: "Untuk project hobi dan eksperimen.", features: ["1 Team Member", "3 Projects", "5GB Storage", "Community Support"], current: false },
    { id: "pro", name: "Pro", price: "$29", period: "/mo", description: "Untuk developer professional & tim kecil.", features: ["5 Team Members", "Unlimited Projects", "50GB Storage", "Priority Support", "Advanced Analytics"], current: true, recommended: true },
    { id: "enterprise", name: "Enterprise", price: "$99", period: "/mo", description: "Skala besar dengan keamanan tingkat tinggi.", features: ["Unlimited Members", "Unlimited Projects", "1TB Storage", "24/7 Dedicated Support", "SSO & Audit Logs"], current: false },
];

const initialInvoices = [
    { id: "INV-001", date: "Oct 22, 2024", amount: "$29.00", status: "Paid", items: [{ desc: "Pro Plan (Monthly)", qty: 1, price: "$29.00" }], subtotal: "$29.00", tax: "$0.00", total: "$29.00" },
    { id: "INV-002", date: "Sep 22, 2024", amount: "$29.00", status: "Paid", items: [{ desc: "Pro Plan (Monthly)", qty: 1, price: "$29.00" }], subtotal: "$29.00", tax: "$0.00", total: "$29.00" },
    { id: "INV-003", date: "Aug 22, 2024", amount: "$29.00", status: "Failed", items: [{ desc: "Pro Plan (Monthly)", qty: 1, price: "$29.00" }], subtotal: "$29.00", tax: "$0.00", total: "$29.00" },
    { id: "INV-004", date: "Jul 22, 2024", amount: "$29.00", status: "Paid", items: [{ desc: "Pro Plan (Monthly)", qty: 1, price: "$29.00" }], subtotal: "$29.00", tax: "$0.00", total: "$29.00" },
];

export default function BillingPage() {
    const [invoices, setInvoices] = useState(initialInvoices);
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    // State Sheet Invoice
    const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null);
    const [isInvoiceSheetOpen, setIsInvoiceSheetOpen] = useState(false);

    // State Midtrans Snap
    const [isSnapOpen, setIsSnapOpen] = useState(false);
    const [snapConfig, setSnapConfig] = useState<{ orderId: string, grossAmount: string, itemName: string } | null>(null);

    // --- HANDLERS UTAMA ---

    // 1. Handle tombol "Upgrade Plan"
    const handleUpgrade = (planId: string, planName: string, price: string) => {
        setLoadingPlan(planId);

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

    // 2. Handle tombol "Update Payment"
    const handleUpdatePayment = () => {
        setSnapConfig({
            orderId: `VERIFY-${Date.now()}`,
            grossAmount: `$${invoices[0]?.amount.replace("$", "") || "0".replace("$", "")}`,
            itemName: "Card Verification"
        });
        setIsSnapOpen(true);
    };

    // 3. Callback saat user selesai simulasi di Midtrans
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

    // ... (Handler Download & View Invoice lainnya tetap sama) ...
    const handleDownloadInvoice = (invoiceId: string) => {
        toast.info(`Mengunduh invoice ${invoiceId}...`);
        setTimeout(() => toast.success("Invoice berhasil diunduh (PDF)"), 1500);
    };

    const handleDownloadAll = () => {
        toast.info("Memproses semua invoice...");
        setTimeout(() => toast.success("Semua invoice berhasil diunduh (ZIP)"), 2000);
    };

    const handleViewInvoice = (invoice: typeof invoices[0]) => {
        setSelectedInvoice(invoice);
        setIsInvoiceSheetOpen(true);
    };

    const getStatusBadge = (status: string) => {
        // (Kode getStatusBadge sama seperti sebelumnya...)
        switch (status) {
            case "Paid": return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"><Check className="w-3 h-3 mr-1" /> Paid</Badge>;
            case "Pending": return <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
            case "Failed": return <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20"><AlertTriangle className="w-3 h-3 mr-1" /> Failed</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8 pb-20">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Billing & Subscription</h1>
                <p className="text-zinc-400 mt-2">Kelola paket langganan, metode pembayaran, dan riwayat tagihan.</p>
            </div>

            {/* --- SECTION 1: CURRENT PLAN --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] -z-10" />
                    <CardHeader>
                        <CardTitle className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Current Plan</CardTitle>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold text-white">Pro Plan</span>
                            <span className="text-zinc-500">${invoices[0]?.amount.replace("$", "") || "0".replace("$", "")}/month</span>
                        </div>
                        <CardDescription className="mt-1 text-zinc-400">
                            Tagihan berikutnya pada <span className="text-cyan-400">22 November 2024</span>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-black/40 border border-white/5">
                            <div className="p-2 bg-white/5 rounded text-zinc-300">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-white">Visa ending in 4242</div>
                                <div className="text-xs text-zinc-500">Expiry 12/28</div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30"
                                onClick={handleUpdatePayment} // Menggunakan handler Midtrans
                            >
                                Update
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Card Resource Usage (Sama seperti sebelumnya) */}
                <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-md">
                    {/* ... Isi card resource usage sama ... */}
                    <CardHeader>
                        <CardTitle className="text-zinc-400 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" /> Resource Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-white flex items-center gap-2"><Layout className="w-4 h-4 text-zinc-500" /> Active Projects</span><span className="text-zinc-400">8 / <span className="text-white">Unlimited</span></span></div>
                            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                <div className="h-full w-[20%] rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-white flex items-center gap-2"><HardDrive className="w-4 h-4 text-zinc-500" /> Storage Used</span><span className="text-zinc-400">12.5 GB / <span className="text-white">50 GB</span></span></div>
                            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                <div className="h-full w-[25%] rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Separator className="bg-white/10" />

            {/* --- SECTION 2: PLANS GRID --- */}
            <div>
                <h2 className="text-xl font-bold text-white mb-6">Available Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <Card key={plan.id} className={`relative flex flex-col bg-zinc-900/50 backdrop-blur-sm border-white/10 transition-all duration-200 ${plan.current ? "border-cyan-500/50 bg-cyan-950/10 shadow-[0_0_20px_rgba(6,182,212,0.1)]" : "hover:border-white/20 hover:-translate-y-1"}`}>
                            {plan.recommended && (<div className="absolute top-0 right-0 -mt-3 mr-3"><Badge className="bg-linear-to-r from-cyan-500 to-blue-600 border-0">Recommended</Badge></div>)}
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
                                    className={`w-full ${plan.current ? "bg-white/5 text-zinc-400 cursor-default hover:bg-white/5 border border-white/5" : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]"}`}
                                    disabled={plan.current || loadingPlan === plan.id}
                                    // TRIGGER UPGRADE MIDTRANS
                                    onClick={() => !plan.current && handleUpgrade(plan.id, plan.name, plan.price)}
                                >
                                    {loadingPlan === plan.id ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>) : plan.current ? ("Current Plan") : ("Upgrade Plan")}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator className="bg-white/10" />

            {/* --- SECTION 3: BILLING HISTORY --- */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Billing History</h2>
                    <Button variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5" onClick={handleDownloadAll}>
                        <Download className="w-4 h-4 mr-2" /> Download All
                    </Button>
                </div>

                <Card className="bg-zinc-900/50 border-white/10 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-black/20">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-zinc-400">Invoice ID</TableHead>
                                <TableHead className="text-zinc-400">Date</TableHead>
                                <TableHead className="text-zinc-400">Amount</TableHead>
                                <TableHead className="text-zinc-400">Status</TableHead>
                                <TableHead className="text-right text-zinc-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((inv) => (
                                <TableRow key={inv.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell className="font-mono text-zinc-300">{inv.id}</TableCell>
                                    <TableCell className="text-zinc-300">{inv.date}</TableCell>
                                    <TableCell className="text-white font-medium">{inv.amount}</TableCell>
                                    <TableCell>{getStatusBadge(inv.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-zinc-300">
                                                <DropdownMenuLabel>Invoice Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleViewInvoice(inv)} className="cursor-pointer focus:text-white focus:bg-white/10"><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem onClick={() => handleDownloadInvoice(inv.id)} className="cursor-pointer focus:text-white focus:bg-white/10"><Download className="mr-2 h-4 w-4" /> Download PDF</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* --- INVOICE DETAIL SHEET --- */}
            <Sheet open={isInvoiceSheetOpen} onOpenChange={setIsInvoiceSheetOpen}>
                <SheetContent className="bg-zinc-950 border-l border-white/10 text-white w-full sm:w-125 px-6">
                    {selectedInvoice && (
                        <>
                            <SheetHeader className="mb-6 px-0 py-6"><SheetTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-cyan-500" /> Invoice Details</SheetTitle><SheetDescription className="text-zinc-400">Rincian transaksi untuk {selectedInvoice.id}</SheetDescription></SheetHeader>
                            {/* ... (Konten Sheet Invoice sama seperti sebelumnya) ... */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="space-y-1"><div className="text-xs text-zinc-500 uppercase tracking-wider">Status</div><div>{getStatusBadge(selectedInvoice.status)}</div></div>
                                    <div className="text-right space-y-1"><div className="text-xs text-zinc-500 uppercase tracking-wider">Date</div><div className="text-sm font-medium">{selectedInvoice.date}</div></div>
                                </div>
                                <div className="space-y-2"><h3 className="text-sm font-medium text-zinc-300">Billed To</h3><div className="text-sm text-zinc-400 bg-black/40 p-3 rounded border border-white/5"><div className="text-white font-medium">Developer User</div><div>user@example.com</div><div>Jakarta, Indonesia</div></div></div>
                                <div className="space-y-2"><h3 className="text-sm font-medium text-zinc-300">Items</h3><div className="rounded-md border border-white/10 overflow-hidden"><table className="w-full text-sm"><thead className="bg-white/5 text-zinc-400"><tr><th className="px-3 py-2 text-left font-normal">Description</th><th className="px-3 py-2 text-right font-normal">Amount</th></tr></thead><tbody className="divide-y divide-white/5">{selectedInvoice.items?.map((item, idx) => (<tr key={idx}><td className="px-3 py-2 text-zinc-300">{item.desc} x{item.qty}</td><td className="px-3 py-2 text-right text-white">{item.price}</td></tr>))}</tbody></table></div></div>
                                <div className="space-y-1 pt-4 border-t border-white/10"><div className="flex justify-between text-sm text-zinc-400"><span>Subtotal</span><span>{selectedInvoice.subtotal}</span></div><div className="flex justify-between text-sm text-zinc-400"><span>Tax (0%)</span><span>{selectedInvoice.tax}</span></div><div className="flex justify-between text-lg font-bold text-white pt-2 mt-2 border-t border-white/5"><span>Total</span><span className="text-cyan-400">{selectedInvoice.total}</span></div></div>
                                <Button className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white" onClick={() => handleDownloadInvoice(selectedInvoice.id)}><Download className="w-4 h-4 mr-2" /> Download PDF</Button>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            {/* --- MIDTRANS SNAP SIMULATION --- */}
            <MidtransSnap
                isOpen={isSnapOpen}
                onClose={() => setIsSnapOpen(false)}
                onResult={handlePaymentResult}
                orderDetails={snapConfig}
            />

        </div>
    );
}