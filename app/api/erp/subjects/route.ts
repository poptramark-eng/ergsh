import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  try {
    const school = await prisma.subjects.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

export async function GET() {
  const subjects = await prisma.subjects.findMany();

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
