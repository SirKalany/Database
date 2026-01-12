import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./features/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Compteur Redux</h1>
      <p>Valeur : {count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
}

export default App;
