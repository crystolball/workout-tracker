import { WorkoutSection as WorkoutSectionType } from "@/lib/types";
import ExerciseCard from "./ExerciseCard";

interface Props {
  section: WorkoutSectionType;
}

export default function WorkoutSection({ section }: Props) {
  const exercises = section.exercises;

  // Group exercises: collect supersets together, leave standalone as-is
  const groups: Array<{ supersetId?: string; exercises: typeof exercises }> = [];
  const seen = new Set<string>();

  for (const exercise of exercises) {
    if (exercise.supersetId && !seen.has(exercise.supersetId)) {
      const partners = exercises.filter((e) => e.supersetId === exercise.supersetId);
      partners.forEach((e) => seen.add(e.supersetId!));
      groups.push({ supersetId: exercise.supersetId, exercises: partners });
    } else if (!exercise.supersetId) {
      groups.push({ exercises: [exercise] });
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
        {section.title}
      </h2>
      <div className="space-y-4">
        {groups.map((group) =>
          group.supersetId ? (
            <div
              key={group.supersetId}
              className="border-2 border-pink-200 rounded-2xl p-3 bg-pink-50"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-3 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-400"></span>
                💜 Superset Slay — do both back to back, then rest
              </div>
              <div className="space-y-3">
                {group.exercises.map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} hideRest />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-pink-500 font-medium">
                <span>⏱</span>
                <span>Rest {group.exercises[0].restBetweenSets} after the full superset</span>
              </div>
            </div>
          ) : (
            <ExerciseCard key={group.exercises[0].id} exercise={group.exercises[0]} />
          )
        )}
      </div>
    </div>
  );
}
