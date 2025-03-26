"use client";

import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/server/auth";

export default function SignInButton() {
  return (
    <Button variant="default" size="sm" onClick={() => signIn()}>
      <LogIn className="w-3.5 h-3.5 mr-1" />
      Sign In
    </Button>
  );
}
