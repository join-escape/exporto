"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AuthStep from "./notion-auth-step";
import SelectPageStep from "./select-page-step";
import { useSession } from "next-auth/react";

interface NotionConnection {
  type: "token" | "oauth";
  token?: string;
  connected: boolean;
}

export default function NotionExportTool() {
  const session = useSession();
  const [activeStep, setActiveStep] = useState<string>("auth");
  const [notionConnection, setNotionConnection] = useState<NotionConnection>({
    type: "token",
    token: "",
    connected: false,
  });
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [exportedContent, setExportedContent] = useState<string>("");

  const handleAuthComplete = (connection: NotionConnection) => {
    setNotionConnection(connection);
    if (connection.connected) {
      setActiveStep("select-page");
    }
  };

  const handlePageSelect = (pageId: string, content: string) => {
    setSelectedPage(pageId);
    setExportedContent(content);
  };

  return (
    <div className="border rounded-lg shadow-sm">
      <Accordion
        type="single"
        collapsible
        value={activeStep}
        onValueChange={setActiveStep}
        className="w-full"
      >
        <AccordionItem value="auth" className="border-b">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center">
              <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm mr-2">
                1
              </span>
              <span className="font-medium">Connect to Notion</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <AuthStep
              isSignedIn={!!session?.data?.user}
              onComplete={handleAuthComplete}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="select-page"
          disabled={!notionConnection.connected}
          className="border-b"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center">
              <span
                className={`h-6 w-6 rounded-full flex items-center justify-center text-sm mr-2 ${
                  notionConnection.connected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </span>
              <span className="font-medium">Select and Export Page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <SelectPageStep
              connection={notionConnection}
              onPageSelect={handlePageSelect}
              exportedContent={exportedContent}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
