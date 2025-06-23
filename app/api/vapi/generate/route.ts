/* import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createQuiz } from "@/lib/actions/quiz.actions"; */

// app/api/vapi/generate/route.ts
//import { auth } from "@clerk/nextjs/server"; // Import auth for marking public route
import { NextResponse } from 'next/server';

// This makes the entire route public within Clerk's API route handler context
// meaning you don't need a session for it.
export const dynamic = 'force-dynamic'; // Good practice for API routes

export async function GET() {
  return NextResponse.json({ status: "OK", message: "POST to this route to generate a quiz." });
}

export async function POST() {
  // If this route is public, you should NOT call auth() or userId() here,
  // unless you specifically want to get the user if they are logged in,
  // but *not* require it.
  // const { userId } = auth(); // Don't uncomment this if truly public
  // console.log("User ID (if authenticated):", userId);

  console.log("✅ Simple POST reached");
  return NextResponse.json({ message: "POST works!" });
}

// Crucial: Mark this API route as public
// This tells Clerk that this specific API handler does not require authentication
// regardless of middleware settings.
// This is often used for webhooks or public APIs.
// However, Clerk's CSRF protection might still apply if the request
// originates from a browser.
// For true server-to-server or non-browser public access, the middleware config below is better.

// **Alternative/Complementary:** Ensure your `middleware.ts` allows this specifically.
// Your current `isPublicRoute` in middleware:
// const isPublicRoute = createRouteMatcher(["/api/vapi/generate"]);
// This is correct.

// **Most direct approach for "public" API handlers in app router:**
// export const publicRoute = true; // This is for `api` routes that don't need auth, effectively.
// HOWEVER, this is specifically for Clerk's *server-side* auth checks,
// not necessarily for bypassing CSRF protection for browser-originated requests.
// Let's rely on middleware and a specific Clerk setting instead.