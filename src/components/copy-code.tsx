"use client";

import { useEffect, useRef, useState } from "react";

export function CopyCode({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-3">
      <span role="status" className="text-xs text-muted">
        {status === "failed"
          ? "Select the code to copy manually."
          : status === "copied" ? "Copied!" : ""}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="min-h-11 rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
      >
        Copy <span aria-hidden="true">⧉</span>
      </button>
    </div>
  );
}
