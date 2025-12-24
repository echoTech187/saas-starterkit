export type ActionState = {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    status?: "idle" | "success" | "error";
};