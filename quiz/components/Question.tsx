import { Dispatch } from "react";
import { Action, Question as QeustionType } from "../page";

function Question({
  question,
  dispatch,
  userAnswer,
}: {
  question: QeustionType;
  dispatch: Dispatch<Action>;
  userAnswer: number | null;
}) {
  const userAnswered = userAnswer !== null;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">{question.question}</h1>
      <div className="flex flex-col gap-4">
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`text-left text-xl border border-dark bg-dark px-4 py-1.5 rounded-full text-zinc-100 hover:translate-x-1 transition hover:bg-neutral-600 hover:border hover:border-neutral-800 focus:translate-x-6 ${
              userAnswered && index === question.correctOption && "bg-correct"
            } ${
              userAnswered &&
              index === userAnswer &&
              index !== question.correctOption &&
              "bg-red-500 hover:bg-red-500"
            } `}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Question;

//correct: 1098ad
// wrong: ffa94d
