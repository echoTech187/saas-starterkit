"use server";
import { cookies } from "next/headers";
import DashboardClientPage from "./pageClient";
import { permanentRedirect } from "next/navigation";

export default async function Dashboard() {
    const storeToken = (await cookies());
    const token = storeToken.get("token")?.value;
    console.log(token);
    if (!token) {
        permanentRedirect(new URL("/login").toString());
    }

    return (
        <DashboardClientPage />
    )
}