import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./Pages/Home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop/Shop.tsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.tsx";
import Login from "./Pages/Auth/Login.tsx";
import SignUp from "./Pages/Auth/SignUp.tsx";
import Profile from "./Pages/Profile/Profile.tsx";
import Checkout from "./Pages/Checkout/Checkout.tsx";
import Wishlist from "./Pages/Wishlist/Wishlist.tsx";
import Returns from "./Pages/Returns/Returns.tsx";
import Terms from "./Pages/Terms/Terms.tsx";
import Privacy from "./Pages/Privacy/Privacy.tsx";
import Cookies from "./Pages/Cookies/Cookies.tsx";
import HelpCenter from "./Pages/HelpCenter/HelpCenter.tsx";
import SizeGuide from "./Pages/SizeGuide/SizeGuide.tsx";
import ShippingInfo from "./Pages/ShippingInfo/ShippingInfo.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/shipping" element={<ShippingInfo />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
