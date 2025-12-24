"use server";
import { cookies } from "next/headers";

async function setToken(token: string) {
    (await cookies()).set("token", token);
    return;
}
async function getToken() {
    const token = (await cookies()).get("token")?.value;
    return token;
}

async function removeToken() {
    (await cookies()).delete("token");

    return true;
}




export { setToken, getToken, removeToken };