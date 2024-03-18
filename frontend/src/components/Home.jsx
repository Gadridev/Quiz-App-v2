import { useQuiz } from "../Context/QuizContext";
import styles from "./home.module.css"

function Home() {
  const {state,getQuizById}=useQuiz()
  return (
    <div className={`${styles.btn_flex}`}>
      {state.questions?.map((item) => (
        <button className={`${styles.btn} btn-ui`} onClick={() => getQuizById(item._id)} key={item._id}>
          {item.title}
        </button>
      ))}
    </div>
  );
}

export default Home;
