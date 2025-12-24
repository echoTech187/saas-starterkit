/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
export async function GET() {
    return new Response(JSON.stringify([]), { status: 200 })
}

export async function POST(request: Request) {
    return new Response(JSON.stringify([]), { status: 200 })
}