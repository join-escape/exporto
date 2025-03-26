"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileDown,
  Loader2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { fetchNotionPages, exportNotionPage } from "@/lib/notion/api";

interface SelectPageStepProps {
  connection: {
    type: "token" | "oauth";
    token?: string;
    connected: boolean;
  };
  onPageSelect: (pageId: string, content: string) => void;
  exportedContent: string;
}

// Mock data for now
const MOCK_PAGES = [
  { id: "page1", title: "Meeting Notes", lastEdited: "2023-10-15" },
  { id: "page2", title: "Project Roadmap", lastEdited: "2023-10-12" },
  { id: "page3", title: "Weekly Agenda", lastEdited: "2023-10-10" },
  { id: "page4", title: "Research Summary", lastEdited: "2023-10-08" },
  { id: "page5", title: "Team Goals", lastEdited: "2023-10-05" },
];

const EXPORT_FORMATS = [
  { id: "markdown", name: "Markdown (.md)" },
  { id: "html", name: "HTML (.html)" },
  { id: "text", name: "Plain Text (.txt)" },
  { id: "pdf", name: "PDF Document (.pdf)" },
];

export default function SelectPageStep({
  connection,
  onPageSelect,
  exportedContent,
}: SelectPageStepProps) {
  const [pages, setPages] = useState(MOCK_PAGES);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [exportFormat, setExportFormat] = useState("markdown");
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPages = async () => {
      if (connection.connected) {
        try {
          setIsLoading(true);
          // In a real implementation, we'd fetch actual pages
          // const fetchedPages = await fetchNotionPages(connection);
          // setPages(fetchedPages);

          // Using mock data for demonstration
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setPages(MOCK_PAGES);
        } catch (err) {
          setError("Failed to fetch Notion pages");
        } finally {
          setIsLoading(false);
        }
      }
    };

    getPages();
  }, [connection]);

  const handleSelectPage = async (pageId: string) => {
    setSelectedPageId(pageId);
    setIsLoading(true);
    setError("");

    try {
      // In a real implementation, we'd fetch and convert the page
      // const content = await exportNotionPage(pageId, exportFormat, connection);

      // Mock content for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockContent = `# ${
        pages.find((p) => p.id === pageId)?.title || "Untitled"
      }\n\nThis is sample exported content from the selected Notion page. In a real implementation, this would contain the actual exported content from Notion.\n\n## Section 1\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.\n\n## Section 2\n\n- List item 1\n- List item 2\n- List item 3`;

      onPageSelect(pageId, mockContent);
    } catch (err) {
      setError("Failed to export page content");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pageUrl) {
      setError("Please enter a Notion page URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Extract page ID from URL (simplified)
      const pageId = pageUrl.split("/").pop() || "";

      // In a real implementation, we'd validate and export the page
      // const content = await exportNotionPage(pageId, exportFormat, connection);

      // Mock content for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockContent = `# Imported from URL\n\nThis is sample exported content from the URL you provided. In a real implementation, this would contain the actual exported content from Notion.\n\n## Section 1\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.\n\n## Section 2\n\n- List item 1\n- List item 2\n- List item 3`;

      setSelectedPageId("url-import");
      onPageSelect("url-import", mockContent);
    } catch (err) {
      setError("Failed to export page from URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(exportedContent);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadContent = () => {
    const blob = new Blob([exportedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notion-export.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Tabs defaultValue="select">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="select">Select Page</TabsTrigger>
              <TabsTrigger value="url">Page URL</TabsTrigger>
            </TabsList>

            <TabsContent value="select" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="page">Select Notion Page</Label>
                <Select
                  value={selectedPageId}
                  onValueChange={handleSelectPage}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                  <SelectContent>
                    {pages.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="url" className="space-y-4 mt-4">
              <form onSubmit={handlePageUrlSubmit} className="space-y-2">
                <Label htmlFor="pageUrl">Notion Page URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="pageUrl"
                    placeholder="https://www.notion.so/..."
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !pageUrl}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {EXPORT_FORMATS.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    {format.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Exported Content</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyContent}
                disabled={!exportedContent}
              >
                {copySuccess ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {copySuccess ? "Copied" : "Copy"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownloadContent}
                disabled={!exportedContent}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <div className="border rounded-md h-64 bg-muted/30">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : exportedContent ? (
              <ScrollArea className="h-64 w-full">
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                  {exportedContent}
                </pre>
              </ScrollArea>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileDown className="h-12 w-12 mb-2" />
                <p className="text-sm">Select a page to see exported content</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 bg-destructive/10 border border-destructive/25 rounded-md text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
