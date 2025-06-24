import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface QuizCardProps {
  quizId: string;
  difficulty: string;
  topic: string;
  subject: string;
  color: string;
}
const QuizCard = ({
  quizId,
  difficulty,
  topic,
  subject,
  color,
}: QuizCardProps) => {
  /*const feedback =
    userId && quizId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null; */

  const normalizedType = /mix/gi.test(difficulty) ? "Mixed" : difficulty;

  const badgeColor =
    {
      Simple: "bg-light-400",
      Mixed: "bg-light-600",
      Hard: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <h2 className={cn("text-2xl font-bold", badgeColor)}>{difficulty}</h2>
      </div>

      <p className="text-sm">{topic}</p>
      <p className="text-sm">{quizId}</p>

      {/*Score */}
      <div className="flex flex-row gap-5 mt-3">
        <div className="flex flex-row gap-2 items-center">
          <Image src="/icons/star.svg" width={22} height={22} alt="star" />
          {/* <p>{feedback?.totalScore || "---"}/100</p> */}
          <p>--/100</p>
        </div>
      </div>

      <Link href={`/quiz/${quizId}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Quiz
        </button>
      </Link>
    </article>
  );
};

export default QuizCard;
