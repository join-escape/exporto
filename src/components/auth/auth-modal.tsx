"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
      <DialogContent className="sm:max-w-[400px] p-6 gap-0">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred sign in method to continue
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-6">
          <form
            action={async () => {
              await handleSignIn("github");
            }}
          >
            <Button 
              variant="outline" 
              type="submit" 
              className="w-full h-11 text-base transition-colors hover:bg-secondary"
            >
              <Github className="mr-2 h-5 w-5" />
              Continue with Github
            </Button>
          </form>

          <form
            action={async () => {
              await handleSignIn("google");
            }}
          >
            <Button 
              variant="outline" 
              type="submit" 
              className="w-full h-11 text-base transition-colors hover:bg-secondary"
            >
              <Mail className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
