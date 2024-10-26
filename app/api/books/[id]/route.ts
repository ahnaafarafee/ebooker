import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await prisma.book.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json("Deleted Successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json("Error deleting book", { status: 500 });
  }
}
