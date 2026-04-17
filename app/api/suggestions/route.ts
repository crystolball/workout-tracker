import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SuggestionsRequest } from "@/lib/types";

const client = new Anthropic();

const CRYSTAL_PROFILE = `
About Crystal:
- 25 year old Chinese-American female
- 5'5", 135 lbs
- Started upper body strength training 4 months ago — still building foundational strength
- Uses dumbbells at home
- Goal: gradually get stronger, improve form, make workouts progressively harder over time
`;

export async function POST(req: NextRequest) {
  try {
    const { exercise, progressionContext }: SuggestionsRequest = await req.json();

    const progressionNote = progressionContext
      ? `\nNote: Crystal has already implemented this previous suggestion and is ready for the next level: "${progressionContext}"`
      : "";

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a supportive personal trainer helping Crystal progress her workouts. Give a specific, encouraging progression tip in 2-3 sentences. Suggest ONE of: a small weight increase, 1-2 more reps or an extra set, or a technique tweak that makes it harder. Keep it realistic for someone 4 months in — small, safe steps only.
${CRYSTAL_PROFILE}
Exercise: ${exercise.name}
Muscle Focus: ${exercise.muscleGroup}
Current: ${exercise.sets} sets × ${exercise.reps} reps at ${exercise.weightDisplay}${progressionNote}`,
        },
      ],
    });

    const suggestion = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json({ error: "Failed to get suggestion" }, { status: 500 });
  }
}
