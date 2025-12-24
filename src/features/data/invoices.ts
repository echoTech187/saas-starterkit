import { Invoice } from "@/lib/types/invoices";

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

export default initialInvoices;