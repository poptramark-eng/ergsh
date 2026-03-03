import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { subjectId, studentId, examId, score } = await request.json();
  try {
    const results = await prisma.results.create({
      data: {
        subjectId: Number(subjectId),
        studentId: Number(studentId),
        examId: Number(examId),
        score: Number(score),
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

export async function GET() {
  const results = await prisma.results.findMany();

  return NextResponse.json({ results });
}
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    const results = await prisma.results.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "succesfully deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
export async function PUT(request: NextRequest) {
  const { id, subjectId, examId, score, studentId, vision } =
    await request.json();
  try {
    const students = await prisma.results.update({
      where: { id: Number(id) },
      data: {
        subjectId: subjectId,
        studentId: studentId,
        examId: Number(examId),
        score: Number(score),
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

/*model Results {
  id        Int      @id @default(autoincrement())
  studentId Int
  subjectId Int
  examId    Int
  score     Int
  exam      Exams    @relation(fields: [examId], references: [id], onDelete: Cascade)
  student   Students @relation(fields: [studentId], references: [id], onDelete: Cascade)
  subject   Subjects @relation(fields: [subjectId], references: [id], onDelete: Cascade)
}*/
