import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./Pages/Home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop/Shop.tsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.tsx";
const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
