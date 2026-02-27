import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });

    if (deletedUser) {
      // Revalidate the users list page
      revalidatePath("/users");

      // Redirect directly to /users
      return NextResponse.json({ message: "successfully" });
    }

    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Deletion failed", error: error.message },
      { status: 500 }
    );
  }
}
