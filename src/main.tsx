import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./Pages/Home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
