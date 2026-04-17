"use client";

import { useState } from "react";
import day1Push from "@/data/day1-push";
import day2Pull from "@/data/day2-pull";
import day3PushAlt from "@/data/day3-push-alt";
import day4PullAlt from "@/data/day4-pull-alt";
import WorkoutDay from "./WorkoutDay";
import WeeklyTracker from "./WeeklyTracker";

const workouts = [day1Push, day2Pull, day3PushAlt, day4PullAlt];

export default function WorkoutSwitcher() {
  const [selected, setSelected] = useState<0 | 1 | 2 | 3>(0);
  const workout = workouts[selected];

  return (
    <div>
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-2">
            {workouts.map((w, i) => (
              <button
                key={i}
                onClick={() => setSelected(i as 0 | 1 | 2 | 3)}
                className={`py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  selected === i
                    ? "bg-pink-500 text-white shadow-sm"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-pink-300"
                }`}
              >
                Workout {w.dayNumber} — {w.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <WeeklyTracker />
      <WorkoutDay workout={workout} />
    </div>
  );
}
