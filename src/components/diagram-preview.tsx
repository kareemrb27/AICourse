"use client";

import { useId, useRef, type ReactNode } from "react";

export function DiagramPreview({
  title,
  description,
  preview,
  detail,
  className,
}: {
  title: string;
  description: string;
  preview: ReactNode;
  detail: ReactNode;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-label={`Expand diagram: ${title}`}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="group block w-full cursor-zoom-in rounded-xl text-left"
      >
        {preview}
        <span className="flex min-h-11 items-center justify-end gap-2 text-xs text-muted group-hover:text-emerald-300">
          Explore diagram <span aria-hidden="true">↗</span>
        </span>
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-line bg-surface p-4 text-foreground shadow-2xl backdrop:bg-black/75 sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold">{title}</h2>
          <form method="dialog">
            <button type="submit" aria-label="Close diagram" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line px-3 text-sm hover:border-accent">Close</button>
          </form>
        </div>
        {detail}
        <p className="mt-4 text-sm leading-6 text-[#c1c1cf]">{description}</p>
      </dialog>
    </div>
  );
}
