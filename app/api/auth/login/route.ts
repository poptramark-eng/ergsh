
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  const { password , email } = await request.json();
  // validate id, fetch DB, etc.
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if(user){
     const verify =  await  bcrypt.compare(password, user.password);
     if(verify){
      const cookieSet = await cookies();
   await cookieSet.set({
        name: "machukhu12",
        value: "421790",
       secure: true,
      httpOnly:true,
      maxAge: 60*60*24,
sameSite:"strict",
       
      });
      await cookieSet.set({
        name: `schoolId`,
        value: `${user.schoolId}`,
       secure: true,
      httpOnly:true,
sameSite:"lax",
       
      });
      await cookieSet.set({
        name: "email",
        value: email,
       secure: true,
      httpOnly:true,
sameSite:"lax",
       
      });
return NextResponse.json({ message: "success" });
     }
     else{
        return NextResponse.json({ message: "wrong password" });
     }
    }
    
  } catch (error) {
    return NextResponse.json({ message: "You are not registered. Please proceed to egistration" });
  }
}