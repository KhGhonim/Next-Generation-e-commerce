import CardsGrid from "../../Components/HomePage/CardsGrid/CardsGrid";
import FloatingWords from "../../Components/HomePage/FloatingWords/FloatingWords";
import HeroSection from "../../Components/HomePage/HeroSection/HeroSection";
import LevelUP from "../../Components/HomePage/LevelUP/LevelUP";
import Performance from "../../Components/HomePage/Performance/Performance";
import WorkOut from "../../Components/HomePage/WorkOut/WorkOut";
import SEO from "../../Components/SEO/SEO";
import { generateOrganizationStructuredData, generateWebSiteStructuredData } from "../../utils/sitemapGenerator";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";
  
  const structuredData = [
    generateOrganizationStructuredData(),
    generateWebSiteStructuredData(),
  ];

  return (
    <>
      <SEO
        title="Home"
        description="Welcome to VEXO | Next Generation E-Commerce. Discover the best products at the best prices. Shop premium fashion, electronics, and accessories with fast shipping and excellent customer service."
        keywords="e-commerce, online shopping, VEXO, fashion, electronics, clothing, accessories, best prices, premium products"
        url={`${baseUrl}${location.pathname}`}
        type="website"
        tags={["e-commerce", "shopping", "fashion", "electronics", "online store"]}
        structuredData={structuredData}
      />
      <HeroSection />
      <WorkOut />
      <Performance />
      <LevelUP />
      <CardsGrid />
      <FloatingWords />
    </>
  );
}

export default Home;
