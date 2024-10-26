import { textSchema } from "@/lib/textSchema";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const validation = textSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const book = await prisma.book.create({
    data: {
      title: body.title,
      text: body.text,
      authorId: user.id,
    },
  });

  return NextResponse.json(book, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
}
