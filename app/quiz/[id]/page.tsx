import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getQuiz } from "@/lib/actions/quiz.actions";
import Agent from "@/components/Agent";
import Image from "next/image";
import {getSubjectColor} from "@/lib/utils";

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
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                      <div className="flex items-center gap-2">
                          <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(quiz.subject)}}>
                              <Image src={`/icons/${quiz.subject}.svg`} alt={quiz.subject} width={35} height={35} />
                          </div>
      
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">                                
                                  <div className="subject-badge max-sm:hidden">
                                      {quiz.subject}
                                  </div>
                              </div>
                              <p className="text-lg">{quiz.topic}</p>
                          </div>
                      </div>
                     
                  </article>
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
