"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function getServerUser(): Promise<User | null> {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getUserId() {
  const user = await getServerUser();
  return user?.id;
}
