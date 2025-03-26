"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";
import { Download, Copy, Loader2, FileDown, Book, Key } from "lucide-react";

export default function NotionExportTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<string>("step-1");
  const [authMethod, setAuthMethod] = useState<string>("token");
  const [integrationToken, setIntegrationToken] = useState<string>("");
  const [notionLink, setNotionLink] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<string>("markdown");
  const [convertedContent, setConvertedContent] = useState<string>("");

  // Dummy pages for demo
  const pages = [
    { id: "page1", title: "Project Roadmap" },
    { id: "page2", title: "Meeting Notes" },
    { id: "page3", title: "Product Specs" },
    { id: "page4", title: "Q1 Goals" },
  ];

  const handleConnect = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setActiveStep("step-2");
    }, 1500);
  };

  const handleConvert = () => {
    setIsLoading(true);

    // Simulate conversion
    setTimeout(() => {
      setIsLoading(false);
      setConvertedContent(`# Sample Converted Content
      
## This is a heading

This is a paragraph of text from your Notion page. It demonstrates how the content would look after conversion.

- List item 1
- List item 2
- List item 3

### Code Example

\`\`\`javascript
const exportNotion = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};
\`\`\`

> This is a blockquote from the Notion page

#### Table Example

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Info 1   | Info 2   | Info 3   |
      `);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedContent);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([convertedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `notion-export.${
      exportFormat === "markdown" ? "md" : exportFormat
    }`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side - Steps */}
      <div>
        <Accordion
          type="single"
          collapsible
          value={activeStep}
          onValueChange={(value) => setActiveStep(value)}
          className="mb-4"
        >
          <AccordionItem value="step-1">
            <AccordionTrigger className="text-lg font-medium">
              Step 1: Connect to Notion
            </AccordionTrigger>
            <AccordionContent>
              <Tabs
                defaultValue={authMethod}
                onValueChange={setAuthMethod}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger
                    value="token"
                    className="flex items-center gap-1"
                  >
                    <Key className="h-4 w-4" />
                    Integration Token
                  </TabsTrigger>
                  <TabsTrigger
                    value="oauth"
                    className="flex items-center gap-1"
                  >
                    <Book className="h-4 w-4" />
                    OAuth Login
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="token" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token">Notion Integration Token</Label>
                    <Input
                      id="token"
                      type="password"
                      placeholder="secret_..."
                      value={integrationToken}
                      onChange={(e) => setIntegrationToken(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      You can get your integration token from the{" "}
                      <a
                        href="https://www.notion.so/my-integrations"
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline"
                      >
                        Notion Integrations page
                      </a>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="oauth">
                  <Button className="w-full">Continue with Notion</Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    You need to be signed in to use OAuth authentication
                  </p>
                </TabsContent>
              </Tabs>

              <Button
                onClick={handleConnect}
                disabled={authMethod === "token" && !integrationToken}
                className="w-full mt-4"
              >
                {isLoading && activeStep === "step-1" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect to Notion"
                )}
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step-2">
            <AccordionTrigger
              className="text-lg font-medium"
              disabled={activeStep !== "step-2"}
            >
              Step 2: Select Page & Format
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Notion Page</Label>
                  <Combobox
                    pages={pages}
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notion-link">Or Paste Notion Page Link</Label>
                  <Input
                    id="notion-link"
                    placeholder="https://www.notion.so/..."
                    value={notionLink}
                    onChange={(e) => setNotionLink(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleConvert}
                  disabled={!selectedPage && !notionLink}
                  className="w-full"
                >
                  {isLoading && activeStep === "step-2" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <FileDown className="mr-2 h-4 w-4" />
                      Export Page
                    </>
                  )}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Right side - Content preview */}
      <div>
        <Card className="h-full">
          <CardContent className="p-6">
            {convertedContent ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Exported Content</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleDownload}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-md h-[500px] overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                  {convertedContent}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-center">
                <FileDown className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Content Yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Connect to Notion and select a page to export. Your converted
                  content will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
