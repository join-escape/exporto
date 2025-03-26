"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { handleSignIn } from "@/server/actions";

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
          <form
            action={async () => {
              await handleSignIn("github");
            }}
          >
            <Button variant="outline" type="submit" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Continue with Github
            </Button>
          </form>

          <form
            action={async () => {
              await handleSignIn("google");
            }}
          >
            <Button variant="outline" type="submit" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
