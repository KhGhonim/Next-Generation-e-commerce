import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import WebsiteLoading from "./Components/WebsiteLoading/WebsiteLoading";
import Header from "./Components/Header/Header";
import { AnimatePresence } from "framer-motion";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setisLoading(true);
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="w-full h-screen relative bg-zinc-100">
      <AnimatePresence>
        {isLoading ? (
          <WebsiteLoading key="loading" />
        ) : (
          <div className="w-full h-full">
            <Header />
            <Outlet />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
