import WordCounterContent from "@/components/tools/text-counter/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter - Exporto",
  description: "Count words, characters, and paragraphs in your text",
};

export default async function WordCounterPage() {
  return (
    <div>
      <WordCounterContent />
    </div>
  );
}
