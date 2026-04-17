export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  muscleFocus: string;
  sets: number;
  reps: string;
  weightDisplay: string;
  restBetweenSets: string;
  breathingCue: string;
  formNotes: string;
  youtubeUrl?: string;
  supersetId?: string;
}

export interface WorkoutSection {
  title: string;
  exercises: Exercise[];
}

export interface WorkoutDay {
  dayNumber: 1 | 2 | 3 | 4;
  name: string;
  description: string;
  warmUp: string[];
  coolDown: string[];
  sections: WorkoutSection[];
}

export interface SuggestionsRequest {
  exercise: Exercise;
  progressionContext?: string;
}

export interface SuggestionsResponse {
  suggestion: string;
  error?: string;
}

export interface ProgressionEntry {
  timestamp: string;
  suggestion: string;
  sets: string;
  reps: string;
  weightDisplay: string;
}
