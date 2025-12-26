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
async function getCodeVerification() {
    const cookiesStore = await cookies();
    const session = cookiesStore.get("codeVerification")?.value;
    const code = session ? JSON.parse(session) : null;
    return code;

}



export { setToken, getToken, removeToken, getCodeVerification };