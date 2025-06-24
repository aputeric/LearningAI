import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getQuiz } from "@/lib/actions/quiz.actions";
import Agent from "@/components/Agent";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const QuizSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;

   if (!id || typeof id !== "string") {
    redirect("/quiz"); // Defensive: id is required
  }

  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const quiz = await getQuiz(id);

  if (!quiz) redirect("/quiz");


  /*  const feedback = await getFeedbackByquizId({
    quizId: id,
    userId: user?.id!,
  }); */

  return (
    <>
      <h3>Quiz Generation</h3>
      <Agent
        userName={user?.firstName ?? "Guest"}
        userId={user?.id}
        type="quiz"
        quizId={id}
        questions={quiz.questions}
      />
    </>
  );
};

export default QuizSession;
