"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function SignOut() {
  //  const requestUrl = new URL(request);
  const supabase = createRouteHandlerClient({ cookies });

  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error("Error during sign out:", error);
    return { success: false, error };
  }
}
