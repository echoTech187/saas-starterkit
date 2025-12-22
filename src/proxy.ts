// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
interface LogData {
    path: string;
    method: string;
    latency: number;
    status: number;
    userAgent?: string | undefined | null;
    projectId: string | number | undefined | null;
}
export async function proxy(request: NextRequest) {
    const start = Date.now()

    // 1. Proses request seperti biasa
    const response = NextResponse.next()

    // 2. Setelah selesai, hitung durasi
    const duration = Date.now() - start

    // 3. Simpan data "di belakang layar" (Fire and Forget)
    // Jangan pakai 'await' biar user gak nungguin log disimpan
    logToDatabase({
        path: request.nextUrl.pathname,
        method: request.method,
        latency: duration,
        status: response.status,
        userAgent: request.headers.get('user-agent'),
        projectId: 1 // Ambil dari subdomain atau header
    })

    return response
}

async function logToDatabase(data: LogData) {
    // Kirim ke API internal atau langsung ke DB (Prisma/Drizzle)
    // INSERT INTO logs (path, latency, status) VALUES (...)
}