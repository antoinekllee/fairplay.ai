import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/onboarding",
    "/api/webhook/clerk",
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims, redirectToSignIn } = await auth();
    // const userId = sessionClaims?.userId;

    // If the user isn't signed in and the route is private, redirect to sign-in
    if (!userId && !isPublicRoute(req)) {
        return redirectToSignIn({ returnBackUrl: req.url });
        // return redirectToSignUp({ returnBackUrl: req.url });
    }

    // Catch users who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboading route to complete onboarding
    if (
        userId &&
        !sessionClaims?.metadata?.onboardingComplete &&
        req.nextUrl.pathname !== "/onboarding"
    ) {
        const onboardingUrl = new URL("/onboarding", req.url);
        return NextResponse.redirect(onboardingUrl);
    }

    // Redirect to dashboard if trying to access onboarding when it's already complete
    if (
        userId &&
        sessionClaims?.metadata?.onboardingComplete &&
        req.nextUrl.pathname === "/onboarding"
    ) {
        const dashboardUrl = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // If the user is logged in and the route is protected, let them view.
    if (userId && !isPublicRoute(req)) {
        if (req.url.includes("/CLERKJS.NAVIGATE.COMPLETE")) {
            const homeUrl = new URL("/", req.url);
            return NextResponse.redirect(homeUrl);
        } else {
            return NextResponse.next();
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
