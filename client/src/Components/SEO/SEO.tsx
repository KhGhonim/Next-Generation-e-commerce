import { Helmet } from "react-helmet-async";
import { SEOProps } from "../../Types/ProjectTypes";

// Default site configuration - Update these values
const SITE_CONFIG = {
  name: "VEXO",
  title: "VEXO | Next Generation E-Commerce",
  description: "Welcome to VEXO | Next Generation E-Commerce, where you can find the best products at the best prices.",
  url: import.meta.env.VITE_SITE_URL || "https://vexo.com",
  image: import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/vexo-og-image.png` : "https://vexo.com/vexo-og-image.png",
  twitterHandle: "@vexo",
  locale: "en_US",
  type: "website",
};

function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author = "Khaled Ghonim",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  canonical,
  structuredData,
}: SEOProps) {
  const pageTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title;
  const pageDescription = description || SITE_CONFIG.description;
  const pageImage = image || SITE_CONFIG.image;
  const pageUrl = url || SITE_CONFIG.url;
  const pageType = type || SITE_CONFIG.type;
  const canonicalUrl = canonical || pageUrl;

  // Combine keywords
  const allKeywords = keywords
    ? [...tags, keywords].filter(Boolean).join(", ")
    : tags.length > 0
    ? tags.join(", ")
    : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      {allKeywords && <meta name="keywords" content={allKeywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Robots */}
      <meta name="robots" content={`${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`} />
      <meta name="googlebot" content={`${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      {SITE_CONFIG.twitterHandle && (
        <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      )}
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;

