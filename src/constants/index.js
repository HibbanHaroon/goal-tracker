export const IS_DEV =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const STORAGE_KEYS = {
  USER: "user",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  TRACKER: "/tracker",
};
