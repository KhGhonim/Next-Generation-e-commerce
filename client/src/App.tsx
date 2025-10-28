import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import WebsiteLoading from "./Components/WebsiteLoading/WebsiteLoading";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { AnimatePresence } from "framer-motion";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [IsClose, setIsClose] = useState(false);
  const location = useLocation();

  // Check if current route is dashboard
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    // Only show loading on initial page load (refresh or first visit)
    if (location.pathname === "/" && !sessionStorage.getItem("hasVisited")) {
      setisLoading(true);
      setIsClose(true);
      sessionStorage.setItem("hasVisited", "true");
      
      const timer = setTimeout(() => {
        setisLoading(false);
      }, 4000);
      const timer2 = setTimeout(() => {
        setIsClose(false);
      }, 3800);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  return (
    <AnimatePresence>
      {isLoading ? (
        <WebsiteLoading IsClose={IsClose} key="loading" />
      ) : (
        <div
          key="content"
          className="w-full min-h-screen relative scroll-smooth bg-zinc-50 flex flex-col"
        >
          {!isDashboardRoute && <Header />}
          <main className={`flex-1 ${!isDashboardRoute ? 'pb-20 lg:pb-0' : ''}`}>
            <Outlet />
          </main>
          {!isDashboardRoute && <Footer />}
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
