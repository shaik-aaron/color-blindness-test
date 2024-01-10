import "./results.css";
import { db } from "../../firebase";
import back from "../../assets/arrowBack.svg";
import check from "../../assets/checkCircle.svg";
import warning from "../../assets/warning.svg";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const temp = [];

        snapshot.forEach((doc) => {
          const { name, totalCorrect } = doc.data();
          temp.push({ name, totalCorrect });
        });
        setResults(temp);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  console.log(results);

  return (
    <>
      <div className="nav-container">
        <img src={back} />
        <p className="results">Results</p>
      </div>
      <div className="main-container">
        {results.map((result) => {
          return (
            <div
              style={{
                background: result.totalCorrect === 36 ? "" : "#D9D9D9",
              }}
              className="result-container"
            >
              <div className="result">
                <p className="name">{result.name}</p>
                <p className="total">{result.totalCorrect}/36</p>
              </div>
              <div className="tag-container">
                <div
                  style={{
                    background: result.totalCorrect === 36 ? "" : "#FEF3C7",
                  }}
                  className="tag"
                >
                  <img src={result.totalCorrect === 36 ? check : warning} />
                  <p
                    style={{
                      color: result.totalCorrect === 36 ? "" : "#D97706",
                    }}
                  >
                    {result.totalCorrect === 36 ? "Passed" : "Review"}
                  </p>
                </div>
                <p className="review">Review {">"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
