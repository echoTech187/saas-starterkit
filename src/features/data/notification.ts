import { Notification, NotificationCategory, NotificationType } from "@/lib/types/notification";
const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "Deployment Successful",
        message: "Project Toko Online V2 has been successfully deployed to production.",
        time: "2 minutes ago",
        type: NotificationType.SUCCESS,
        read: false,
        category: NotificationCategory.PROJECT
    },
    {
        id: "2",
        title: "Payment Received",
        message: "Thank you! We received your payment of $29.00 for the Pro Plan.",
        time: "1 hour ago",
        type: NotificationType.INFO,
        read: false,
        category: NotificationCategory.BILLING
    },
    {
        id: "3",
        title: "High Memory Usage Alert",
        message: "Worker-01 is consuming 85% of available memory. Consider scaling up.",
        time: "3 hours ago",
        type: NotificationType.WARNING,
        read: false,
        category: NotificationCategory.SYSTEM
    },
    {
        id: "4",
        title: "Invitation Accepted",
        message: "Citra Dewi has accepted your invitation to join the team.",
        time: "Yesterday",
        type: NotificationType.INVITE,
        read: true,
        category: NotificationCategory.TEAM
    },
    {
        id: "5",
        title: "Database Backup Failed",
        message: "Daily backup for 'Main DB' failed due to connection timeout.",
        time: "2 days ago",
        type: NotificationType.ERROR,
        read: true,
        category: NotificationCategory.SYSTEM
    },
];

export { initialNotifications };