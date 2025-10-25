import { useEffect, useState } from "react";
import PcHeader from "./Pc/PcHeader";
import PhoneHeader from "./Phone/PhoneHeader";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const [IsScrolled, setIsScrolled] = useState(false);
  const { user, checkAuth } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <PcHeader IsScrolled={IsScrolled} user={user} />
      <PhoneHeader IsScrolled={IsScrolled} user={user} />
    </>
  );
}

export default Header;
