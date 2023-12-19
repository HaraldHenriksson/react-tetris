import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const password = formData.get("password")?.toString();
  const token = formData.get("token")?.toString();
  const supabase = createRouteHandlerClient({ cookies });

  if (!token || !password) {
    return NextResponse.redirect(
      `${requestUrl.origin}/reset-password?error=Invalid request`,
      { status: 301 }
    );
  }

  const { error: verifyError } = await supabase.auth.updateUser({
    password: password,
  });

  console.log("verifyError:", verifyError);

  if (verifyError) {
    return NextResponse.redirect(
      `${requestUrl.origin}/reset-password?error={verifyError.message}`,
      { status: 301 }
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/sign-in`, { status: 301 });
}
