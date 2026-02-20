import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (anyone can see)
const isPublicRoute = createRouteMatcher([
  '/',                    // Home Page
  '/find-spots(.*)',      // Search Page and sub-routes
  '/spots/(.*)',          // Individual spot detail pages
  '/api/uploadthing']);   // Required for image handling

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // if the user hits a protected route and isn't logged in, redirect to sign in 
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)'
  ],
};