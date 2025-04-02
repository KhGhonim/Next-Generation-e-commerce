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
    < >
      <AnimatePresence>
        {isLoading ? (
          <WebsiteLoading key="loading" />
        ) : (
          <div key="content" className="w-full h-screen relative scroll-smooth ">
            <Header />
            <Outlet />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
