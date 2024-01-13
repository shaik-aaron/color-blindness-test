import { useLocation, useNavigate } from "react-router-dom";
import ProgressiveImage from "react-progressive-graceful-image";
import "./test.css";
import { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import rolling from "../../assets/rolling.gif";
import { images } from "../../images";

export default function Test() {
  const location = useLocation();
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [index, setIndex] = useState(1);
  const [optionsIndex, setOptionsIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const input = useRef(null);
  const navigate = useNavigate();

  const options = [
    ["2", "nothing"],
    ["6", "nothing"],
    ["97", "nothing"],
    ["45", "nothing"],
    ["5", "nothing"],
    ["7", "nothing"],
    ["16", "nothing"],
    ["73", "nothing"],
    ["5", "nothing"],
    ["2", "nothing"],
    ["45", "nothing"],
    ["73", "nothing"],
    ["purple and red spots", "purple line", "red line"],
    ["purple and red spots", "purple line", "red line"],
    ["nothing", "a line"],
    ["nothing", "a line"],
    ["blue-green line", "nothing"],
    ["blue-green line", "nothing"],
    ["orange line", "nothing"],
    ["orange line", "nothing"],
    ["blue-green line", "red-green violet line"],
    ["blue-green line", "blue-green violet line"],
    ["violet-orange line", "blue-green violet line"],
  ];

  const correctAnswers = [
    "12",
    "8",
    "6",
    "29",
    "57",
    "5",
    "3",
    "15",
    "74",
    "2",
    "6",
    "97",
    "45",
    "5",
    "7",
    "16",
    "73",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "26",
    "42",
    "35",
    "96",
    "purple and red spots",
    "purple and red spots",
    "nothing",
    "nothing",
    "blue-green line",
    "blue-green line",
    "orange line",
    "orange line",
    "blue-green line",
    "blue-green line",
    "violet-orange line",
  ];

  console.log(answers);

  function CheckIfPattern() {
    if ((index >= 10 && index <= 21) || (index >= 26 && index <= 36)) {
      return true;
    } else {
      return false;
    }
  }

  function handleDecrement() {
    setSelectedOption("");
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
      if (CheckIfPattern() && optionsIndex > 0 && index !== 26) {
        setOptionsIndex((prev) => prev - 1);
      }
      if (index === 22) {
        setOptionsIndex((prev) => prev - 1);
      }
      setIndex((prev) => prev - 1);
    }
    if (input.current) {
      input.current.focus();
    }
  }

  function handleIncrement() {
    setSelectedOption("");
    setAnswers([
      ...answers,
      {
        questionID: index,
        correctAnswer: correctAnswers[index - 1],
        givenAnswer: answer,
      },
    ]);
    setAnswer("");
    if (CheckIfPattern() && optionsIndex < options.length - 1) {
      setOptionsIndex((prev) => prev + 1);
    }
    if (input.current) {
      input.current.focus();
    }
    setIndex((prev) => prev + 1);
  }

  async function handleSubmit() {
    let correctCount = 0;
    console.log(index);
    console.log(correctAnswers[index - 1]);

    let finalAnswers = [
      ...answers,
      {
        questionID: index,
        correctAnswer: correctAnswers[index - 1],
        givenAnswer: answer,
      },
    ];

    for (let i = 0; i < finalAnswers.length; i++) {
      if (finalAnswers[i].givenAnswer === finalAnswers[i].correctAnswer) {
        correctCount++;
      }
    }

    console.log(correctCount);

    console.log(finalAnswers);
    console.log(correctAnswers);

    try {
      setLoading((prev) => !prev);
      setDisableSubmit((prev) => !prev);
      await addDoc(collection(db, "users"), {
        name: location.state.name,
        age: location.state.age,
        answers: finalAnswers,
        totalCorrect: correctCount,
      });
      setLoading((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div style={{ marginTop: "24px", marginLeft: "18px" }}>
        <div onClick={() => navigate(-1)} role="button">
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
      </div>
      <div className="test-container">
        <p className="test">Color Blindness Test</p>
        <ProgressiveImage
          src={images[index - 1]}
          placeholder={<img width={16} height={16} src={rolling} />}
        >
          {(src, loading) => (
            <img
              alt="Ishihara plate"
              className="plate"
              src={src}
              width={323}
              height={323}
            />
          )}
        </ProgressiveImage>
        <p style={{ fontWeight: "600", marginTop: "18px" }}>{`${index}/36`}</p>
        <p
          style={{
            fontWeight: "500",
            color: "#6F6F6F",
            marginTop: "28px",
            marginBottom: "14px",
          }}
        >
          Enter what you see
        </p>
        {CheckIfPattern() ? (
          options[optionsIndex].map((value) => {
            return (
              <div
                key={value}
                onClick={() => {
                  setSelectedOption(value);
                  setAnswer(value);
                }}
                className="flex-options"
              >
                <input
                  checked={selectedOption === value}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    setAnswer(e.target.value);
                  }}
                  type="radio"
                  value={value}
                />
                <p>{value}</p>
              </div>
            );
          })
        ) : (
          <input
            autoFocus
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="answer"
            type="number"
            ref={input}
          />
        )}
        <div className="actions">
          <button onClick={() => handleDecrement()} className="previous">
            Previous
          </button>
          {index === 36 ? (
            <button
              disabled={disableSubmit}
              onClick={() => handleSubmit()}
              className="next"
            >
              {loading ? (
                <img width={16} height={16} src={rolling} />
              ) : (
                "Submit"
              )}
            </button>
          ) : (
            <button
              onClick={() => handleIncrement()}
              className="next"
              disabled={answer === ""}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
