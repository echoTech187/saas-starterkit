"use server";
import { verifySession } from "@/lib/session";
import DashboardClientPage from "./pageClient";

export default async function Dashboard() {
    const session = await verifySession();
    if (!session) {
        return null;
    }

    return (
        <DashboardClientPage user={session} />
    )
}