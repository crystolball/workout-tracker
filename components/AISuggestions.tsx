"use client";

import { useState } from "react";
import { Exercise, ProgressionEntry } from "@/lib/types";

interface Props {
  exercise: Exercise;
  currentSets: string;
  currentReps: string;
  currentWeight: string;
  onProgressionSaved: (entry: ProgressionEntry) => void;
}

type Stage = "idle" | "loading" | "suggested" | "accepted" | "upgrading" | "update-form";

export default function AISuggestions({
  exercise,
  currentSets,
  currentReps,
  currentWeight,
  onProgressionSaved,
}: Props) {
  const [stage, setStage] = useState<Stage>("idle");
  const [suggestion, setSuggestion] = useState("");
  const [harderSuggestion, setHarderSuggestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editSets, setEditSets] = useState(currentSets);
  const [editReps, setEditReps] = useState(currentReps);
  const [editWeight, setEditWeight] = useState(currentWeight);

  async function fetchSuggestion(progressionContext?: string): Promise<string> {
    const res = await fetch("/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercise: {
          ...exercise,
          sets: parseInt(currentSets) || exercise.sets,
          reps: currentReps,
          weightDisplay: currentWeight,
        },
        progressionContext,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.suggestion as string;
  }

  async function handleGetSuggestion() {
    setStage("loading");
    setError(null);
    try {
      const text = await fetchSuggestion();
      setSuggestion(text);
      setStage("suggested");
    } catch {
      setError("Could not load suggestion. Check your API key.");
      setStage("idle");
    }
  }

  async function handleGoHarder() {
    setStage("upgrading");
    setError(null);
    try {
      const text = await fetchSuggestion(suggestion);
      setHarderSuggestion(text);
      setEditSets(currentSets);
      setEditReps(currentReps);
      setEditWeight(currentWeight);
      setStage("update-form");
    } catch {
      setError("Could not load suggestion. Check your API key.");
      setStage("accepted");
    }
  }

  function handleSave() {
    const entry: ProgressionEntry = {
      timestamp: new Date().toISOString(),
      suggestion: harderSuggestion,
      sets: editSets,
      reps: editReps,
      weightDisplay: editWeight,
    };
    onProgressionSaved(entry);
    setStage("idle");
    setSuggestion("");
    setHarderSuggestion("");
  }

  function handleDismiss() {
    setStage("idle");
    setSuggestion("");
    setHarderSuggestion("");
    setError(null);
  }

  return (
    <div className="w-full mt-1">
      {error && <p className="text-xs text-red-500 mb-1">{error}</p>}

      {stage === "idle" && (
        <button
          onClick={handleGetSuggestion}
          className="inline-flex items-center gap-1.5 text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 rounded-lg px-3 py-1.5 font-medium transition-colors"
        >
          ✦ Too easy? Take it to the next level
        </button>
      )}

      {(stage === "loading" || stage === "upgrading") && (
        <div className="inline-flex items-center gap-1.5 text-sm text-indigo-400 py-1.5">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {stage === "upgrading" ? "Getting next level..." : "Getting suggestion..."}
        </div>
      )}

      {stage === "suggested" && (
        <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-xl p-3">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">✦ AI Suggestion</div>
          <p className="text-sm text-indigo-900 mb-3">{suggestion}</p>
          <div className="flex gap-2">
            <button onClick={() => setStage("accepted")} className="text-xs bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors">
              I&apos;ve done this!
            </button>
            <button onClick={handleDismiss} className="text-xs text-indigo-400 hover:text-indigo-600 px-2 py-1.5">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {stage === "accepted" && (
        <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-3">
          <div className="text-xs font-bold uppercase tracking-widest text-green-500 mb-1">Progress noted!</div>
          <p className="text-sm text-green-800 mb-3">{suggestion}</p>
          <div className="flex gap-2">
            <button onClick={handleGoHarder} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors">
              Ready to go harder ✦
            </button>
            <button onClick={handleDismiss} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5">
              Done
            </button>
          </div>
        </div>
      )}

      {stage === "update-form" && (
        <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-xl p-3">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">✦ Next Level</div>
          <p className="text-sm text-indigo-900 mb-3">{harderSuggestion}</p>
          <p className="text-xs text-indigo-600 font-medium mb-2">Update your exercise to your new targets:</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Sets</label>
              <input
                type="text"
                value={editSets}
                onChange={(e) => setEditSets(e.target.value)}
                className="w-full border border-indigo-200 rounded-lg px-2 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Reps</label>
              <input
                type="text"
                value={editReps}
                onChange={(e) => setEditReps(e.target.value)}
                className="w-full border border-indigo-200 rounded-lg px-2 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Weight</label>
              <input
                type="text"
                value={editWeight}
                onChange={(e) => setEditWeight(e.target.value)}
                className="w-full border border-indigo-200 rounded-lg px-2 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors">
              Save progress
            </button>
            <button onClick={handleDismiss} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
