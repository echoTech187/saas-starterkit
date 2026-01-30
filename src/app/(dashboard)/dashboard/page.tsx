"use server";
import { cookies } from "next/headers";
import DashboardClientPage from "./pageClient";
import { decodeToken } from "@/app/_actions/authActions";

export default async function Dashboard() {
    const storeToken = (await cookies());
    const token = storeToken.get("next-auth.session-token")?.value;
    const user = await decodeToken(token as string);
    return (
        <DashboardClientPage user={user} />
    )
}