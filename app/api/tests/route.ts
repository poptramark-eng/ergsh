import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const users = [
    { email: "alireece@example.com", name: "Alice" },
    { email: "bortewb@example.com", name: "Bob" },
    { email: "chartwetlie@example.com", name: "Charlie" },
  ];

  try {
    // Insert hardcoded users into the database
    const createdUsers = await prisma.user.createMany({
      data: users,
    });

    return NextResponse.json({
      message: `${createdUsers.count} users created successfully!`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
export async function GET() {
  const data = await prisma.user.findMany();
  return NextResponse.json({ data: data });
}
