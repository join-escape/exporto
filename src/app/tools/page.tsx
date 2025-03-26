import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TOOLS_CONFIG } from "@/lib/tools/config";

export const metadata = {
  title: "Exporto - Tools Hub",
  description:
    "Choose from our collection of free, simple online tools to help with everyday tasks.",
};

export default function ToolsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Free Online Tools</h1>
      <p className="text-muted-foreground mb-8">
        Choose from our collection of simple, free online tools to help with
        everyday tasks. No ads, no registration required.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {TOOLS_CONFIG.map((tool) => (
          <Link href={`tools/${tool.id}`} key={tool.id}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-muted rounded-full p-3 mb-3 mt-3">
                  {tool.icon}
                </div>
                <h2 className="text-lg font-medium mb-2">{tool.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
