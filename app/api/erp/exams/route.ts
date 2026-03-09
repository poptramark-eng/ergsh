import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const id = await cookieStore.get("schoolId");
  const schoolId =id?.value;
  const { exam, term } = await request.json();

  try {
    const school = await prisma.exams.create({
      data: {
        exam: exam,
        term: term,
         schoolId: Number(schoolId),
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "error" });
  }
}
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    const teachers = await prisma.exams.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "succesfully deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

export async function GET() {
  const exams = await prisma.exams.findMany();

  return NextResponse.json({ exams });
}

export async function PUT(request: NextRequest) {
  const { id, exam, term } = await request.json();
  try {
    const students = await prisma.exams.update({
      where: { id: Number(id) },
      data: {
        exam: exam,
        term: term,
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
