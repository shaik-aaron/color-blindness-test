import "./scoresheet.css";
import back from "../../assets/arrowBack.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ScoreSheet() {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setData(snapshot.data());
      } else {
        console.log("Empty");
      }
    }
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <div className="nav-container">
        <img src={back} onClick={() => navigate(-1)} />
        <p className="results">{data?.name}</p>
      </div>
      <div className="main-container">
        <div className="headers">
          <p>ID</p>
          <p>Expected / Given</p>
        </div>
        <div className="details-container">
          {data?.answers?.map((object) => {
            return (
              <div className="details">
                <p>{object?.questionID}</p>
                <p>{`${object?.correctAnswer} / ${object?.givenAnswer}`}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="download-container">
        <button className="download-all">
          Download excel for this candidate
        </button>
      </div>
    </>
  );
}
