"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { signIn } from "@/server/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to Exporto</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => signIn("github")}
            className="w-full"
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with Github
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn("google")}
            className="w-full"
          >
            <Mail className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
