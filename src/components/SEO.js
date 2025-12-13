import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getSEOConfig, SITE_METADATA } from "../utils/seo-config";

/**
 * SEO Component for dynamic meta tags per route
 * Handles title, description, Open Graph, Twitter Cards, and canonical URLs
 */
const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType,
  twitterCard,
  canonical,
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Get default config for current route
  const defaultConfig = getSEOConfig(pathname);

  // Use provided props or fall back to route-specific defaults
  const seoTitle = title || defaultConfig.title;
  const seoDescription = description || defaultConfig.description;
  const seoKeywords = keywords || defaultConfig.keywords;
  const seoOgImage = ogImage || defaultConfig.ogImage;
  const seoOgType = ogType || defaultConfig.ogType;
  const seoTwitterCard = twitterCard || defaultConfig.twitterCard;
  const seoCanonical = canonical || defaultConfig.canonical;

  // Full title with site name
  const fullTitle = `${seoTitle} | ${SITE_METADATA.name}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={seoDescription} />
      {seoKeywords && <meta name="keywords" content={seoKeywords} />}

      {/* Canonical URL */}
      <link rel="canonical" href={seoCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoOgType} />
      <meta property="og:url" content={seoCanonical} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta name="image" property="og:image" content={seoOgImage} />
      <meta property="og:site_name" content={SITE_METADATA.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={seoTwitterCard} />
      <meta name="twitter:url" content={seoCanonical} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoOgImage} />
      {SITE_METADATA.twitterHandle && (
        <meta name="twitter:site" content={`@${SITE_METADATA.twitterHandle}`} />
      )}
      {SITE_METADATA.twitterCreator && (
        <meta name="twitter:creator" content={SITE_METADATA.twitterCreator} />
      )}

      {defaultConfig.noIndex && (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Helmet>
  );
};

export default SEO;
