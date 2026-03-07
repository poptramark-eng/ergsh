import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function GET(request: Request, { params }: { params: Promise<{ id: string } >}) {
  const { id } = await params;
  // validate id, fetch DB, etc.
  try {
    const subjects = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "succesfully deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}
export async function POST(request: Request) {
   const formData = await request.formData();
    const name = formData.get('name');
    const role = formData.get('role') as string;
     const password = await bcrypt.hash(formData.get('password') as string, 10);
    const email = formData.get('email');
     const schoolId = formData.get('schoolId');
  return Response.json({ name, email , role, password, schoolId})
}








export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string } >}){
     const { id } = await params;
  try {
    const subjects = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "succesfully deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Application Error" });
  }
}