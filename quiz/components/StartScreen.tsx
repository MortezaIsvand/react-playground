import { Dispatch } from "react";
import { Action } from "../page";

function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: Dispatch<Action>;
}) {
  return (
    <div className="flex justify-center items-center p-8 border rounded-lg bg-neutral-800">
      <div className="flex flex-col items-center gap-2">
        <h1>Wellcome to the React Quize!</h1>
        <p>{numQuestions} questions to test your React mastery</p>
        <button
          onClick={() => dispatch({ type: "start" })}
          className="px-4 py-1.5 rounded-md bg-neutral-700 hover:bg-neutral-600"
        >
          Lets start
        </button>
      </div>
    </div>
  );
}
export default StartScreen;
