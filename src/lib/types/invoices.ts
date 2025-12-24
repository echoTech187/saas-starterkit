
export type Invoice = {
    id: string;
    date: string;
    amount: string;
    status: "Paid" | "Pending" | "Failed";
    items?: { description: string; amount: string }[]; // <-- Tambahan: Rincian Item
};