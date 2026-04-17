"use client";

import { useState, useEffect } from "react";
import { Exercise, ProgressionEntry } from "@/lib/types";
import AISuggestions from "./AISuggestions";

interface Props {
  exercise: Exercise;
  hideRest?: boolean;
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1).split("?")[0];
    } else if (u.pathname.startsWith("/shorts/")) {
      videoId = u.pathname.replace("/shorts/", "").split("?")[0];
    } else if (u.searchParams.has("v")) {
      videoId = u.searchParams.get("v");
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " at " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function ExerciseCard({ exercise, hideRest = false }: Props) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [history, setHistory] = useState<ProgressionEntry[]>([]);
  const [editingNotes, setEditingNotes] = useState(false);
  const [customNotes, setCustomNotes] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`progression-${exercise.id}`);
    if (saved) setHistory(JSON.parse(saved));
    const savedNotes = localStorage.getItem(`form-notes-${exercise.id}`);
    if (savedNotes) setCustomNotes(savedNotes);
  }, [exercise.id]);

  function startEditingNotes() {
    setNotesDraft(customNotes ?? exercise.formNotes);
    setEditingNotes(true);
  }

  function saveNotes() {
    setCustomNotes(notesDraft);
    localStorage.setItem(`form-notes-${exercise.id}`, notesDraft);
    setEditingNotes(false);
  }

  function resetNotes() {
    setCustomNotes(null);
    localStorage.removeItem(`form-notes-${exercise.id}`);
    setEditingNotes(false);
  }

  const latest = history.at(-1);
  const currentSets = latest?.sets ?? String(exercise.sets);
  const currentReps = latest?.reps ?? exercise.reps;
  const currentWeight = latest?.weightDisplay ?? exercise.weightDisplay;
  const isProgressed = history.length > 0;

  function handleProgressionSaved(entry: ProgressionEntry) {
    const updated = [...history, entry];
    setHistory(updated);
    localStorage.setItem(`progression-${exercise.id}`, JSON.stringify(updated));
  }

  return (
    <div className={`bg-white rounded-xl border p-4 shadow-sm ${isProgressed ? "border-green-300" : "border-gray-200"}`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-lg">{exercise.name}</h3>
            {isProgressed && (
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                Improved
              </span>
            )}
          </div>
          <span className="inline-block text-xs font-medium bg-pink-100 text-pink-600 rounded-full px-2 py-0.5 mt-1">
            {exercise.muscleGroup}
          </span>
          <p className="text-xs text-gray-400 mt-1 leading-snug">{exercise.muscleFocus}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-pink-500">{currentSets}</div>
          <div className="text-xs text-gray-500">sets</div>
        </div>
      </div>

      <div className={`grid gap-2 mb-3 text-sm ${hideRest ? "grid-cols-2" : "grid-cols-3"}`}>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <div className="font-semibold text-gray-800">{currentReps}</div>
          <div className="text-xs text-gray-500">reps</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <div className="font-semibold text-gray-800 truncate">{currentWeight}</div>
          <div className="text-xs text-gray-500">weight</div>
        </div>
        {!hideRest && (
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-800">{exercise.restBetweenSets}</div>
            <div className="text-xs text-gray-500">rest</div>
          </div>
        )}
      </div>

      <button
        onClick={() => setNotesOpen(!notesOpen)}
        className="w-full text-left text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2"
      >
        <span>{notesOpen ? "▾" : "▸"}</span>
        <span>Breathing & Glow-Up Notes 🌸</span>
      </button>

      {notesOpen && (
        <div className="text-sm space-y-2 mb-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="font-medium text-blue-800 mb-1">Breathing</div>
            <p className="text-blue-700">{exercise.breathingCue}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium text-amber-800">Form Notes</div>
              {!editingNotes && (
                <div className="flex gap-2">
                  <button onClick={startEditingNotes} className="text-xs text-amber-500 hover:text-amber-700">
                    Edit
                  </button>
                  {customNotes && (
                    <button onClick={resetNotes} className="text-xs text-gray-400 hover:text-gray-600">
                      Reset
                    </button>
                  )}
                </div>
              )}
            </div>
            {editingNotes ? (
              <div>
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  rows={4}
                  className="w-full text-sm text-amber-900 bg-white border border-amber-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={saveNotes} className="text-xs bg-amber-500 hover:bg-amber-600 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors">
                    Save
                  </button>
                  <button onClick={() => setEditingNotes(false)} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-amber-700">{customNotes ?? exercise.formNotes}</p>
            )}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mb-3">
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className="w-full text-left text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
          >
            <span>{historyOpen ? "▾" : "▸"}</span>
            <span>{history.length} improvement{history.length > 1 ? "s" : ""} logged</span>
          </button>
          {historyOpen && (
            <div className="mt-2 space-y-2">
              {/* Starting baseline — always first */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs">
                <div className="text-gray-400 font-medium mb-1">Starting point</div>
                <div className="text-gray-700 font-semibold">
                  {exercise.sets} sets × {exercise.reps} reps @ {exercise.weightDisplay}
                </div>
              </div>
              {history.map((entry, i) => (
                <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs">
                  <div className="text-green-500 font-medium mb-1">{formatTimestamp(entry.timestamp)}</div>
                  <div className="text-green-800 font-semibold mb-1">
                    {entry.sets} sets × {entry.reps} reps @ {entry.weightDisplay}
                  </div>
                  <p className="text-green-700 italic">{entry.suggestion}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {exercise.youtubeUrl && (() => {
        const embedUrl = getYouTubeEmbedUrl(exercise.youtubeUrl);
        if (!embedUrl) return null;
        return (
          <div className="mt-2">
            <button
              onClick={() => setVideoOpen(!videoOpen)}
              className="inline-flex items-center gap-1.5 text-sm bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg px-3 py-1.5 font-medium transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.13a8.16 8.16 0 004.77 1.52V7.2a4.85 4.85 0 01-1-.51z" />
              </svg>
              {videoOpen ? "Hide Video" : "Watch Video"}
            </button>
            {videoOpen && (
              <div className="mt-2 rounded-xl overflow-hidden aspect-video">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        );
      })()}

      <AISuggestions
        exercise={exercise}
        currentSets={currentSets}
        currentReps={currentReps}
        currentWeight={currentWeight}
        onProgressionSaved={handleProgressionSaved}
      />
    </div>
  );
}
