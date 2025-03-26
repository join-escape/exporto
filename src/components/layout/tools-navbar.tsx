import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TOOLS_CONFIG } from "@/lib/tools/config";

interface ToolsNavbarProps {
  currentToolId?: string;
}

export default function ToolsNavbar({ currentToolId }: ToolsNavbarProps) {
  return (
    <div className="pt-1 pb-3 sticky top-12 z-10 mb-3">
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
        {TOOLS_CONFIG.map((tool) => (
          <Button
            key={tool.id}
            variant={currentToolId === tool.id ? "secondary" : "ghost"}
            size="sm"
            className="h-8 flex-shrink-0"
            asChild
          >
            <Link href={tool.id}>
              {tool.icon}
              <span className="ml-1 text-xs">{tool.name}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
