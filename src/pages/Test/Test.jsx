import { useLocation } from "react-router-dom";
import "./test.css";
import { useState } from "react";

export default function Test() {
  const location = useLocation();
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [index, setIndex] = useState(1);

  console.log(location.state);
  console.log(answers);

  function CheckIfPattern() {}

  return (
    <>
      <div style={{ marginTop: "24px", marginLeft: "18px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
        >
          <path
            d="M28 15.625H11.2662L18.9525 7.93875L17 6L6 17L17 28L18.9387 26.0613L11.2662 18.375H28V15.625Z"
            fill="#000306"
          />
        </svg>
      </div>
      <div className="test-container">
        <p className="test">Color Blindness Test</p>
        <img
          alt="Ishihara plat"
          className="plate"
          src={`/src/assets/plates/${index}.png`}
          width={323}
          height={323}
        />
        <p style={{ fontWeight: "600", marginTop: "18px" }}>{`${index}/36`}</p>
        <p style={{ fontWeight: "500", color: "#6F6F6F", marginTop: "28px" }}>
          Enter what you see
        </p>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="answer"
          type="number"
        />
        <div className="actions">
          <button
            onClick={() => {
              if (index > 1) {
                setAnswers((prev) => {
                  let temp = [];
                  prev.map((item, index) => {
                    if (index !== prev.length - 1) {
                      temp.push(item);
                    }
                  });
                  return temp;
                });
                setIndex((prev) => prev - 1);
              }
            }}
            className="previous"
          >
            Previous
          </button>
          <button
            onClick={() => {
              setAnswers([...answers, String(answer)]);
              setAnswer("");
              setIndex((prev) => prev + 1);
            }}
            className="next"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
