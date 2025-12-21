"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Download, Loader2, Eye } from "lucide-react"; // Import Eye
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Import Dialog
import { useBilling } from "@/hooks/use-billing";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function BillingPage() {
    const {
        invoices, plan, isLoading,
        isDetailOpen, setIsDetailOpen, selectedInvoice,
        handleDownloadInvoice, handleUpgradePlan, handleViewInvoice,
        isUpgradeOpen, setIsUpgradeOpen, handleCheckout
    } = useBilling();
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const [selectedPlanId, setSelectedPlanId] = useState<string>("pro");

    const pricingPlans = [
        {
            id: "starter",
            name: "Starter",
            price: billingCycle === "monthly" ? "0" : "0",
            description: "Untuk project hobi.",
            features: ["1 Project", "Community Support", "Basic Analytics"]
        },
        {
            id: "pro",
            name: "Pro",
            price: billingCycle === "monthly" ? "29" : "290",
            description: "Untuk freelancer & tim kecil.",
            features: ["Unlimited Projects", "Priority Support", "Advanced Analytics", "Custom Domain"],
            popular: true
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: billingCycle === "monthly" ? "99" : "990",
            description: "Untuk perusahaan besar.",
            features: ["Unlimited Everything", "24/7 Support", "SSO & Audit Logs", "Dedicated Manager"]
        }
    ];
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Billing</h2>
                <p className="text-zinc-400">Kelola status langganan dan invoice.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* ... Card Plan & Payment Method (SAMA SEPERTI SEBELUMNYA) ... */}
                <Card className="bg-zinc-900/50 border-cyan-500/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4"><Badge className="bg-cyan-500 text-black">ACTIVE</Badge></div>
                    <CardHeader><CardTitle className="text-white">{plan}</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg font-normal text-zinc-500">/mo</span></div>
                        <div className="space-y-2 text-sm text-zinc-300">
                            <div className="flex gap-2"><Check className="h-4 w-4 text-cyan-400" /> Unlimited Projects</div>
                            <div className="flex gap-2"><Check className="h-4 w-4 text-cyan-400" /> Priority Support</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleUpgradePlan} disabled={isLoading} className="w-full bg-white text-black hover:bg-zinc-200">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Upgrade Plan"}
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="bg-zinc-900/50 border-white/10">
                    <CardHeader><CardTitle className="text-white">Payment Method</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 p-4 border border-white/10 rounded-xl bg-black/40">
                            <CreditCard className="text-white h-6 w-6" />
                            <div className="flex-1 text-white">
                                <p className="font-medium">Visa ending in 4242</p>
                                <p className="text-xs text-zinc-500">Expiry 12/2026</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-zinc-900/50 border-white/10">
                <CardHeader><CardTitle className="text-white">Invoice History</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-white/5">
                                <TableHead>ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((inv) => (
                                <TableRow key={inv.id} className="border-white/5 hover:bg-white/5">
                                    <TableCell className="text-white">{inv.id}</TableCell>
                                    <TableCell className="text-zinc-300">{inv.date}</TableCell>
                                    <TableCell className="text-zinc-300">{inv.amount}</TableCell>
                                    <TableCell><Badge variant="outline" className="text-emerald-400 border-emerald-500/50">{inv.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* TOMBOL VIEW DETAIL */}
                                            <Button onClick={() => handleViewInvoice(inv)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-white/10">
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            {/* TOMBOL DOWNLOAD */}
                                            <Button onClick={() => handleDownloadInvoice(inv.id)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-white/10">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* --- INVOICE DETAIL DIALOG --- */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle>Invoice Details</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Detail transaksi untuk {selectedInvoice?.id}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedInvoice && (
                        <div className="space-y-6">
                            {/* Header Info */}
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-sm text-zinc-500">Status</p>
                                    <Badge variant="outline" className="mt-1 text-emerald-400 border-emerald-500/50">{selectedInvoice.status}</Badge>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-zinc-500">Date</p>
                                    <p className="font-medium">{selectedInvoice.date}</p>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="space-y-4">
                                <p className="text-sm font-medium text-zinc-300">Items</p>
                                <div className="rounded-lg border border-white/10 bg-black/50 p-4 space-y-3">
                                    {selectedInvoice.items?.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span className="text-zinc-300">{item.description}</span>
                                            <span className="text-white font-medium">{item.amount}</span>
                                        </div>
                                    ))}
                                    {/* Divider Total */}
                                    <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white">
                                        <span>Total</span>
                                        <span>{selectedInvoice.amount}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-lg">
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase mb-1">Billed to</p>
                                    <p className="text-white font-medium">Shadcn Admin</p>
                                    <p className="text-zinc-400 text-xs">Jakarta, Indonesia</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-zinc-500 text-xs uppercase mb-1">Payment Method</p>
                                    <p className="text-white font-medium">Visa ending 4242</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
                <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-bold">Upgrade Your Plan</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Pilih paket yang sesuai dengan kebutuhan tim Anda.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Toggle Monthly/Yearly */}
                    <div className="flex justify-center items-center gap-4 py-4">
                        <span className={cn("text-sm", billingCycle === "monthly" ? "text-white font-medium" : "text-zinc-500")}>Monthly</span>
                        <Switch
                            checked={billingCycle === "yearly"}
                            onCheckedChange={(c) => setBillingCycle(c ? "yearly" : "monthly")}
                            className="data-[state=checked]:bg-cyan-500"
                        />
                        <span className={cn("text-sm", billingCycle === "yearly" ? "text-white font-medium" : "text-zinc-500")}>
                            Yearly <span className="text-emerald-400 text-xs ml-1">(Save 20%)</span>
                        </span>
                    </div>

                    {/* Grid Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-4 py-4">
                        {pricingPlans.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedPlanId(item.id)}
                                className={cn(
                                    "relative rounded-xl border p-6 cursor-pointer transition-all hover:scale-[1.02]",
                                    selectedPlanId === item.id
                                        ? "bg-cyan-500/10 border-cyan-500 ring-1 ring-cyan-500"
                                        : "bg-zinc-900/50 border-white/10 hover:border-white/20"
                                )}
                            >
                                {item.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-cyan-500/20">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                    <p className="text-xs text-zinc-400 mt-1">{item.description}</p>
                                </div>

                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-white">${item.price}</span>
                                    <span className="text-zinc-500 text-sm">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {item.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                                            <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto">
                                    <div className={cn(
                                        "w-4 h-4 rounded-full border flex items-center justify-center ml-auto",
                                        selectedPlanId === item.id ? "border-cyan-500 bg-cyan-500" : "border-zinc-600"
                                    )}>
                                        {selectedPlanId === item.id && <div className="w-2 h-2 rounded-full bg-black" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <Button variant="ghost" onClick={() => setIsUpgradeOpen(false)} className="text-zinc-400 hover:text-white hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleCheckout(selectedPlanId, billingCycle)}
                            disabled={isLoading}
                            className="bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 font-bold shadow-lg shadow-cyan-500/20"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Proceed to Payment"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}