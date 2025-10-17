import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CounterComponent from "./components/CounterComponent";
import ToggleComponent from "./components/ToggleComponent";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import QuestionBank from "./components/QuestionBank";

function App() {
  return (
    <div className="container mt-4">
      <h1>useReducer Exercises</h1>
      <CounterComponent />
      <ToggleComponent />
      <LoginForm />
      <SignUpForm />
      <QuestionBank />
    </div>
  );
}
export default App;
