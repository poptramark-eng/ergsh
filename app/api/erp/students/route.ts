import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";


export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const schoolId = await cookieStore.get("schoolId")?.value;
  const { name,  gender, dob, grade } = await request.json();

  try {
    const students = await prisma.students.create({
      data: {
        name: name,
        schoolId: Number(schoolId),
        gender: gender,
        dob: new Date(dob),
        grade: grade,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "application error api" });
  }
}

export async function GET() {
  const cookieStore= await cookies();
  const id = await cookieStore.get("schoolId");
  const schoolId =id?.value;
  const students = await prisma.students.findMany({where: {schoolId: Number(schoolId)},
    include:{school:true}
  });

  return NextResponse.json({ students });
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
