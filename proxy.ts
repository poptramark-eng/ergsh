import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

import {cookies} from "next/headers";


export  async function proxy(request: NextRequest){
    const cookieStore = await cookies();
   
    const cookie = await cookieStore.get("schoolId")?.value;
if(cookie){
    const schoolId= Number(cookie);
    const response = await prisma.schools.findUnique({
        where: {id: schoolId},
        select: {id: true}
        });
    
    const id = response?.id as number;

    
    if(id){
    
    return NextResponse.next();}

    return NextResponse.redirect(new URL(`/auth/login`,request.url));
    }

    const url = request.nextUrl.pathname;
return NextResponse.redirect(new URL(`/auth/login?id=${url}`,request.url));



}
export const config = {matcher:[ "/erp:path*", "/xlsx:path*","/grok:path*","/test:path*"]};
