import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const password = formData.get("password")?.toString();
  const token = formData.get("token")?.toString();

  const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_KEY;

  console.log({ password, token, supabaseServiceKey });
  if (!token || !password || !supabaseServiceKey) {
    return NextResponse.redirect(
      `${requestUrl.origin}/reset-password?error=Invalid request`,
      { status: 301 }
    );
  }

  const response = await fetch(
    "https://hpvvfhkykemmelhjpyqd.supabase.co/auth/v1/change-password",
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        apikey: supabaseServiceKey,
      }),
      body: JSON.stringify({ token, password }),
    }
  );

  if (!response.ok) {
    return NextResponse.redirect(
      `${requestUrl.origin}/reset-password?error=Failed to reset password`,
      { status: 301 }
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/login`, { status: 301 });
}
