import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import Product from "../../Components/ProductDetails/Product/Product";
import Tabs from "../../Components/ProductDetails/Tabs/Tabs";
import Related from "../../Components/ProductDetails/Related/Related";
import SEO from "../../Components/SEO/SEO";
import { generateProductStructuredData, generateBreadcrumbStructuredData } from "../../utils/sitemapGenerator";
import { useProduct } from "../../hooks/useProduct";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState("Description");
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";
  const { product, isLoading, error } = useProduct(id);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  const structuredData = useMemo(() => {
    if (!product) return [];
    const productData = {
      id: product._id || id || "unknown",
      name: product.name,
      description:
        product.description ||
        "Premium product from VEXO. Made with quality materials and designed for comfort and style.",
      price: product.price,
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : "https://via.placeholder.com/600x800.png?text=VEXO",
      brand: product.brand || "VEXO",
      category: product.category || "Fashion",
      rating: product.rating ?? 0,
      reviews: product.reviews ?? 0,
      inStock: product.inStock ?? true,
    };
  
    return [
      generateProductStructuredData(productData),
      generateBreadcrumbStructuredData([
        { name: "Home", url: "/" },
        { name: "Shop", url: "/shop" },
        { name: productData.name, url: location.pathname },
      ]),
    ];
  }, [product, id, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="relative">
          <div className="h-14 w-14 border-4 border-zinc-200 border-t-black rounded-full animate-spin" />
          <div className="absolute inset-0 h-14 w-14 border-4 border-black/10 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Product unavailable</h1>
          <p className="text-sm text-zinc-600 mb-6">
            {error || "The product you are looking for cannot be found."}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-black text-white rounded-lg cursor-pointer outline-none"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <SEO
        title={product.name}
        description={
          product.description ||
          "Discover premium products designed with precision, comfort, and style."
        }
        keywords={`${product.name}, ${product.brand || "VEXO"}, ${product.category || ""}, VEXO, online shopping`}
        image={
          product.images && product.images.length > 0
            ? product.images[0]
            : "https://via.placeholder.com/600x800.png?text=VEXO"
        }
        url={`${baseUrl}${location.pathname}`}
        type="product"
        tags={[product.name, product.brand || "VEXO", product.category || "General"]}
        structuredData={structuredData}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Product product={product} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} product={product} />
        <Related currentProductId={product._id || product.name} category={product.category} />
      </div>
    </div>
  );
}

export default ProductDetails;
