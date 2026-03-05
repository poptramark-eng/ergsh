import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const results = await prisma.subjects.findUnique({

        where: { id: Number(id) },
        select: { name: true }
    });

    return NextResponse.json({ name: results?.name });
}