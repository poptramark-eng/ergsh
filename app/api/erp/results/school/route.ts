import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
   
    const results = await prisma.schools.findUnique({
    
        where :{id: Number(id) },
        select: {name: true}
    });

    return NextResponse.json({ name: results?.name });
}
/*export async function GET(request: Request) {
    const ip =
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown";

    return new Response(`Client IP: ${ip}`);
}*/
