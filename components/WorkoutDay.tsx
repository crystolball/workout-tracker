import { WorkoutDay as WorkoutDayType } from "@/lib/types";
import WorkoutSection from "./WorkoutSection";

interface Props {
  workout: WorkoutDayType;
}

export default function WorkoutDay({ workout }: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">{today}</p>
        <h1 className="text-4xl font-black text-gray-900 mt-1">
          Workout {workout.dayNumber} —{" "}
          <span className="text-pink-500">{workout.name}</span>
        </h1>
        <p className="text-gray-500 mt-1">{workout.description}</p>
      </div>

      {/* Warm Up */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Warm Up 🔥
        </h2>
        <ul className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-1.5">
          {workout.warmUp.map((item, i) => (
            <li key={i} className="text-sm text-rose-800 flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">🩷</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main sections */}
      {workout.sections.map((section) => (
        <WorkoutSection key={section.title} section={section} />
      ))}

      {/* Cool Down */}
      <div className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Cool Down 🪶 (feather era)
        </h2>
        <ul className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-1.5">
          {workout.coolDown.map((item, i) => (
            <li key={i} className="text-sm text-purple-800 flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">✨</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
