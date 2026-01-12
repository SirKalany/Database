# Créer un nouveau projet React

Ce guide résume comment installer **Next.js** pour un **nouveau projet** ou pour l'intégrer dans un **projet existant** (migration).

---

## 1. Créer l'application React
```bash
npx create-react-app my-app
cd my-app
```

### Pour TypeScript :

```bash
npx create-react-app my-app --template typescript
```

## Ajouter React Router

```bash
npm install react-router-dom
```

### Pour TypeScript :

```bash
npm install --save-dev @types/react-router-dom
```

## Exemple de configuration

```jsx
// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

Créez les fichiers correspondants dans src/pages/ (par exemple Home.js, About.js).

## Ajouter Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

### Exemple de slice

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

### Exemple de store

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

## Fournir le store à l’application

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

### 🧪 Exemple d'utilisation dans un composant

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

## 📚 Liens utiles

- [React (officiel)](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://chatgpt.com/c/68702611-8d5c-8005-8bfc-d94c851a6e99)
