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

const COUNT_COLORS: Record<NonNullable<WorkoutMark>, string> = {
  W1: "text-pink-600",
  W2: "text-purple-600",
  W3: "text-fuchsia-600",
  W4: "text-rose-600",
};

function getWeekKey() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  return monday.toISOString().slice(0, 10);
}

export default function WeeklyTracker() {
  const [marks, setMarks] = useState<WorkoutMark[]>(Array(7).fill(null));

  useEffect(() => {
    const saved = localStorage.getItem(`tracker-${getWeekKey()}`);
    if (saved) setMarks(JSON.parse(saved));
  }, []);

  function toggle(index: number) {
    setMarks((prev) => {
      const next = [...prev];
      const currentIdx = CYCLE.indexOf(next[index]);
      next[index] = CYCLE[(currentIdx + 1) % CYCLE.length];
      localStorage.setItem(`tracker-${getWeekKey()}`, JSON.stringify(next));
      return next;
    });
  }

  const counts = (["W1", "W2", "W3", "W4"] as const).map((w) => ({
    label: w,
    count: marks.filter((m) => m === w).length,
  }));

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800 text-sm">This Week, babe 💕</h2>
          <div className="flex gap-3 text-xs text-gray-500">
            {counts.filter((c) => c.count > 0).map(({ label, count }) => (
              <span key={label}>
                <span className={`font-semibold ${COUNT_COLORS[label]}`}>{count}</span> {label}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {DAYS.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400 font-medium">{day}</span>
              <button
                onClick={() => toggle(i)}
                title="Click to cycle: empty → W1 → W2 → W3 → W4 → empty"
                className={`w-full aspect-square rounded-xl text-xs font-bold transition-all border-2 ${
                  marks[i] ? COLORS[marks[i]!] : "bg-gray-50 border-gray-200 text-gray-300 hover:border-gray-300"
                }`}
              >
                {marks[i] ?? ""}
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          tap a day to slay 💅 cycles W1 → W2 → W3 → W4 → clear
        </p>
      </div>
    </div>
  );
}
