# Workout Tracker

A personal workout app for Crystal's alternating Push/Pull strength training program.

## What This App Does

- Shows today's workout (Day 1: PUSH or Day 2: PULL) based on the current date
- Displays each exercise with sets, reps, weight, breathing cues, form notes, and a YouTube video link
- Highlights superset pairs visually
- Provides AI-powered progression suggestions via the Claude API

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Anthropic SDK** for AI suggestions
- Deployed on **Vercel**

## Project Structure

```
app/
  page.tsx                  # Home page — picks Day 1 or 2, renders WorkoutDay
  layout.tsx                # Root layout
  globals.css               # Tailwind base imports
  api/suggestions/route.ts  # Server endpoint that calls Claude API
components/
  WorkoutDay.tsx            # Full day layout (title, sections)
  WorkoutSection.tsx        # Section (warm-up, main, cool-down) with superset grouping
  ExerciseCard.tsx          # Single exercise card
  AISuggestions.tsx         # Client component — AI suggestion button + response
data/
  day1-push.ts              # Day 1 PUSH workout data
  day2-pull.ts              # Day 2 PULL workout data
lib/
  types.ts                  # TypeScript interfaces
  workout-utils.ts          # getWorkoutDay(date) — day alternation logic
```

## Dev Commands

```bash
npm run dev       # Start local dev server at http://localhost:3000
npm run build     # Build for production
npm run lint      # Run ESLint
```

## Environment Variables

```
ANTHROPIC_API_KEY=   # Required for AI suggestions. In .env.local locally, Vercel dashboard in prod.
```

## Day Alternation Logic

April 16, 2026 is the anchor date = Day 1 (PUSH).
Even days from anchor = Day 1, odd days = Day 2.

## Workout Data

**Day 1 — PUSH** (chest, shoulders, triceps, core)
- Bench Chest Press: 3×15 @ 15lbs
- Seated Overhead Press: 3×15 @ 4kg each
- SUPERSET: Lateral Raises (3×12 @ 3.5kg) + Suitcases Core (3×12 @ 15lbs)
- SUPERSET: Tricep Kickbacks (3×12 @ 4kg) + High Plank Dumbbell Drag (3×12 @ 15lbs)

**Day 2 — PULL** (back, biceps, core)
- Bench Supported 1-Arm Rows: 3×10 each side @ 4kg
- Bent Over Rows: 3×15 @ 4kg each
- SUPERSET: Upright Rows (3×10-12 @ 4kg) + Mountain Climbers (3×12 bodyweight)
- SUPERSET: Bicep Curls (3×12-15 @ 3.5kg) + Russian Twists (3×12 @ 15lbs)
