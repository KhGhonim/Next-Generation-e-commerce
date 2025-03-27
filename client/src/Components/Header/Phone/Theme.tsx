import { useState } from "react";
import { BiSun } from "react-icons/bi";
import { BsMoon } from "react-icons/bs";

function Theme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="flex justify-between items-center">
      <span>Theme</span>
      <button onClick={toggleTheme} className="flex items-center gap-2">
        {theme === "light" ? <BsMoon size={20} /> : <BiSun size={20} />}
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}

export default Theme;
