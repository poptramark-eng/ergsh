import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const { name, email, id } = await request.json();
  const update = await prisma.user.update({
    where: { id: id },
    data: { name: name, email: email },
  });
  return NextResponse.json({ message: update });
}

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  return NextResponse.json({ user: user });
}
