export type SnapResult = "success" | "pending" | "error" | "close";

export interface MidtransSnapProps {
    isOpen: boolean;
    onClose: () => void;
    onResult: (result: SnapResult) => void;
    orderDetails: {
        orderId: string;
        grossAmount: string;
        itemName: string;
    } | null;
}
