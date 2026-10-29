"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

export type BoardItem = {
  key: string;
  title: string;
  sub: string;
  after: string;
  href?: string;
  meta?: string;
};

export type BoardStage = {
  id: number;
  name: string;
  level: string;
  blurb: string;
  items: BoardItem[];
};

const STORAGE_KEY = "aicourse-path-done";
const EMPTY = "[]";

// Progress lives in this browser only. A module-level copy keeps toggles
// working even when localStorage is blocked.
let current: string | null = null;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (current === null) {
    try {
      current = localStorage.getItem(STORAGE_KEY) ?? EMPTY;
    } catch {
      current = EMPTY;
    }
  }
  return current;
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      current = null;
      onChange();
    }
  };
  listeners.add(onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function writeDone(keys: string[]) {
  current = JSON.stringify(keys);
  try {
    localStorage.setItem(STORAGE_KEY, current);
  } catch {}
  listeners.forEach((listener) => listener());
}

function parse(snapshot: string): string[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function Item({
  item,
  number,
  done,
  onToggle,
}: {
  item: BoardItem;
  number: string;
  done: boolean;
  onToggle: (key: string) => void;
}) {
  const ready = Boolean(item.href);
  return (
    <li className="border-b border-line py-4 last:border-b-0">
      <div className="flex items-baseline gap-3">
        <span className="label w-5 shrink-0">{number}</span>
        <h4 className="flex-1 text-[15px] font-semibold leading-snug">
          {item.href ? (
            <Link href={item.href} className="hover:text-accent">
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h4>
        <span
          className={`label shrink-0 ${done || ready ? "text-accent" : ""}`}
        >
          {done ? "✓ Done" : ready ? "Ready" : "Planned"}
        </span>
      </div>
      <div className="pl-8">
        <p className="mt-1 text-[13px] text-muted">
          {item.sub}
          {item.meta ? ` · ${item.meta}` : ""}
        </p>
        <p className="mt-2 text-[14px] leading-6 text-[#d6d6de]">
          <span className="text-muted">After this you can: </span>
          {item.after}
        </p>
        {ready ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={item.href!}
              className="label inline-flex min-h-11 items-center rounded border border-line px-3 text-foreground hover:border-accent"
            >
              Open course
            </Link>
            <button
              type="button"
              aria-pressed={done}
              onClick={() => onToggle(item.key)}
              className={`label inline-flex min-h-11 items-center rounded border px-3 hover:border-accent ${
                done
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-line text-foreground"
              }`}
            >
              {done ? "Completed" : "Mark as done"}
              <span className="sr-only"> {item.title}</span>
            </button>
          </div>
        ) : null}
      </div>
    </li>
  );
}

export function PathBoard({
  stages,
  final,
  electives,
}: {
  stages: BoardStage[];
  final: BoardItem;
  electives: BoardItem[];
}) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const doneKeys = new Set(parse(snapshot));
  const isDone = (key: string) => doneKeys.has(key);

  function toggle(key: string) {
    const next = new Set(doneKeys);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    writeDone([...next]);
  }

  const stageFractions = stages.map(
    (stage) =>
      stage.items.filter((item) => isDone(item.key)).length /
      stage.items.length,
  );
  const levels = [...stageFractions, isDone(final.key) ? 1 : 0];
  const firstOpen = levels.findIndex((value) => value < 1);
  const active = firstOpen === -1 ? levels.length - 1 : firstOpen;
  const progress = levels.reduce((sum, value) => sum + value, 0);
  const levelNames = [...stages.map((s) => s.level), "Solution designer"];

  const allItems = [...stages.flatMap((s) => s.items), final];
  const doneCount = allItems.filter((item) => isDone(item.key)).length;
  const readyCount = allItems.filter((item) => item.href).length;

  const offsets = stages.map((_, index) =>
    stages.slice(0, index).reduce((sum, s) => sum + s.items.length, 0),
  );

  return (
    <div>
      <ol
        aria-label="Learning levels"
        className="relative mb-8 grid grid-cols-4"
      >
        <span
          aria-hidden
          className="absolute left-[12.5%] right-[12.5%] top-[17px] h-0.5 bg-line"
        />
        <span
          aria-hidden
          className="absolute left-[12.5%] top-[17px] h-0.5 bg-accent transition-[width]"
          style={{ width: `calc(75% * ${Math.min(3, progress) / 3})` }}
        />
        {levelNames.map((name, index) => {
          const complete = levels[index] >= 1;
          const isActive = index === active && !complete;
          return (
            <li
              key={name}
              className="relative px-1 text-center"
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className={`mx-auto mb-2 flex size-9 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold ${
                  complete
                    ? "border-accent bg-accent text-[#04231a]"
                    : isActive
                      ? "border-accent bg-surface text-accent shadow-[0_0_0_5px_var(--accent-dim)]"
                      : "border-line bg-surface text-muted"
                }`}
              >
                {complete ? "✓" : index + 1}
              </div>
              <div className="text-xs font-semibold sm:text-[15px]">{name}</div>
              <div className="label mt-0.5 hidden !text-[11px] sm:block">
                {index < stages.length ? stages[index].name : "Final course"}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="label mb-4 flex flex-wrap gap-x-5 gap-y-1">
        <span>{readyCount} available now</span>
        <span>{allItems.length - readyCount} planned</span>
        <span>
          {doneCount} of {allItems.length} complete
        </span>
      </p>

      <div className="grid items-start gap-4 lg:grid-cols-3">
        {stages.map((stage, index) => {
          const done = stage.items.filter((item) => isDone(item.key)).length;
          return (
            <section
              key={stage.id}
              aria-labelledby={`stage-${stage.id}`}
              className={`rounded-lg border border-line bg-surface p-5 ${
                index === 1 ? "lg:mt-7" : index === 2 ? "lg:mt-14" : ""
              }`}
            >
              <p className="label">Stage {stage.id}</p>
              <h3
                id={`stage-${stage.id}`}
                className="mt-1 text-[22px] font-extrabold tracking-tight"
              >
                {stage.name}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">{stage.blurb}</p>
              <div
                aria-hidden
                className="mt-3 h-1 overflow-hidden rounded-full bg-line"
              >
                <div
                  className="h-full bg-accent transition-[width]"
                  style={{ width: `${stageFractions[index] * 100}%` }}
                />
              </div>
              <p className="label mt-2">
                {done} of {stage.items.length} complete
              </p>
              <ul className="mt-3 border-t border-line">
                {stage.items.map((item, itemIndex) => (
                  <Item
                    key={item.key}
                    item={item}
                    number={String(offsets[index] + itemIndex + 1)}
                    done={isDone(item.key)}
                    onToggle={toggle}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section
        aria-labelledby="final-course"
        className="mt-5 rounded-lg border-2 border-accent bg-gradient-to-b from-accent-dim to-surface p-6"
      >
        <p className="label">Final course · Level 4, solution designer</p>
        <h3
          id="final-course"
          className="mt-2 text-[26px] font-extrabold tracking-tight"
        >
          {final.title}
        </h3>
        <p className="mt-2 max-w-3xl leading-7 text-[#d6d6de]">
          {final.after} This is where you start to think in AI.
        </p>
        <p
          className={`label mt-4 ${isDone(final.key) || final.href ? "text-accent" : ""}`}
        >
          {isDone(final.key) ? "✓ Done" : final.href ? "Ready" : "Planned"}
          {final.meta ? ` · ${final.meta}` : ""}
        </p>
        {final.href ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={final.href}
              className="label inline-flex min-h-11 items-center rounded border border-accent bg-accent px-4 !text-black hover:opacity-90"
            >
              Open the final course
            </Link>
            <button
              type="button"
              aria-pressed={isDone(final.key)}
              onClick={() => toggle(final.key)}
              className={`label inline-flex min-h-11 items-center rounded border px-3 hover:border-accent ${
                isDone(final.key)
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-line text-foreground"
              }`}
            >
              {isDone(final.key) ? "Completed" : "Mark as done"}
              <span className="sr-only"> {final.title}</span>
            </button>
          </div>
        ) : null}
      </section>

      <section
        aria-labelledby="electives"
        className="mt-5 rounded-lg border border-dashed border-line p-6"
      >
        <p id="electives" className="label">
          Specialize after the path (pick any)
        </p>
        <ul className="mt-2 grid gap-x-8 md:grid-cols-3">
          {electives.map((item) => (
            <Item
              key={item.key}
              item={item}
              number="+"
              done={isDone(item.key)}
              onToggle={toggle}
            />
          ))}
        </ul>
      </section>

      <p className="label mt-6 leading-6">
        Your progress is saved in this browser only. Nothing is sent anywhere.
      </p>
    </div>
  );
}
