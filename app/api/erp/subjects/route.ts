import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  const school = await prisma.subjects.create({
    data: {
      name: name,
    },
  });

  const test = JSON.stringify(school);
  return NextResponse.json(`{test}`);
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
