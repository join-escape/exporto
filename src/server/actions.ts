"use server";

import { signIn } from "@/server/auth";

export async function handleSignIn(provider: string) {
  return signIn(provider);
}
