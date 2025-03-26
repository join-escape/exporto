import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bug, LogIn, LogOut, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/server/auth";
import SignInButton from "../auth/auth-button";
import { getThemeToggler } from "@/lib/theme/get-theme-button";

export const runtime = "edge";

export default async function Navbar() {
  const session = await auth();
  const SetThemeButton = getThemeToggler();

  console.log({ session });
  return (
    <div className="py-3 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between sticky top-0 z-10 mb-2">
      <Link href="/" className="text-2xl font-bold italic tracking-tight">
        Exporto
      </Link>
      <div className="flex items-center gap-2">
        <SetThemeButton />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/bug-report" className="text-xs">
            <Bug className="w-3.5 h-3.5 mr-1" />
            Report Bug
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link href="/request-tool">
            <Plus className="w-3.5 h-3.5 mr-1" />
            Request Tool
          </Link>
        </Button>

        {session ? (
          <>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button
                className="cursor-pointer"
                variant="destructive"
                size="sm"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                Sign out
              </Button>
            </form>
            <Avatar className="h-8 w-8 cursor-pointer border">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
