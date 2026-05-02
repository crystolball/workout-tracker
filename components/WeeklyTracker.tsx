"use client";

import { useEffect, useState, useRef } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type WorkoutMark = "W1" | "W2" | "W3" | "W4" | null;

const CYCLE: WorkoutMark[] = ["W1", "W2", "W3", "W4", null];

const COLORS: Record<NonNullable<WorkoutMark>, string> = {
  W1: "bg-pink-500 border-pink-500 text-white",
  W2: "bg-purple-500 border-purple-500 text-white",
  W3: "bg-fuchsia-500 border-fuchsia-500 text-white",
  W4: "bg-rose-500 border-rose-500 text-white",
};

const DOT_COLORS: Record<NonNullable<WorkoutMark>, string> = {
  W1: "bg-pink-400",
  W2: "bg-purple-400",
  W3: "bg-fuchsia-400",
  W4: "bg-rose-400",
};

function getMondayKey(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - ((day + 6) % 7));
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function getCurrentWeekKey(): string {
  return getMondayKey(new Date());
}

function formatWeekLabel(mondayKey: string): string {
  const monday = new Date(mondayKey + "T00:00:00");
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${monday.toLocaleDateString("en-US", opts)} – ${sunday.toLocaleDateString("en-US", opts)}`;
}

function loadAllWeeks(): Record<string, WorkoutMark[]> {
  const result: Record<string, WorkoutMark[]> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!;
    if (key.startsWith("tracker-")) {
      const weekKey = key.slice("tracker-".length);
      try {
        result[weekKey] = JSON.parse(localStorage.getItem(key)!);
      } catch {
        // skip corrupt data
      }
    }
  }
  return result;
}

export default function WeeklyTracker() {
  const [allWeeks, setAllWeeks] = useState<Record<string, WorkoutMark[]>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentKey = getCurrentWeekKey();

  useEffect(() => {
    const data = loadAllWeeks();
    if (!data[currentKey]) data[currentKey] = Array(7).fill(null);
    setAllWeeks(data);
  }, [currentKey]);

  // Scroll to the end (current week) on load
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [allWeeks]);

  function toggle(weekKey: string, index: number) {
    setAllWeeks((prev) => {
      const weekMarks = [...(prev[weekKey] ?? Array(7).fill(null))];
      const currentIdx = CYCLE.indexOf(weekMarks[index]);
      weekMarks[index] = CYCLE[(currentIdx + 1) % CYCLE.length];
      localStorage.setItem(`tracker-${weekKey}`, JSON.stringify(weekMarks));
      return { ...prev, [weekKey]: weekMarks };
    });
  }

  const sortedKeys = Object.keys(allWeeks).sort();
  const weeks = sortedKeys.includes(currentKey) ? sortedKeys : [...sortedKeys, currentKey];

  const currentMarks = allWeeks[currentKey] ?? Array(7).fill(null);
  const counts = (["W1", "W2", "W3", "W4"] as const)
    .map((w) => ({ label: w, count: currentMarks.filter((m) => m === w).length }))
    .filter((c) => c.count > 0);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800 text-sm">This Week, babe 💕</h2>
          <div className="flex gap-3 text-xs text-gray-500">
            {counts.map(({ label, count }) => (
              <span key={label} className="flex items-center gap-1">
                <span className={`inline-block w-2 h-2 rounded-full ${DOT_COLORS[label]}`} />
                <span className="font-semibold">{count}</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Horizontal scroll of all weeks */}
        <div ref={scrollRef} className="overflow-x-auto pb-1">
          <div className="flex gap-5" style={{ minWidth: "max-content" }}>
            {weeks.map((weekKey) => {
              const marks = allWeeks[weekKey] ?? Array(7).fill(null);
              const isCurrentWeek = weekKey === currentKey;
              const hasAnyMark = marks.some((m) => m !== null);

              return (
                <div key={weekKey} className="flex-shrink-0">
                  {/* Week date label */}
                  <div
                    className={`text-xs font-semibold text-center mb-2 px-1 ${
                      isCurrentWeek ? "text-pink-500" : "text-gray-400"
                    }`}
                  >
                    {formatWeekLabel(weekKey)}
                    {isCurrentWeek && <span className="ml-1">✨</span>}
                  </div>

                  {/* Day grid */}
                  <div className="flex gap-1">
                    {DAYS.map((day, i) => (
                      <div key={day} className="flex flex-col items-center gap-0.5 w-9">
                        <span className="text-xs text-gray-400 font-medium">{day}</span>
                        <button
                          onClick={() => isCurrentWeek && toggle(weekKey, i)}
                          title={
                            isCurrentWeek
                              ? "Click to cycle: empty → W1 → W2 → W3 → W4 → empty"
                              : formatWeekLabel(weekKey)
                          }
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border-2 ${
                            marks[i]
                              ? COLORS[marks[i]!]
                              : isCurrentWeek
                              ? "bg-gray-50 border-gray-200 text-gray-300 hover:border-pink-300 cursor-pointer"
                              : "bg-gray-50 border-gray-100 text-gray-200 cursor-default"
                          }`}
                        >
                          {marks[i] ?? ""}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Week summary */}
                  {!isCurrentWeek && hasAnyMark && (
                    <div className="mt-1.5 flex justify-center gap-1">
                      {(["W1", "W2", "W3", "W4"] as const).map((w) => {
                        const c = marks.filter((m) => m === w).length;
                        return c > 0 ? (
                          <span
                            key={w}
                            className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                              w === "W1"
                                ? "bg-pink-100 text-pink-600"
                                : w === "W2"
                                ? "bg-purple-100 text-purple-600"
                                : w === "W3"
                                ? "bg-fuchsia-100 text-fuchsia-600"
                                : "bg-rose-100 text-rose-600"
                            }`}
                          >
                            {c}×{w}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          tap this week to slay 💅 · scroll left to see your history
        </p>
      </div>
    </div>
  );
}
