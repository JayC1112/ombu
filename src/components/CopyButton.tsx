"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-card ${className}`}
      title="Copy address"
    >
      {copied ? (
        <>
          <Check size={16} className="text-green-500" />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} />
          Copy
        </>
      )}
    </button>
  );
}
