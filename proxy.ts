import { NextResponse, NextRequest } from "next/server";

import {cookies} from "next/headers";


export  async function proxy(request: NextRequest){
    const cookieStore = await cookies();
 const cookie = await cookieStore.get("poptra");
if(cookie){
    if(cookie.value==="421790"){
    
    return NextResponse.next();}

    return NextResponse.redirect(new URL("/auth/login",request.url));
    }

return NextResponse.redirect(new URL("/auth/login",request.url));



}
export const config = {matcher:["/erp/:path*"]}
