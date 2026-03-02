import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, email, phone, motto, vision } = await request.json();
  try {
    const school = await prisma.schools.create({
      data: {
        name: name,
        email: email,
        phone: Number(phone),
        motto: motto,
        vision: vision,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

export async function GET() {
  const school = await prisma.schools.findMany();

  return NextResponse.json({ school });
}
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    const schools = await prisma.schools.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "succesfully deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
export async function PUT(request: NextRequest) {
  const { id, name, phone, motto, email, vision } = await request.json();
  try {
    const students = await prisma.schools.update({
      where: { id: Number(id) },
      data: {
        name: name,
        email: email,
        phone: Number(phone),
        motto: motto,
        vision: vision,
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
