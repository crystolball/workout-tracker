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
          <span className="text-indigo-600">{workout.name}</span>
        </h1>
        <p className="text-gray-500 mt-1">{workout.description}</p>
      </div>

      {/* Warm Up */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Warm Up
        </h2>
        <ul className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-1.5">
          {workout.warmUp.map((item, i) => (
            <li key={i} className="text-sm text-green-800 flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
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
          Cool Down
        </h2>
        <ul className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-1.5">
          {workout.coolDown.map((item, i) => (
            <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
