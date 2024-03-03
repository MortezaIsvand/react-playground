function Progress({
  numQuestions,
  points,
  index,
  maxPossiblePoints,
}: {
  numQuestions: number;
  points: number;
  index: number;
  maxPossiblePoints: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <progress max={numQuestions} value={index + 1} className="w-full" />
      <div className="flex justify-between items-center">
        <p>
          questions {index + 1} / {numQuestions}
        </p>
        <p>
          points {points} / {maxPossiblePoints}
        </p>
      </div>
    </div>
  );
}
export default Progress;
