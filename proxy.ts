import { NextResponse, NextRequest } from "next/server";
import { redirect } from "next/navigation";


export async function proxy(request: NextRequest){
 const cookie = request.cookies.get("intro");
if(cookie){
    if(cookie.value==="5612"){
    
    return NextResponse.next();}

    return redirect("/auth/login");
    }

return NextResponse.redirect(new URL("/auth/login",request.url));



}
export const config = {matcher:["/((?!auth|api).*)"]}
