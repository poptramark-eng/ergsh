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
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    const students = await prisma.students.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "succesfully deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
export async function PUT(request: NextRequest) {
  const { id, name, dob, gender, grade, schoolId } = await request.json();
  try {
    const students = await prisma.students.update({
      where: { id: Number(id) },
      data: {
        name: name,
        grade: grade,
        dob: new Date(dob),
        gender: gender,
        schoolId: Number(schoolId),
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
