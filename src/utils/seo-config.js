import { ROUTES } from "../constants";

// Base URL
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://goaltracker.fun";

// Default site metadata
export const SITE_METADATA = {
  name: "Goal Tracker",
  description:
    "Track your day-to-day goals with Goal Tracker. Visualize progress, stay motivated, and achieve your dreams with our intuitive goal tracking platform.",
  defaultImage: `${BASE_URL}/og-image-default.png`,
  twitterHandle: "hibbanharoon",
  siteUrl: BASE_URL,
};

// SEO configuration for each route
export const SEO_CONFIG = {
  [ROUTES.HOME]: {
    title: "Home",
    description:
      "Track your day-to-day goals with Goal Tracker. Visualize progress, stay motivated, and achieve your dreams with our intuitive goal tracking platform.",
    keywords:
      "goal tracker, daily goals, productivity, habit tracker, progress visualization, goal management, task tracker",
    canonical: `${BASE_URL}${ROUTES.HOME}`,
    ogType: "website",
    ogImage: `${BASE_URL}/og-image-default.png`,
    twitterCard: "summary_large_image",
  },
  [ROUTES.FEATURES]: {
    title: "Features",
    description:
      "Discover powerful features to track your daily goals. Yearly progress visualization, drag-and-drop goal management, calendar integration, and more. Everything you need to achieve success.",
    keywords:
      "goal tracker features, progress visualization, goal management tools, productivity features, habit tracking features",
    canonical: `${BASE_URL}${ROUTES.FEATURES}`,
    ogType: "website",
    ogImage: `${BASE_URL}/og-image-default.png`,
    twitterCard: "summary_large_image",
  },
  [ROUTES.ABOUT]: {
    title: "About Us",
    description:
      "Learn about Goal Tracker's mission to help individuals track their goals and visualize progress. Empowering people to achieve their dreams through intuitive goal tracking.",
    keywords:
      "about goal tracker, goal tracking app, productivity app, habit tracker about",
    canonical: `${BASE_URL}${ROUTES.ABOUT}`,
    ogType: "website",
    ogImage: `${BASE_URL}/og-image-about.png`,
    twitterCard: "summary_large_image",
  },
  [ROUTES.LOGIN]: {
    title: "Sign In - Login to Your Account",
    description:
      "Sign in to your Goal Tracker account to continue tracking your daily goals and visualizing your progress.",
    keywords: "goal tracker login, sign in, goal tracker account",
    canonical: `${BASE_URL}${ROUTES.LOGIN}`,
    ogType: "website",
    ogImage: `${BASE_URL}/og-image-default.png`,
    twitterCard: "summary",
    noIndex: true,
  },
  [ROUTES.SIGNUP]: {
    title: "Get Started - Create Your Account",
    description:
      "Create your free Goal Tracker account and start tracking your daily goals today. Join many users achieving their dreams.",
    keywords:
      "goal tracker signup, create account, free goal tracker, register goal tracker",
    canonical: `${BASE_URL}${ROUTES.SIGNUP}`,
    ogType: "website",
    ogImage: `${BASE_URL}/og-image-default.png`,
    twitterCard: "summary",
    noIndex: true,
  },
};

// Get SEO config for a specific route
export const getSEOConfig = (pathname) => {
  return (
    SEO_CONFIG[pathname] || {
      title: SITE_METADATA.name,
      description: SITE_METADATA.description,
      keywords: "goal tracker, daily goals, productivity",
      canonical: `${BASE_URL}${pathname || "/"}`,
      ogTitle: "Goal Tracker",
      ogDescription: "Track your day-to-day goals with Goal Tracker",
      ogType: "website",
      ogImage: SITE_METADATA.defaultImage,
      twitterCard: "summary_large_image",
      twitterSite: SITE_METADATA.twitterHandle,
      twitterCreator: SITE_METADATA.twitterHandle,
    }
  );
};
