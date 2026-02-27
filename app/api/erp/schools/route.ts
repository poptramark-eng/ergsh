import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, email, phone, motto, vision } = await request.json();

  const school = await prisma.schools.create({
    data: {
      name: name,
      email: email,
      phone: Number(phone),
      motto: motto,
      vision: vision,
    },
  });

  const test = JSON.stringify(school);
  return NextResponse.json(`{test}`);
}

export async function GET() {
  const school = await prisma.schools.findMany();

  return NextResponse.json({ school});
}
