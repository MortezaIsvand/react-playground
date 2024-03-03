"use client";

import { useEffect, useReducer } from "react";
import FinishScreen from "./components/FinishScreen";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}

interface State {
  questions: Question[] | [];
  status: string;
  index: number;
  userAnswer: number | null;
  points: number;
}
export interface Action {
  type: string;
  payload?: Question[] | number;
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  userAnswer: null,
  points: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload as Question[],
        status: "success",
      };
    case "dataFaild":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "start" };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        userAnswer: action.payload as number,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        userAnswer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "success",
      };
    default:
      throw new Error("unknown action");
  }
}

export default function HomePage() {
  const [{ status, questions, index, points, userAnswer }, dispatch] =
    useReducer(reducer, initialState);
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((_) => dispatch({ type: "dataFaild" }));
  }, []);

  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  return (
    <div className="w-full container mx-auto p-8 h-screen flex justify-center items-center ">
      {status === "loading" && <p>loading</p>}
      {status === "error" && <p>error</p>}
      {status === "success" && (
        <StartScreen numQuestions={questions.length} dispatch={dispatch} />
      )}
      {status === "start" && (
        <div className="space-y-8 container mx-auto">
          <Progress
            maxPossiblePoints={maxPossiblePoints}
            numQuestions={questions.length}
            points={points}
            index={index}
          />
          <div className="flex flex-col gap-4">
            <Question
              question={questions[index]}
              dispatch={dispatch}
              userAnswer={userAnswer}
            />
            <NextButton
              userAnswer={userAnswer}
              dispatch={dispatch}
              questions={questions}
              index={index}
            />
          </div>
        </div>
      )}
      {status === "finish" && (
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
