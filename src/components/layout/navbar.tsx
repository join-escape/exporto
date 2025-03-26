import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bug, LogIn, LogOut, Plus, Menu, MoreHorizontal } from "lucide-react";
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

  const GITHUB_REPO = "https://github.com/join-escape/exporto";
  const bugReportUrl = `${GITHUB_REPO}/issues/new?title=${encodeURIComponent(
    "[Bug Report] "
  )}`;
  const requestToolUrl = `${GITHUB_REPO}/issues/new?title=${encodeURIComponent(
    "[Tool Request] "
  )}`;

  return (
    <div className="py-3 px-2 sm:px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between sticky top-0 z-10 mb-2">
      <Link href="/" className="text-2xl font-bold italic tracking-tight">
        Exporto
      </Link>

      <div className="flex items-center gap-2">
        <SetThemeButton />

        {/* Always visible on desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a
              href={bugReportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
            >
              <Bug className="w-3.5 h-3.5 mr-1" />
              Report Bug
            </a>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <a href={requestToolUrl} target="_blank" rel="noopener noreferrer">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Request Tool
            </a>
          </Button>
        </div>

        {session ? (
          <>
            {/* Desktop Sign Out */}
            <div className="hidden md:block">
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
            </div>

            <Avatar className="h-8 w-8 cursor-pointer border">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <SignInButton />
        )}

        {/* Mobile Menu - Always visible on mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-0 bg-transparent"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <a
                  href={bugReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Bug className="w-3.5 h-3.5 mr-2" />
                  Report Bug
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={requestToolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Plus className="w-3.5 h-3.5 mr-2" />
                  Request Tool
                </a>
              </DropdownMenuItem>
              {session && (
                <DropdownMenuItem className="p-0">
                  <form
                    className="w-full"
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <Button
                      className="w-full justify-start rounded-none h-8"
                      variant="destructive"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" />
                      Sign out
                    </Button>
                  </form>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
