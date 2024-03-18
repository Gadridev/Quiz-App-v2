import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Ready from "./components/Ready";
import FinishScreen from "./components/FinishScreen";
import { useQuiz } from "./Context/QuizContext";
import Home from "./components/Home";
import Active from "./components/Active";

function App() {
  const { status } = useQuiz();

  return (
    <>
      <div className="app">
        <Header />
        {status === "home" && <Home />}
        <Main>
          {status === "Loading" && <Loader />}
          {status === "error" && <Loader />}
          {status === "Ready" && <Ready />}
          {status === "active" && (
            <>
              <Active />
            </> 
          )}
          {status === "finish" && <FinishScreen />}
        </Main>
      </div>
    </>
  );
}

export default App;
