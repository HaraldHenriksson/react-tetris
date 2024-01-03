import { getServerUser } from "@/app/lib/user/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  const user = await getServerUser();

  if (error) {
    const errorMessage =
      error.message === "User already registered"
        ? "User already exists. Please log in."
        : "Could not authenticate user";

    return NextResponse.redirect(
      `${requestUrl.origin}/sign-up?error=${errorMessage}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    user ? `${requestUrl.origin}/home` : `${requestUrl.origin}/login`,
    { status: 301 }
  );
}
