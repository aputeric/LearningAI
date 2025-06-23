// clerk.config.ts
export const clerkMiddlewareConfig = {
  publicRoutes: ["/", "/sign-in(.*)", "/api/vapi/generate"], // ✅ Make this route public
};
