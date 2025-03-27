import { useState } from "react";
import { BiGlobe } from "react-icons/bi";

function LanguageComponent() {
  const [language, setLanguage] = useState<string>("EN");


  const handleLanguage = () => {
    setLanguage(language === "EN" ? "AR" : "EN");
    
  }
  
  return (
    <div className="flex justify-between items-center">
      <span>Language</span>
      <button  onClick={handleLanguage} className="flex items-center gap-2">
        <BiGlobe size={20} />
        {language}
      </button>
    </div>
  );
}

export default LanguageComponent;
