"use client";

import { useState, useEffect, useRef } from "react";

const DURATIONS = [30, 45, 60, 90, 120];

export default function RestTimer({ defaultSeconds = 60 }: { defaultSeconds?: number }) {
  const [duration, setDuration] = useState(defaultSeconds);
  const [remaining, setRemaining] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function start() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRemaining(duration);
    setIsDone(false);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          setIsDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function finish() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsDone(false);
    setRemaining(duration);
  }

  function changeDuration(val: number) {
    setDuration(val);
    setRemaining(val);
    setIsDone(false);
  }

  const pct = remaining / duration;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = mins > 0 ? `${mins}:${String(secs).padStart(2, "0")}` : `${secs}s`;

  return (
    <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2 my-2">
      <span className="text-xs font-bold uppercase tracking-wide text-indigo-400 shrink-0">Rest</span>

      {!isRunning && !isDone && (
        <select
          value={duration}
          onChange={(e) => changeDuration(Number(e.target.value))}
          className="text-xs bg-white border border-indigo-200 rounded-lg px-2 py-1 text-indigo-700 font-semibold cursor-pointer"
        >
          {DURATIONS.map((s) => (
            <option key={s} value={s}>
              {s}s
            </option>
          ))}
        </select>
      )}

      {(isRunning || isDone) && (
        <span
          className={`text-base font-bold tabular-nums w-12 ${isDone ? "text-green-600" : "text-indigo-700"}`}
        >
          {isDone ? "🎉" : display}
        </span>
      )}

      {isRunning && (
        <div className="flex-1 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-400 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${pct * 100}%` }}
          />
        </div>
      )}

      {isDone && (
        <span className="flex-1 text-xs text-green-600 font-semibold">Rest done!</span>
      )}

      <div className="ml-auto flex gap-1.5 shrink-0">
        {!isRunning && (
          <button
            onClick={start}
            className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            {isDone ? "Again" : "Start"}
          </button>
        )}
        {isRunning && (
          <button
            onClick={finish}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
