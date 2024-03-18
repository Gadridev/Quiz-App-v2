import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],
  status: "home",
  index: 0,
  answer: null,
  points: 0,
  highScoore: 0,
  secondRemaining: null,
  currentQuiz: {},
};
const SEC_PER_QUESTION = 30;
// import DateCounter from './DateCounter';
function reducer(state, action) {
  switch (action.type) {
    case "dataRecive":
      return {
        ...state,
        questions: action.payload,
        status: "home",
      };
    case "selectByID":
      return {
        ...state,
        currentQuiz: action.payload,
        status: "Ready",
        back: "home",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        back: "Ready",
        secondRemaining:
          state.currentQuiz?.questions?.length * SEC_PER_QUESTION,
      };
  
    case "newAnswer":
      //answer
      // const questions = state.questions.at(state.index);
      const questions = state.currentQuiz.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === questions.correctOption
            ? state.points + questions.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScoore:
          state.points > state.highScoore ? state.points : state.highScoore,
      };
    case "restart":
      return {
        ...initialState,
        currentQuiz: state.currentQuiz,
        status: "Ready",
      };
    
    // return {
    //   ...state,
    //   status: (state.status = "Ready"),
    //   index: (state.index = 0),
    //   answer: (state.answer = null),
    //   points: (state.points = 0),
    //   highScoore: (state.highScoore = 0),
    // };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}
function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const NumQuestions = state.currentQuiz?.questions?.length;
  const possiblePoints = state.currentQuiz?.questions?.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(function () {
    fetch(`http://127.0.0.1:8000/api/v1/quiz`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecive", payload: data.Quiz }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
   const getQuizById = function (id) {
    fetch(`http://127.0.0.1:8000/api/v1/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "selectByID", payload: data.Quiz }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  };
  return (
    <QuizContext.Provider
      value={{
        state,
        points: state.points,
        status: state.status,
        index: state.index,
        answer: state.answer,
        questions: state.currentQuiz?.questions?.[state.index],
        currentQuiz: state.currentQuiz,
        secondRemaining: state.secondRemaining,
        highScoore: state.highScoore,
        NumQuestions,
        possiblePoints,
        dispatch,
        getQuizById,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const Context = useContext(QuizContext);
  if (Context === undefined)
    throw new Error("you can't use Context oustid Provider");
  return Context;
}

export { QuizProvider, useQuiz };
