import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, phone, gender, schoolId, email } = await request.json();

  const students = await prisma.teachers.create({
    data: {
      name: name,
      schoolId: Number(schoolId),
      gender: gender,
      phone: Number(phone),
      email: email,
    },
  });

  return NextResponse.json(
    students ? { message: "successs" } : { message: "error" }
  );
}

export async function GET() {
  const school = await prisma.schools.findMany({
    include: { students: true },
  });

  return NextResponse.json({ school });
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
