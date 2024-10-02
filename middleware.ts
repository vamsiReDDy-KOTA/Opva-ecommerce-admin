import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoute
} from "./routes";

export default async function middleware(req: Request) {

  const url = new URL(req.url);
  const isLoggedIn = await auth(); // Ensure this checks if the user is logged in correctly

  const isApiAuthRoute = url.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(url.pathname);

  const isPublicRoute = publicRoute.some(route => url.pathname.startsWith(route));

  if (isPublicRoute) {
    return null;  // Allow access to public routes
  }


  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, url));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("Redirecting unauthenticated user...");
    return Response.redirect(new URL('/auth/login', url));
  }



  return null;
}

export const config = {

  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/dashboard',
    '/auth/login',
    '/settings'
  ],
};