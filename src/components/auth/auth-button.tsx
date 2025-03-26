"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./auth-modal";

export default function SignInButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="default" size="sm" onClick={() => setShowModal(true)}>
        <LogIn className="w-3.5 h-3.5 mr-1" />
        Sign In
      </Button>
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
