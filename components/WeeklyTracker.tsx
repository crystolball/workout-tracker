"use client";

import { useEffect, useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type WorkoutMark = "W1" | "W2" | "W3" | "W4" | null;

const CYCLE: WorkoutMark[] = ["W1", "W2", "W3", "W4", null];

const COLORS: Record<NonNullable<WorkoutMark>, string> = {
  W1: "bg-pink-500 border-pink-500 text-white",
  W2: "bg-purple-500 border-purple-500 text-white",
  W3: "bg-fuchsia-500 border-fuchsia-500 text-white",
  W4: "bg-rose-500 border-rose-500 text-white",
};

function getMondayKey(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - ((day + 6) % 7));
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function offsetWeek(mondayKey: string, weeks: number): string {
  const d = new Date(mondayKey + "T00:00:00");
  d.setDate(d.getDate() + weeks * 7);
  return d.toISOString().slice(0, 10);
}

function getDatesForWeek(mondayKey: string): Date[] {
  const monday = new Date(mondayKey + "T00:00:00");
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function formatMonthLabel(mondayKey: string): string {
  const dates = getDatesForWeek(mondayKey);
  const start = dates[0];
  const end = dates[6];
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (start.getMonth() === end.getMonth()) {
    return `${start.toLocaleDateString("en-US", { month: "long" })} ${start.getDate()}–${end.getDate()}`;
  }
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}

function loadWeek(weekKey: string): WorkoutMark[] {
  try {
    const saved = localStorage.getItem(`tracker-${weekKey}`);
    return saved ? JSON.parse(saved) : Array(7).fill(null);
  } catch {
    return Array(7).fill(null);
  }
}

export default function WeeklyTracker() {
  const currentKey = getMondayKey(new Date());
  const [viewKey, setViewKey] = useState(currentKey);
  const [marks, setMarks] = useState<WorkoutMark[]>(Array(7).fill(null));

  // Load marks whenever the viewed week changes
  useEffect(() => {
    setMarks(loadWeek(viewKey));
  }, [viewKey]);

  function toggle(index: number) {
    if (viewKey !== currentKey) return; // only edit current week
    setMarks((prev) => {
      const next = [...prev];
      const idx = CYCLE.indexOf(next[index]);
      next[index] = CYCLE[(idx + 1) % CYCLE.length];
      localStorage.setItem(`tracker-${viewKey}`, JSON.stringify(next));
      return next;
    });
  }

  function goBack() {
    setViewKey((k) => offsetWeek(k, -1));
  }

  function goForward() {
    if (viewKey < currentKey) setViewKey((k) => offsetWeek(k, 1));
  }

  const isCurrentWeek = viewKey === currentKey;
  const canGoForward = viewKey < currentKey;
  const dates = getDatesForWeek(viewKey);
  const todayStr = new Date().toISOString().slice(0, 10);

  const counts = (["W1", "W2", "W3", "W4"] as const)
    .map((w) => ({ label: w, count: marks.filter((m) => m === w).length }))
    .filter((c) => c.count > 0);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h2 className="font-bold text-gray-800 text-sm">
            {isCurrentWeek ? "This Week, babe 💕" : "Past Week 📅"}
          </h2>
          <div className="flex gap-2 text-xs text-gray-500">
            {counts.map(({ label, count }) => (
              <span key={label} className="font-semibold text-gray-600">
                {count}×{label}
              </span>
            ))}
          </div>
        </div>

        {/* Week navigator */}
        <div className="flex items-center justify-between px-4 pb-3">
          <button
            onClick={goBack}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            ◀
          </button>
          <div className="text-center">
            <div className={`text-sm font-bold ${isCurrentWeek ? "text-pink-500" : "text-gray-600"}`}>
              {formatMonthLabel(viewKey)}
            </div>
            {isCurrentWeek && (
              <div className="text-xs text-gray-400 mt-0.5">current week</div>
            )}
          </div>
          <button
            onClick={goForward}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
              canGoForward ? "hover:bg-gray-100 text-gray-500" : "text-gray-200 cursor-default"
            }`}
          >
            ▶
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 px-3 pb-4">
          {DAYS.map((day, i) => {
            const date = dates[i];
            const dateStr = date.toISOString().slice(0, 10);
            const isToday = dateStr === todayStr;
            const mark = marks[i];

            return (
              <div key={day} className="flex flex-col items-center gap-1">
                {/* Day name */}
                <span className={`text-xs font-semibold ${isToday ? "text-pink-500" : "text-gray-400"}`}>
                  {day}
                </span>
                {/* Date number */}
                <span className={`text-xs font-bold ${isToday ? "text-pink-500" : "text-gray-500"}`}>
                  {date.getDate()}
                </span>
                {/* Workout button */}
                <button
                  onClick={() => toggle(i)}
                  disabled={!isCurrentWeek}
                  className={`w-full aspect-square rounded-xl text-xs font-bold border-2 transition-all ${
                    mark
                      ? COLORS[mark]
                      : isCurrentWeek
                      ? "bg-gray-50 border-gray-200 text-gray-300 hover:border-pink-300"
                      : "bg-gray-50 border-gray-100 text-gray-200 cursor-default"
                  } ${isToday && !mark ? "border-pink-200" : ""}`}
                >
                  {mark ?? ""}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 pb-3 text-center">
          {isCurrentWeek ? "tap a day to log it 💅" : "← ▶ to browse your history"}
        </p>
      </div>
    </div>
  );
}
