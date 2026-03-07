import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation'
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";


export async function POST(request: NextRequest){

   const {role, email, name, schoolId, password}=await request.json();
    

  try {
    const user = await prisma.user.create({data:{
        name: name as string,
        email: email as string,
        schoolId: Number(schoolId),
        password: await bcrypt.hash(password, 10),
        role: role,
    }})

    return NextResponse.json({message: "success"});
  } catch (error) {
    
    return NextResponse.json({message: "erro"});
  }
}




export async function PUT(request: NextRequest){
     const {role, id,email, name, schoolId, password}=await request.json();
  try {
    const students = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        
         name:name,
         role:role,
         schoolId:Number(schoolId),
        password: password,
        email:email,
      },
    });
    return redirect("/auth/profile");
  } catch (error) {
    revalidatePath("/auth/edit");
    return redirect("/auth/edit");
  }
}
export async function GET(request: NextRequest) {
  const { password , email } = await request.json();
  // validate id, fetch DB, etc.
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if(user){
     const verify =  await  bcrypt.compare(password, user.password);
     if(verify){
return NextResponse.json({ message: "success" });
     }
     else{
        return NextResponse.json({ message: "wrong password" });
     }
    }
    
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}



