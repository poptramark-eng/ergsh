import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
  /* const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const schname = formData.get("School name") as string;
    const schemail = formData.get("School email") as string;
    const vision = formData.get("vision") as string;
    const motto = formData.get("motto") as string;
    const phone = formData.get("phone") as string;*/

    
export async function POST(request: NextRequest) {
  const { name, role, password, email,schname, schemail, phone, motto, vision } = await request.json();
  try {
    const school = await prisma.schools.create({
      data: {
        name: schname,
        email: schemail,
        phone: Number(phone),
        motto: motto,
        vision: vision,
        users: {create: [{name: name, email:email,role: role, password: await bcrypt.hash(password, 10)}]}
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: JSON.stringify(error) });
  }
}