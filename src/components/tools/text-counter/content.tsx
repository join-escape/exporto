"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function WordCounterContent() {
  const [text, setText] = useState("");
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Type or paste your text here..."
        className="min-h-32 bg-muted/5"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-4">
        <div className="bg-muted p-2 rounded-md flex-1">
          <div className="text-xs text-muted-foreground">Words</div>
          <div className="text-lg font-semibold">{wordCount}</div>
        </div>
        <div className="bg-muted p-2 rounded-md flex-1">
          <div className="text-xs text-muted-foreground">Characters</div>
          <div className="text-lg font-semibold">{charCount}</div>
        </div>
      </div>
    </div>
  );
}
