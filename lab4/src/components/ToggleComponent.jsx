import React, { useReducer } from "react";
import { Button } from "react-bootstrap";

const initialState = { on: false };

function toggleReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { on: !state.on };
    default:
      return state;
  }
}

export default function ToggleComponent() {
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}>
      <h3>Exercise 2: Toggle</h3>
      <p>
        Trạng thái hiện tại:{" "}
        <strong style={{ color: state.on ? "green" : "red" }}>
          {state.on ? "ON" : "OFF"}
        </strong>
      </p>
      <Button onClick={() => dispatch({ type: "TOGGLE" })}>
        Chuyển trạng thái
      </Button>
    </div>
  );
}
