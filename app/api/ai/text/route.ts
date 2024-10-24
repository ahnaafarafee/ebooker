import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  if (!body.wordCount) {
    body.wordCount = "200";
  }
  if (!body.age) {
    body.age = "any";
  }
  if (!body.theme) {
    body.theme = "any";
  }
  const { text } = await generateText({
    model: google("gemini-1.5-pro-latest"), // gemini-1.5-flash
    prompt:
      "I'm writing a story titled: " +
      body.title +
      ". The story should contain no less than: " +
      body.wordCount +
      "words. This story is for people aged: " +
      body.age +
      ". The theme of the books is: " +
      body.theme +
      ". Additionally include the following(ignore this if you think the following text is not related to the book's title or theme and generate the book with the help of all the previous information) : " +
      body.prompt +
      ". If all the information is not provided or any bogus or obscene information is provided, generate the book anyway with any topic you like and ignore any bogus or obscene information.",
  });
  return NextResponse.json({ text }, { status: 201 });
}
