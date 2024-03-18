import React, { useEffect } from "react";
import { useQuiz } from "../Context/QuizContext";
import { useParams } from "react-router-dom";

function Ready() {
  const { NumQuestions, dispatch, currentQuiz } = useQuiz();
  console.log(currentQuiz);
  return (
    <>
      <div className="start">
        <h2>Welcome To The Gadri Quiz!</h2>
        <h3>
          {NumQuestions} questions to test your {currentQuiz.title} mastery
        </h3>
      
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "active" })}
          >
          Let's start {currentQuiz.title}
        </button>
      </div>
    </>
  );
}

export default Ready;
