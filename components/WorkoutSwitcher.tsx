"use client";

import { useState, useEffect } from "react";
import day1Push from "@/data/day1-push";
import day2Pull from "@/data/day2-pull";
import day3PushAlt from "@/data/day3-push-alt";
import day4PullAlt from "@/data/day4-pull-alt";
import WorkoutDay from "./WorkoutDay";
import WeeklyTracker from "./WeeklyTracker";
import { WorkoutDay as WorkoutDayType } from "@/lib/types";
import { generateWorkout } from "@/lib/workout-generator";

const STATIC_WORKOUTS: WorkoutDayType[] = [day1Push, day2Pull, day3PushAlt, day4PullAlt];
const CUSTOM_KEY = "custom-workouts";

export default function WorkoutSwitcher() {
  const [selected, setSelected] = useState<number>(0);
  const [customWorkouts, setCustomWorkouts] = useState<WorkoutDayType[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CUSTOM_KEY);
    if (saved) {
      try {
        setCustomWorkouts(JSON.parse(saved));
      } catch {
        // ignore corrupt data
      }
    }
  }, []);

  const allWorkouts = [...STATIC_WORKOUTS, ...customWorkouts];
  const workout = allWorkouts[selected];

  function addWorkout(type: "push" | "pull") {
    const existingOfType = allWorkouts.filter((w) =>
      type === "push" ? w.name.toUpperCase().includes("PUSH") : w.name.toUpperCase().includes("PULL")
    ).length;
    const workoutNumber = allWorkouts.length + 1;
    const newWorkout = generateWorkout(type, workoutNumber, existingOfType);
    const updated = [...customWorkouts, newWorkout];
    setCustomWorkouts(updated);
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(updated));
    setSelected(allWorkouts.length); // select the newly added workout
    setShowModal(false);
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {allWorkouts.map((w, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
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
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2 rounded-xl text-sm font-semibold text-pink-500 border-2 border-dashed border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-all"
          >
            + Add New Workout
          </button>
        </div>
      </div>

      <WeeklyTracker />
      <WorkoutDay workout={workout} />

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-gray-900 text-lg mb-1">Add Workout {allWorkouts.length + 1}</h3>
            <p className="text-gray-500 text-sm mb-5">
              Exercises sourced from Delavier&apos;s Women&apos;s Strength Training Anatomy. What type?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => addWorkout("push")}
                className="py-5 bg-pink-50 border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-100 text-pink-700 font-bold rounded-xl transition-all"
              >
                <div className="text-2xl mb-1">💅</div>
                <div>PUSH</div>
                <div className="text-xs font-normal text-pink-400 mt-0.5">chest · shoulders · triceps</div>
              </button>
              <button
                onClick={() => addWorkout("pull")}
                className="py-5 bg-purple-50 border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-100 text-purple-700 font-bold rounded-xl transition-all"
              >
                <div className="text-2xl mb-1">☕</div>
                <div>PULL</div>
                <div className="text-xs font-normal text-purple-400 mt-0.5">back · biceps · rear delts</div>
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
