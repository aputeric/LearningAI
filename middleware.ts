import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define your public routes here
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/api/vapi/generate", // <-- allow this to run without auth
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const session = await auth();

    if (!session.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
});


export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
