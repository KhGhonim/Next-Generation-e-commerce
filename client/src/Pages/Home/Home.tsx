import CardsGrid from "../../Components/HomePage/CardsGrid/CardsGrid";
import FloatingWords from "../../Components/HomePage/FloatingWords/FloatingWords";
import HeroSection from "../../Components/HomePage/HeroSection/HeroSection";
import LevelUP from "../../Components/HomePage/LevelUP/LevelUP";
import Performance from "../../Components/HomePage/Performance/Performance";
import WorkOut from "../../Components/HomePage/WorkOut/WorkOut";
import SEO from "../../Components/SEO/SEO";
import { generateOrganizationStructuredData, generateWebSiteStructuredData } from "../../utils/sitemapGenerator";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

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
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="my-24 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-black text-white rounded-2xl max-w-7xl mx-auto p-10"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
            Need help?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Hit the VEXO hotline.
          </h2>
          <p className="text-sm text-white/80">
            Email, call, or drop by the studio. The contact team is real humans only and replies within a day.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full uppercase tracking-[0.3em] text-xs font-semibold cursor-pointer outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact VEXO
          </motion.a>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-white/90">
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Email
            </p>
            <p className="text-lg font-semibold mt-2">support@vexo.com</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Phone
            </p>
            <p className="text-lg font-semibold mt-2">+1 (424) 555‑9084</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Hours
            </p>
            <p className="text-lg font-semibold mt-2">Mon–Fri · 9a – 6p PST</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Studio
            </p>
            <p className="text-lg font-semibold mt-2">
              1108 N La Brea Ave<br />Los Angeles
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default Home;
