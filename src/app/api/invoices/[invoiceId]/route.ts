/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
export async function GET(params: Promise<{ invoiceId: string }>) {
    return new Response(JSON.stringify([]), { status: 200 });
}

export async function PUT(request: Request, params: Promise<{ invoiceId: string }>) {
    return new Response(JSON.stringify([]), { status: 200 });
}

export async function DELETE(request: Request, params: Promise<{ invoiceId: string }>) {
    return new Response(JSON.stringify([]), { status: 200 });
}