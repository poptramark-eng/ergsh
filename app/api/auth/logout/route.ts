import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    await cookieStore.delete("schoolId");

    return NextResponse.json({message : "logout success"});
   
    
}