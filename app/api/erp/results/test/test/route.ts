import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {

    const q = new URL(request.url).searchParams;

    const grade = q.get("grade");
    const schoolId = q.get("schoolId");
    const exam = q.get("exam");
    const term = q.get("term");
    const subject = q.get("subject");
    const id = q.get("id");
    
    const results = await prisma.results.findMany({
        where: {
            id: Number(subject) || undefined,
            student: {school: {id: Number(schoolId)||undefined}, grade: grade||undefined}, 
            exam: { id: Number(exam) || undefined, term: { contains:  term || undefined } },
    },/*/api/erp/results/test/test?grade=3 */

        select: {
            score: true
            , student: { select: { name: true, id: true, grade: true,school: { select: { name: true } } } },

            exam: { select: { exam: true, term: true } },
            subject: { select: { name: true } }
        }


    });
    return NextResponse.json({ results });
}