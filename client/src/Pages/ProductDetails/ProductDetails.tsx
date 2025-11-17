import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Product from "../../Components/ProductDetails/Product/Product";
import Tabs from "../../Components/ProductDetails/Tabs/Tabs";
import Related from "../../Components/ProductDetails/Related/Related";
import SEO from "../../Components/SEO/SEO";
import { generateProductStructuredData, generateBreadcrumbStructuredData } from "../../utils/sitemapGenerator";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState("Description");
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";
  
  // Mock product data - Replace with actual product fetch
  const product = {
    id: id || "1",
    name: "Ridley High Waist",
    description: "Premium high waist product from VEXO. Made with quality materials and designed for comfort and style.",
    price: 36.00,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    brand: "VEXO",
    category: "Fashion",
    rating: 4.5,
    reviews: 128,
    inStock: true,
  };
  
  const structuredData = [
    generateProductStructuredData(product),
    generateBreadcrumbStructuredData([
      { name: "Home", url: "/" },
      { name: "Shop", url: "/shop" },
      { name: product.name, url: location.pathname },
    ]),
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <SEO
        title={product.name}
        description={product.description}
        keywords={`${product.name}, ${product.brand}, ${product.category}, VEXO, online shopping`}
        image={product.image}
        url={`${baseUrl}${location.pathname}`}
        type="product"
        tags={[product.name, product.brand, product.category]}
        structuredData={structuredData}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Product />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Related />
      </div>
    </div>
  );
}

export default ProductDetails;
