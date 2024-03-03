import { Dispatch } from "react";
import { Action } from "../page";

function FinishScreen({
  maxPossiblePoints,
  points,
  dispatch,
}: {
  maxPossiblePoints: number;
  points: number;
  dispatch: Dispatch<Action>;
}) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <div className="flex flex-col gap-4 items-end">
      <h1 className="font-bold text-2xl bg-correct px-4 py-1.5 rounded-lg">
        you scored {points} out of {maxPossiblePoints} ({Math.floor(percentage)}
        %)
      </h1>
      <button
        className="bg-neutral-600 hover:bg-neutral-500  px-4 py-1.5 rounded-lg"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}
export default FinishScreen;
