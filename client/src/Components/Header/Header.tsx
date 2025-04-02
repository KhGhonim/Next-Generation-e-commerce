import { useEffect, useState } from "react";
import PcHeader from "./Pc/PcHeader";
import PhoneHeader from "./Phone/PhoneHeader";

function Header() {
  const [IsScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
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
  return (
    <>
      <PcHeader IsScrolled={IsScrolled} />
      <PhoneHeader IsScrolled={IsScrolled} />
    </>
  );
}

export default Header;
