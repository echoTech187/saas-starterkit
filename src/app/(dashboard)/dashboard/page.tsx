"use server";
import { cookies } from "next/headers";
import DashboardClientPage from "./pageClient";
import { permanentRedirect } from "next/navigation";
import { authUseCase } from "@/di/modules";

export default async function Dashboard() {
    const storeToken = (await cookies());
    const token = storeToken.get("next-auth.session-token")?.value;

    if (!token) {
        permanentRedirect("/login");
    }

    return (
        <DashboardClientPage />
    )
}