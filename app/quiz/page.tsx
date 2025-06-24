import QuizCard from "@/components/QuizCard";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getAllQuizzes } from "@/lib/actions/quiz.actions";
import {getSubjectColor} from "@/lib/utils";

const QuizLibrary = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const quizzes = await getAllQuizzes(user?.id);

  return (
    <main>
      <section className="flex flex-row rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-3xl font-semibold">
            Get AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg">
            Practice real quiz questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="quiz/interview">Take a Quiz</Link>
          </Button>
        </div>

        <Image
          src="/images/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>My Quizes</h1>
      </section>

      <section className="companions-grid">
        {quizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        {...quiz}
                        color={getSubjectColor(quiz.subject)}
                    />
                ))}
      </section>
    </main>
  );
};

export default QuizLibrary;
