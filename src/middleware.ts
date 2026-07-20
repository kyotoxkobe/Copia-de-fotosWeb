import { defineMiddleware } from "astro:middleware";

/**
 * Gallery Expiration Middleware
 *
 * Redirects users to /galeria-expirada if the gallery has expired.
 * Change PUBLISH_DATE to the actual date the gallery was published.
 * Change EXPIRY_DAYS to adjust the expiration window.
 */
const PUBLISH_DATE = new Date("2026-07-20T00:00:00");
const EXPIRY_DAYS = 7;

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Only check expiration on the gallery route (homepage)
  if (pathname === "/" || pathname === "/index" || pathname === "/index.html") {
    const now = new Date();
    const elapsedMs = now.getTime() - PUBLISH_DATE.getTime();
    const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);

    if (elapsedDays > EXPIRY_DAYS) {
      return context.redirect("/galeria-expirada", 302);
    }
  }

  return next();
});
