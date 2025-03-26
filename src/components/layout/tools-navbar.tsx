"use client";

import { usePathname } from "next/navigation";
import { ToolsNavbarContent } from "./tool-navbar-content";

export default function ToolsNavbar() {
  const pathname = usePathname();
  const currentToolId = pathname.split("/").pop();

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-max p-2">
        <ToolsNavbarContent currentToolId={currentToolId} />
      </div>
    </div>
  );
}
