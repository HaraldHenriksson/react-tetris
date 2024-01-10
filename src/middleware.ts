import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const protectedRoutes = ["/game", "/home", "/leaderboard", "/profile"];

export async function middleware(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (protectedRoutes.includes(req.nextUrl.pathname) && !session) {
    return NextResponse.redirect(`${requestUrl.origin}/sign-in`, 307);
  }

  return res;
}
