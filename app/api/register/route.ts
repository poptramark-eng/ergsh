import { NextResponse, NextRequest } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
  const created = await prisma.user.create({
    data: { name, email },
  });
  if (created) {
    return NextResponse.json({ message: "successfully" });
  } else {
    return NextResponse.json({ message: "Failure" });
  }
}

export async function GET(request: NextRequest) {
  const data = await prisma.user.findMany();
  return NextResponse.json({ data });
}
export async function DELETE(request: NextRequest) {
  const { email } = await request.json();
  const response = await prisma.user.delete({
    where: { email },
  });
  if (response) {
    revalidatePath("/users");
    redirect("/users");
    return NextResponse.json({ message: "User deleted successfully" });
  } else {
    NextResponse.json({ message: "Error deleting user" });
  }
}
