import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, phone, gender, schoolId, email } = await request.json();

  try {
    const students = await prisma.teachers.create({
      data: {
        name: name,
        schoolId: Number(schoolId),
        gender: gender,
        phone: Number(phone),
        email: email,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "error" });
  }
}

export async function GET() {
  const teachers = await prisma.teachers.findMany();

  return NextResponse.json({ teachers });
}
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    const teachers = await prisma.teachers.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "succesfully deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
export async function PUT(request: NextRequest) {
  const { id, name, phone, gender, email, schoolId } = await request.json();
  try {
    const students = await prisma.teachers.update({
      where: { id: Number(id) },
      data: {
        name: name,
        email: email,
        phone: Number(phone),
        gender: gender,
        schoolId: Number(schoolId),
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

/* model Teachers {
  id        Int      @id @default(autoincrement())
  name      String
  gender    String
  email     String
  phone     Int
  schoolId  Int
  createdAt DateTime @default(now())
  school    Schools  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
} */
