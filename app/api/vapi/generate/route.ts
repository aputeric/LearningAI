import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createQuiz } from "@/lib/actions/quiz.actions";

export async function GET() {
  return Response.json({ status: "OK", message: "POST to this route to generate a quiz." });
}

export async function POST(request: Request) {
  console.log("✅ /api/vapi/generate route hit");
  const body = await request.json();
 console.log("🧾 Body received:", body);
  const difficulty = String(body.difficulty || "");
  const subject = String(body.subject || "");
  const topic = String(body.topic || "");
  const userid = String(body.userid || "");
  const amount = parseInt(body.amount || "0");

  if (!difficulty || !subject || !topic || !userid || !amount || isNaN(amount)) {
    return Response.json(
      { success: false, error: "Missing or invalid fields." },
      { status: 400 }
    );
  }

  try {
    // Generate quiz questions using Gemini
    const { text } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a quiz.
        The subject for the quiz is ${subject}.
        The difficulty level is ${difficulty}.
        The focus for the questions should lean towards the provided: ${topic}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
      `,
    });

    const questions: string[] = JSON.parse(text);

    // Save to Supabase
    const quiz = await createQuiz(difficulty, topic, subject, questions, userid);

    return Response.json({ success: true, quiz }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }

    console.error("Unknown error:", error);
    return Response.json({ success: false, error: "Unknown error occurred." }, { status: 500 });
  }
}
