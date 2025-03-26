import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bug, LogIn, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <div className="py-3 bg-background flex items-center justify-between sticky top-0 z-10 mb-2">
      <Link href="/" className="text-2xl font-bold italic tracking-tight">
        Exporto
      </Link>
      <div className="flex items-center gap-2">
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

        <Button variant="default" size="sm" asChild>
          <Link href="/login">
            <LogIn className="w-3.5 h-3.5 mr-1" />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
}
