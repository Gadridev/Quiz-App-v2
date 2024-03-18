import React from "react";
import ProgressPoint from "./ProgressPoint";
import Question from "./Question";
import Footer from "./Footer";
import Timer from "../Timer";
import NextButton from "./NextButton";

function Active() {
  return (
    <>
      <ProgressPoint />
      <Question />
      <Footer>
        <Timer />
        <NextButton />
      </Footer>
    </>
  );
}

export default Active;
