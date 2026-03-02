import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { exam, term } = await request.json();

  try {
    const school = await prisma.exams.create({
      data: {
        exam: exam,
        term: term,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "error" });
  }
}

export async function GET() {
  const exams = await prisma.exams.findMany();

  return NextResponse.json({ exams });
}
