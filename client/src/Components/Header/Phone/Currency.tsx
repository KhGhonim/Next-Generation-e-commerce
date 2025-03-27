import  { useState } from "react";

function Currency() {
  const [currency, setCurrency] = useState<string>("USD");

  const handleCurrency = () => {
    setCurrency(currency === "USD" ? "EUR" : "USD");
    
  }
  
  return (
    <div onClick={handleCurrency} className="flex justify-between items-center">
      <span>Currency</span>
      <button className="flex items-center gap-2">{currency}</button>
    </div>
  );
}

export default Currency;
