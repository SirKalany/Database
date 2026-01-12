# ✅ Créer un nouveau projet React

Ce guide résume comment installer **Redux Toolkit** et **React Redux** dans une application React.

---

## 1. Créer l'application React
```bash
npx create-react-app my-app
cd my-app
```

### 🛠️ Pour TypeScript :

```bash
npx create-react-app my-app --template typescript
```

---

## 🧠 Ajouter Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 📁 Exemple de slice

```js
// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## ⚙️ Exemple de store

```js
// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

---

## 🌐 Fournir le store à l’application

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

## 🧪 Exemple d'utilisation dans un composant

```jsx
// src/pages/Home.js
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counter/counterSlice";

export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

---

## 📚 Liens utiles

- [React (officiel)](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
