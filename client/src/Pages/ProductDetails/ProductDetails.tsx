import { useState } from "react";
import Product from "../../Components/ProductDetails/Product/Product";
import Tabs from "../../Components/ProductDetails/Tabs/Tabs";
import Related from "../../Components/ProductDetails/Related/Related";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Product />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Related />
      </div>
    </div>
  );
}

export default ProductDetails;
