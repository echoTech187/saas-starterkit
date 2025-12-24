export enum NotificationType {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
    INVITE = "invite",
}
export enum NotificationCategory {
    SYSTEM = "system",
    BILLING = "billing",
    PROJECT = "project",
    TEAM = "team",
}
export type Notification = {
    id: string;
    title: string;
    message: string;
    time: string;
    type: NotificationType;
    read: boolean;
    category: NotificationCategory;
    link?: string;
};