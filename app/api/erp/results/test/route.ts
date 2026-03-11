import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
    type Score = {
        subjectId: number,
        studentId: number,
        examId: number,
        score: number};
        type payload ={
            scores: Score[],
        }

const body: payload= await request.json();
const { scores}  = body;


  try {
    const many = await prisma.results.createMany({
        data: scores
    });
 

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const schoolId = await cookieStore.get("schoolId")?.value;
  const results = await prisma.results.findMany({
where:{student: {schoolId: Number(schoolId)}},
    include: {
      student:{
        select:{name: true,id:true,school:{select:{name: true}}}}, 
      subject:{select:{name:true} }, 
      exam:{select:{exam:true, term: true, year: true}
  }}});

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

