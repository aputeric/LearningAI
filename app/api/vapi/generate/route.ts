/* import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createQuiz } from "@/lib/actions/quiz.actions"; */

export async function GET() {
  return Response.json({ status: "OK", message: "POST to this route to generate a quiz." });
}

export async function POST() {
  console.log("✅ Simple POST reached");
  return Response.json({ message: "POST works!" });
}
