import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  const school = await prisma.subjects.create({
    data: {
      name: name,
    },
  });

  const test = JSON.stringify(school);
  return NextResponse.json(`{test}`);
}

export async function GET() {
  const subjects = await prisma.subjects.findMany();

  return NextResponse.json({ subjects });
}
