// Sitemap generator utility
// This can be used to generate a sitemap.xml file dynamically

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://vexo.com';

// Static routes
const staticRoutes: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    loc: '/shop',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    loc: '/returns',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    loc: '/terms',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    loc: '/privacy',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    loc: '/cookies',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    loc: '/help',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    loc: '/size-guide',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    loc: '/shipping',
    changefreq: 'monthly',
    priority: 0.6,
  },
];

export function generateSitemapXML(products?: Array<{ id: string; updatedAt?: string }>): string {
  const urls: SitemapUrl[] = [...staticRoutes];

  // Add product pages if provided
  if (products) {
    products.forEach((product) => {
      urls.push({
        loc: `/product/${product.id}`,
        lastmod: product.updatedAt || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      });
    });
  }

  const xmlUrls = urls
    .map((url) => {
      const urlElements = [
    `<loc>${BASE_URL}${url.loc}</loc>`,
        url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : '',
        url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : '',
        url.priority ? `<priority>${url.priority}</priority>` : '',
      ]
        .filter(Boolean)
        .join('\n    ');

      return `  <url>\n    ${urlElements}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

// Helper function to generate structured data for organization
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VEXO',
    url: BASE_URL,
    logo: `${BASE_URL}/vexo-logo.png`,
    description: 'Next Generation E-Commerce platform offering the best products at the best prices.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
    },
    sameAs: [
      // Add your social media profiles here
      // 'https://www.facebook.com/vexo',
      // 'https://www.twitter.com/vexo',
      // 'https://www.instagram.com/vexo',
    ],
  };
}

// Helper function to generate structured data for product
export function generateProductStructuredData(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  brand?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  availability?: string;
}) {
  const baseUrl = BASE_URL;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`,
    brand: product.brand ? {
      '@type': 'Brand',
      name: product.brand,
    } : undefined,
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/product/${product.id}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: product.availability || (product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'),
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: product.rating && product.reviews ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    } : undefined,
  };
}

// Helper function to generate structured data for website
export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VEXO',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/shop?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Helper function to generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

