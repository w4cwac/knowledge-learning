import authConfig from "./auth.config"
import NextAuth from "next-auth"

import { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_REDIRECT, webhooksRoutes } from "./routes"
import { NextResponse } from "next/server"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isWebhookRoutes = webhooksRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
  const isApiAuth = nextUrl.pathname.startsWith(apiAuthPrefix)

  if (isApiAuth || isWebhookRoutes) {
    return
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }

    return
  }

  if (!isLoggedIn && !isPublicRoutes && !isAuthRoutes) {

    let callbackUrl = nextUrl.pathname

    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl))

  }
})

export const config = {
  matcher: [
    '/((?!.*\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)',
  ],
};