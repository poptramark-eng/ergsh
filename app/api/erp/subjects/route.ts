import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const id = await cookieStore.get("schoolId");
  const schoolId =id?.value;
  const { name } = await request.json();

  try {
    const school = await prisma.subjects.create({
      data: {
        name: name,
        schoolId: Number(schoolId),
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const id = await cookieStore.get("schoolId")?.value;
  const subjects = await prisma.subjects.findMany({
    where: {
      schoolId: Number(id),
    }
  });

  return NextResponse.json({ subjects });
}
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    const subjects = await prisma.subjects.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "succesfully deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

export async function PUT(request: NextRequest) {
  const { id, name } = await request.json();
  try {
    const students = await prisma.subjects.update({
      where: { id: Number(id) },
      data: {
        name: name,
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
/*
import { cookies } from "next/headers";
 const cookieStore = await cookies();
  const id = await cookieStore.get("schoolId");
  const schoolId =id?.value;
  const school = await prisma.schools.findMany(
    {where: {id:Number(schoolId)}});
  */