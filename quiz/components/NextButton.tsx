import { Dispatch } from "react";
import { Action, Question } from "../page";

function NextButton({
  userAnswer,
  dispatch,
  questions,
  index,
}: {
  questions: Question[];
  userAnswer: number | null;
  index: number;
  dispatch: Dispatch<Action>;
}) {
  if (userAnswer === null) return null;
  const hasNextQuestion = index + 1 < questions.length;
  return (
    <button
      onClick={() =>
        dispatch({ type: hasNextQuestion ? "nextQuestion" : "finish" })
      }
      className="flex justify-end bg-neutral-600 hover:bg-neutral-500 px-4 py-1.5 rounded-lg w-fit"
    >
      {hasNextQuestion ? "Next" : "Finish"}
    </button>
  );
}
export default NextButton;
