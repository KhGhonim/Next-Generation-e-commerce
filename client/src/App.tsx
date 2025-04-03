import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import WebsiteLoading from "./Components/WebsiteLoading/WebsiteLoading";
import Header from "./Components/Header/Header";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [IsClose, setIsClose] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setisLoading(true);
    setIsClose(true);
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 8000);
    const timer2 = setTimeout(() => {
      setIsClose(false);
    }, 7800);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <WebsiteLoading IsClose={IsClose} key="loading" />
      ) : (
        <div
          key="content"
          className="w-full h-screen relative scroll-smooth bg-zinc-50"
        >
          <Header />
          <Toaster />
          <Outlet />
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
