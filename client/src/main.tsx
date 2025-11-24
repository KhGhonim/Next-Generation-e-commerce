import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./Pages/Home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop/Shop.tsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.tsx";
import Login from "./Pages/Auth/Login.tsx";
import SignUp from "./Pages/Auth/SignUp.tsx";
import VerifyToken from "./Pages/Auth/VerifyToken.tsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.tsx";
import NewPassword from "./Pages/Auth/NewPassword.tsx";
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
import Contact from "./Pages/Contact/Contact.tsx";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import Products from "./Pages/Dashboard/Products.tsx";
import ProductPhotos from "./Pages/Dashboard/ProductPhotos.tsx";
import Coupons from "./Pages/Dashboard/Coupons.tsx";
import DashboardLayout from "./Pages/Dashboard/Components/DashboardLayout.tsx";
import Analytics from "./Pages/Dashboard/Analytics.tsx";
import SalesTeam from "./Pages/Dashboard/SalesTeam.tsx";
import Payments from "./Pages/Dashboard/Payments.tsx";
import Categories from "./Pages/Dashboard/Categories.tsx";
import Users from "./Pages/Dashboard/Users.tsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.tsx";
import AdminProtectedRoute from "./Components/AdminProtectedRoute/AdminProtectedRoute.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.ts";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import SWRProvider from "./Components/SWRProvider/SWRProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRProvider>
          <BrowserRouter>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              zIndex: 10000,
            },
          }}
        />
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route path="/returns" element={<Returns />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route
              path="/dashboard"
              element={
                <AdminProtectedRoute>
                  <DashboardLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/photos" element={<ProductPhotos />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="sales-team" element={<SalesTeam />} />
              <Route path="payments" element={<Payments />} />
              <Route path="categories" element={<Categories />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-token" element={<VerifyToken />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
          </BrowserRouter>
        </SWRProvider>
    </PersistGate>
  </Provider>
  </HelmetProvider>
);
