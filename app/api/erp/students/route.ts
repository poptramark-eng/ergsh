import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, schoolId, gender, dob, grade } = await request.json();

  const students = await prisma.students.create({
    data: {
      name: name,
      schoolId: Number(schoolId),
      gender: gender,
      dob: new Date(dob),
      grade: grade,
    },
  });

  return NextResponse.json(
    students ? { message: "successs" } : { message: "error" }
  );
}

export async function GET() {
  const school = await prisma.students.findMany({});

  return NextResponse.json({ school });
}
