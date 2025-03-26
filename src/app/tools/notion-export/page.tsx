import { Metadata } from "next";
import NotionExportTool from "@/components/tools/notion-export/tool";

export const metadata: Metadata = {
  title: "Notion Export - Exporto",
  description: "Export Notion pages to any format with ease",
};

export default function NotionExportPage() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Notion Export Tool</h1>
      <p className="text-muted-foreground mb-6">
        Export your Notion pages to various formats quickly and easily. Connect
        with your Notion account and select the pages you want to export.
      </p>
      <NotionExportTool />
    </div>
  );
}
