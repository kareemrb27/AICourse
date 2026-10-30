import { useMemo, useSyncExternalStore } from "react";

// Study progress lives in this browser only. A module-level copy keeps it
// working even when localStorage is blocked.
type State = {
  done: string[];
  last: Record<string, string>;
  recent: string | null;
};

const STORAGE_KEY = "aicourse-progress";
const EMPTY = JSON.stringify({ done: [], last: {}, recent: null } satisfies State);

let current: string | null = null;
const listeners = new Set<() => void>();

export const lessonKey = (course: string, lesson: string) => `${course}/${lesson}`;

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

function parse(snapshot: string): State {
  try {
    const value: Partial<State> = JSON.parse(snapshot);
    const last: Record<string, string> = {};
    if (value.last && typeof value.last === "object") {
      for (const [course, lesson] of Object.entries(value.last)) {
        if (typeof lesson === "string") last[course] = lesson;
      }
    }
    return {
      done: Array.isArray(value.done)
        ? value.done.filter((item): item is string => typeof item === "string")
        : [],
      last,
      recent: typeof value.recent === "string" ? value.recent : null,
    };
  } catch {
    return JSON.parse(EMPTY);
  }
}

function write(next: State) {
  current = JSON.stringify(next);
  try {
    localStorage.setItem(STORAGE_KEY, current);
  } catch {}
  listeners.forEach((listener) => listener());
}

export function setLessonDone(course: string, lesson: string, done: boolean) {
  const state = parse(getSnapshot());
  const key = lessonKey(course, lesson);
  const has = state.done.includes(key);
  if (done === has) return;
  write({
    ...state,
    done: done ? [...state.done, key] : state.done.filter((item) => item !== key),
  });
}

export function visitLesson(course: string, lesson: string) {
  const state = parse(getSnapshot());
  const key = lessonKey(course, lesson);
  if (state.last[course] === lesson && state.recent === key) return;
  write({ ...state, last: { ...state.last, [course]: lesson }, recent: key });
}

export type CourseLesson = { slug: string; title: string; minutes: number };

export function useProgress() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  return useMemo(() => {
    const state = parse(snapshot);
    return { done: new Set(state.done), last: state.last, recent: state.recent };
  }, [snapshot]);
}

// Where "Start" or "Continue" should take someone in a course.
export function useResume(course: string, lessons: CourseLesson[]) {
  const { done, last } = useProgress();
  return useMemo(() => {
    const finished = lessons.map((lesson) => done.has(lessonKey(course, lesson.slug)));
    const doneCount = finished.filter(Boolean).length;
    const lastIndex = lessons.findIndex((lesson) => lesson.slug === last[course]);
    const allDone = lessons.length > 0 && doneCount === lessons.length;
    let index = 0;
    if (allDone) {
      index = 0;
    } else if (lastIndex >= 0 && !finished[lastIndex]) {
      index = lastIndex;
    } else {
      const after = finished.findIndex((value, i) => i > lastIndex && !value);
      index = after >= 0 ? after : finished.indexOf(false);
    }
    return {
      lesson: lessons[index],
      index,
      doneCount,
      allDone,
      started: doneCount > 0 || lastIndex >= 0,
    };
  }, [course, lessons, done, last]);
}
