import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (anyone can see)
const isPublicRoute = createRouteMatcher(['/', '/find-spots(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // if the user hits a protected route and isn't logged in, redirect to sign in 
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};