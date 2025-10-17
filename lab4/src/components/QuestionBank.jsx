import React, { useReducer, useEffect, useRef } from "react";
import { Button, Container, Card, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

/*
  Quiz hoàn chỉnh:
  - SELECT_OPTION: chọn phương án
  - SUBMIT_ANSWER: submit (hiển thị feedback)
  - TICK: đếm ngược mỗi giây
  - NEXT: chuyển câu tiếp theo
  - AUTO_SUBMIT: khi time hết -> tự submit (sai nếu chưa chọn)
  - RESTART: làm lại quiz
*/

const QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
  },
];

const initialState = {
  questions: QUESTIONS,
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: null, // 'correct' | 'incorrect' | null
  timeLeft: 10,
  highScore: Number(localStorage.getItem("quiz_highscore") || 0),
  locked: false, // khóa chọn khi đang hiển thị feedback
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      if (state.locked) return state;
      return { ...state, selectedOption: action.payload };
    case "SUBMIT_ANSWER": {
      // đánh giá
      const q = state.questions[state.currentQuestion];
      const correct = state.selectedOption === q.answer;
      const newScore = correct ? state.score + 1 : state.score;
      const newHigh = newScore > state.highScore ? newScore : state.highScore;
      // chỉ lưu high khi quiz kết thúc (NEXT sẽ lưu nếu cần), nhưng update tạm để hiển thị
      return {
        ...state,
        score: newScore,
        feedback: correct ? "correct" : "incorrect",
        locked: true,
        highScore: newHigh,
      };
    }
    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };
    case "AUTO_SUBMIT": {
      // time hết: nếu chưa submit thì treat as incorrect (không tăng điểm)
      const q = state.questions[state.currentQuestion];
      const correct = state.selectedOption === q.answer;
      const newScore = correct ? state.score + 1 : state.score;
      const newHigh = newScore > state.highScore ? newScore : state.highScore;
      return {
        ...state,
        score: newScore,
        feedback: correct ? "correct" : "incorrect",
        locked: true,
        highScore: newHigh,
      };
    }
    case "NEXT": {
      const nextIndex = state.currentQuestion + 1;
      const finished = nextIndex >= state.questions.length;
      // nếu finished -> lưu highscore vào localStorage
      if (finished) {
        const finalHigh = state.highScore;
        localStorage.setItem("quiz_highscore", String(finalHigh));
        return { ...state, showScore: true, locked: false };
      }
      return {
        ...state,
        currentQuestion: nextIndex,
        selectedOption: "",
        feedback: null,
        timeLeft: 10,
        locked: false,
      };
    }
    case "RESTART":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
      };
    default:
      return state;
  }
}

export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, timeLeft, highScore, locked } =
    state;

  const timerRef = useRef(null);

  // start / reset timer whenever currentQuestion changes or quiz ends
  useEffect(() => {
    if (showScore) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    // clear before set
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, showScore]);

  // when timeLeft changes -> auto submit when reach 0
  useEffect(() => {
    if (showScore) return;
    if (timeLeft <= 0 && !locked) {
      // auto submit (treat as incorrect if not selected)
      dispatch({ type: "AUTO_SUBMIT" });
      // show feedback 900ms then move to next
      setTimeout(() => {
        dispatch({ type: "NEXT" });
      }, 900);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, locked, showScore]);

  if (!questions || questions.length === 0) return null;

  const q = questions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (opt) => {
    if (locked) return;
    dispatch({ type: "SELECT_OPTION", payload: opt });
  };

  const handleSubmit = () => {
    if (locked || selectedOption === "") return;
    dispatch({ type: "SUBMIT_ANSWER" });
    // hiển thị feedback 800ms rồi NEXT
    setTimeout(() => {
      dispatch({ type: "NEXT" });
    }, 800);
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART" });
  };

  if (showScore) {
    return (
      <Container className="mt-4">
        <Card className="p-4 text-center">
          <h3>Kết quả bài kiểm tra</h3>
          <p style={{ fontSize: 20, fontWeight: "bold" }}>
            {score} / {questions.length}
          </p>
          <p>High Score: {highScore}</p>
          <Button onClick={handleRestart}>Restart Quiz</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>Progress: {currentQuestion + 1}/{questions.length}</div>
          <div>
            Time left:{" "}
            <strong style={{ color: timeLeft < 5 ? "red" : "inherit" }}>
              {timeLeft}s
            </strong>
          </div>
        </div>

        <ProgressBar now={progressPercent} className="mb-3" />

        <h5>Question {q.id}:</h5>
        <p style={{ fontSize: 18 }}>{q.question}</p>

        <div className="d-flex flex-column">
          {q.options.map((opt, idx) => {
            // decide style and icon based on feedback state
            let variant = "outline-secondary";
            let leftIcon = null;

            if (!feedback) {
              // chưa submit: highlight selected
              variant = selectedOption === opt ? "success" : "outline-secondary";
            } else {
              // đã có feedback: show correct/incorrect icons
              if (opt === q.answer) {
                // correct answer -> green + check
                variant = "success";
                leftIcon = <FaCheckCircle style={{ marginRight: 8 }} />;
              } else if (opt === selectedOption && selectedOption !== q.answer) {
                // nếu đây là đáp án người dùng chọn mà sai -> red + cross
                variant = "danger";
                leftIcon = <FaTimesCircle style={{ marginRight: 8 }} />;
              } else {
                // không phải đáp án đúng và không phải lựa chọn sai -> outline
                variant = "outline-secondary";
              }
            }

            return (
              <Button
                key={idx}
                className="mb-2 text-start"
                variant={variant}
                onClick={() => handleSelect(opt)}
                disabled={locked}
              >
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  {leftIcon}
                  <span>{opt}</span>
                </span>
              </Button>
            );
          })}
        </div>

        <div className="mt-3 d-flex align-items-center">
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === "" || locked}
            className="me-2"
          >
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Submit"}
          </Button>

          <div style={{ marginLeft: "auto", fontStyle: "italic" }}>
            (High score: {highScore})
          </div>
        </div>

        {feedback && (
          <div className="mt-3">
            {feedback === "correct" ? (
              <div style={{ color: "green", display: "flex", alignItems: "center" }}>
                <FaCheckCircle style={{ marginRight: 8 }} /> Correct! 🎉
              </div>
            ) : (
              <div style={{ color: "red", display: "flex", alignItems: "center" }}>
                <FaTimesCircle style={{ marginRight: 8 }} /> Incorrect! The correct answer is <strong style={{ marginLeft: 6 }}>{q.answer}</strong>
              </div>
            )}
          </div>
        )}
      </Card>
    </Container>
  );
}
