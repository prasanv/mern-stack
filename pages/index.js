import styles from "../styles/Home.module.css";
import { useQuery } from "react-query";

export default function Home() {
  const fetchExercises = async () => {
    const response = await fetch("http://localhost:8080/exercises/");
    const data = await response.json();
    return data;
  };
  const info = useQuery("ExerciseList", fetchExercises);

  return (
    <div className={styles.container}>
      {info?.isSuccess && (
        <div>
          {info?.data?.map((ind) => (
            <div key={ind._id}>
              <p>{ind.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
