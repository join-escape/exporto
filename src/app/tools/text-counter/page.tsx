import ToolCard from "@/components/tools/tool-card";
import WordCounterContent from "@/components/tools/text-counter/content";
import { Hash } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter - Exporto",
  description: "Count words, characters, and paragraphs in your text",
};

export default function WordCounterPage() {
  return (
    <div>
      <WordCounterContent />
    </div>
  );
}
