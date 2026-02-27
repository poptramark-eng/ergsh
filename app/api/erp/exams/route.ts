import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { exam, term } = await request.json();

  const school = await prisma.exams.create({
    data: {
      exam: exam,
      term: term,
    },
  });

  const test = JSON.stringify(school);
  return NextResponse.json(`{test}`);
}

export async function GET() {
  const school = await prisma.exams.findMany();

  return NextResponse.json({ message: school });
}
