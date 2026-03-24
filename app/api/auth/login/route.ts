
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  const { password , email } = await request.json();
  // validate id, fetch DB, etc.
  
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if(user){
     const verify =  await  bcrypt.compare(password, user.password);
     if(verify){
      const cookieSet = await cookies();
   
      await cookieSet.set({
        name: `schoolId`,
        value: `${user.schoolId}`,
       secure: true,
      httpOnly:true,
sameSite:"strict",
       
      });
      
return NextResponse.json({ message: "success" });
     }
     else{
        return NextResponse.json({ message: "wrong password" });
     }
    }
    
  
}