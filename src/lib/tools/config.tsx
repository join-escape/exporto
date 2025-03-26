import { FileDown, FolderSync } from "lucide-react";

export const TOOLS_CONFIG = [
  {
    id: "notion-export",
    name: "Notion Export",
    href: "/tools/notion-export",
    category: "Text",
    icon: <FileDown className="w-5 h-5" />,
    description: "Export Notion pages to any format",
    enabled: true,
  },
  {
    id: "notion-sync",
    name: "Notion Sync",
    href: "/tools/notion-sync",
    category: "Text",
    icon: <FolderSync className="w-5 h-5" />,
    description: "Convert text between different case formats",
    enabled: false,
  },
];
