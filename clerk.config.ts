// clerk.config.ts
export const clerkMiddlewareConfig = {
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/api/vapi/generate", // 👈 the route you are testing
  ],
};
