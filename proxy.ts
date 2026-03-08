import { NextResponse, NextRequest } from "next/server";
import { redirect } from "next/navigation";
import {cookies} from "next/headers";


export  async function proxy(request: NextRequest){
    const cookieStore = await cookies();
 const cookie = cookieStore.get("poptra")?.value;
if(cookie){
    if(cookie==="421790"){
    
    return NextResponse.next();}

    return NextResponse.redirect(new URL("/auth/login",request.url));
    }

return NextResponse.redirect(new URL("/auth/login",request.url));



}
export const config = {matcher:["/((?!auth|api).*)"]}
