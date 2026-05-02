import { WorkoutDay } from "./types";

const PUSH_NAMES = [
  "Cherry Blossom PUSH 🌸",
  "Glitter PUSH ✨",
  "Boss Babe PUSH 💪",
  "Power Hour PUSH 🔥",
  "Pink Power PUSH 🩷",
];

const PULL_NAMES = [
  "Velvet PULL 🫧",
  "Siren PULL 🌊",
  "Goddess PULL 💜",
  "Midnight PULL 🌙",
  "Silk PULL 🎀",
];

const WARM_UP = [
  "5 min walk or light jog in place",
  "Arm circles — 10 forward, 10 back",
  "Shoulder rolls — 10 each direction",
  "Hip circles — 10 each direction",
  "Cat-cow stretches — 8 reps",
];

const COOL_DOWN = [
  "Child's pose — 30 seconds",
  "Chest opener stretch — 30 seconds each side",
  "Cross-body shoulder stretch — 20 seconds each side",
  "Seated forward fold — 30 seconds",
  "Happy baby pose — 30 seconds",
];

const PUSH_TEMPLATES: Array<WorkoutDay["sections"]> = [
  // Template A — Chest & Shoulder Sculpt
  [
    {
      title: "Chest & Shoulder Sculpt",
      exercises: [
        {
          id: "gen-push-a-1",
          name: "Dumbbell Chest Flyes",
          muscleGroup: "Pectorals",
          muscleFocus: "Pectoralis major (outer chest) — the stretch position activates more fibers than pressing",
          sets: 3,
          reps: "12",
          weightDisplay: "5 lbs",
          restBetweenSets: "60 sec",
          breathingCue: "Inhale as arms open wide, exhale as you bring them back together",
          formNotes:
            "Lie on flat bench, soft bend in elbows throughout. Arc arms out like you're hugging a giant tree. Feel the stretch at the bottom — that's where the magic happens. Keep wrists neutral, elbows never below bench level. Per Delavier: the pec stretch at the bottom is the growth stimulus.",
          youtubeUrl: "https://youtu.be/eozdVDA78K0",
        },
        {
          id: "gen-push-a-2",
          name: "Arnold Press",
          muscleGroup: "Shoulders",
          muscleFocus: "All three deltoid heads — anterior, medial, and posterior — activated through the rotation",
          sets: 3,
          reps: "12",
          weightDisplay: "4 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale as you press up and rotate, inhale as you lower and rotate back",
          formNotes:
            "Start with palms facing your face, elbows at chest height. As you press up, rotate palms outward so they face forward at top. Reverse on the way down. Delavier highlights this as one of the few moves that works all three delt heads simultaneously.",
          youtubeUrl: "https://youtu.be/6Z15_WdXmVw",
        },
        {
          id: "gen-push-a-3",
          name: "Rear Delt Raise",
          muscleGroup: "Shoulders",
          muscleFocus: "Posterior deltoid — back of the shoulder, often underdeveloped but crucial for posture",
          sets: 3,
          reps: "15",
          weightDisplay: "3 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale as you raise, inhale as you lower",
          formNotes:
            "Hinge forward at hips 45–90°, back flat, arms hanging with slight elbow bend. Raise arms out to sides like wings — lead with elbows, not hands. Squeeze shoulder blades at the top. Core tight to protect your lower back.",
          supersetId: "gen-push-a-ss1",
          youtubeUrl: "https://youtu.be/EA7u4Q_8HQ0",
        },
        {
          id: "gen-push-a-4",
          name: "Tricep Bench Dips",
          muscleGroup: "Triceps",
          muscleFocus: "All three tricep heads — long, medial, and lateral — with bodyweight loading",
          sets: 3,
          reps: "12",
          weightDisplay: "bodyweight",
          restBetweenSets: "60 sec",
          breathingCue: "Inhale as you lower, exhale as you push back up",
          formNotes:
            "Sit on edge of bench, hands gripping edge with fingers forward. Slide off and lower until elbows hit 90°. Push back up through your palms. Keep back close to bench. The further your feet are out, the harder it gets.",
          supersetId: "gen-push-a-ss1",
          youtubeUrl: "https://youtu.be/0326dy_-CzM",
        },
      ],
    },
  ],
  // Template B — Pressing Power
  [
    {
      title: "Pressing Power",
      exercises: [
        {
          id: "gen-push-b-1",
          name: "Incline Dumbbell Flyes",
          muscleGroup: "Pectorals",
          muscleFocus: "Upper pectoralis major (clavicular head) — the shelf that creates defined upper chest",
          sets: 3,
          reps: "12",
          weightDisplay: "5.5 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Inhale opening wide, exhale bringing together",
          formNotes:
            "Set bench 30–45° incline. Lower dumbbells in a wide arc until you feel a deep upper-chest stretch, then bring together at top. Keep slight elbow bend throughout — this is a flye, not a press. Delavier notes this targets the clavicular pec head that flat pressing misses.",
          youtubeUrl: "https://youtu.be/QENKPHhQVi4",
        },
        {
          id: "gen-push-b-2",
          name: "Close-Grip Push-Up",
          muscleGroup: "Triceps + Chest",
          muscleFocus: "Triceps brachii (all heads) + inner pectorals — narrow hand placement dramatically shifts emphasis",
          sets: 3,
          reps: "10",
          weightDisplay: "bodyweight",
          restBetweenSets: "60 sec",
          breathingCue: "Inhale at top, exhale as you push back up",
          formNotes:
            "Hands under chest, narrower than shoulder-width, fingers slightly angled out. Full plank body. Lower chest between hands with elbows tucked close to ribs. Feel the tricep fire at lockout. Modify on knees if needed.",
          youtubeUrl: "https://youtu.be/l8hQR5HXFM4",
        },
        {
          id: "gen-push-b-3",
          name: "Dumbbell Front-to-Lateral Raise",
          muscleGroup: "Shoulders",
          muscleFocus: "Anterior and medial deltoids — combining front and side in one fluid arc",
          sets: 3,
          reps: "12",
          weightDisplay: "3 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale going up, inhale coming down",
          formNotes:
            "Raise one arm straight in front to shoulder height, arc it out to the side, then lower. Alternate arms. Keep slight elbow bend throughout. Go light — this multi-plane movement is deceivingly hard and mirrors Delavier's emphasis on training the deltoid through its full range.",
          supersetId: "gen-push-b-ss1",
          youtubeUrl: "https://youtu.be/hRJ6tR5-if0",
        },
        {
          id: "gen-push-b-4",
          name: "Two-Hand Overhead Tricep Extension",
          muscleGroup: "Triceps",
          muscleFocus: "Triceps long head — stretched overhead position maximizes long head activation",
          sets: 3,
          reps: "12",
          weightDisplay: "5 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Inhale at full stretch (low), exhale on extension",
          formNotes:
            "Hold one dumbbell with both hands overhead. Hinge at elbows only — keep them pointed at the ceiling, don't let them flare. Lower behind your head until you feel a deep tricep stretch. Press back to full extension. Core tight, don't arch your lower back.",
          supersetId: "gen-push-b-ss1",
          youtubeUrl: "https://youtu.be/nRiJVZDpdL0",
        },
      ],
    },
  ],
  // Template C — Definition & Strength
  [
    {
      title: "Definition & Strength",
      exercises: [
        {
          id: "gen-push-c-1",
          name: "Single-Arm Dumbbell Press",
          muscleGroup: "Pectorals + Core",
          muscleFocus: "Pectoralis major with anti-rotation core demand — exposes and fixes left-right imbalances",
          sets: 3,
          reps: "12 each side",
          weightDisplay: "5 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale as you press up, inhale as you lower",
          formNotes:
            "On flat bench, press one dumbbell while the other rests on your thigh. The one-sided load makes your core work overtime to stay stable. Press at a slight diagonal toward center of body. Do all reps one side, then switch.",
          youtubeUrl: "https://youtu.be/Ve_AHpyEFwI",
        },
        {
          id: "gen-push-c-2",
          name: "Band Lateral Raise",
          muscleGroup: "Shoulders",
          muscleFocus: "Medial deltoid — band keeps constant tension at the bottom where dumbbells go slack",
          sets: 3,
          reps: "15 each side",
          weightDisplay: "light band",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale raising, inhale lowering",
          formNotes:
            "Loop band under foot or anchor low. Raise arm out to shoulder height with elbow slightly bent. The constant band tension is superior to dumbbells for mid-delt development — Delavier notes this in his resistance curve chapter. Keep a slight forward torso lean.",
          youtubeUrl: "https://youtu.be/PPuC_Y5pBrk",
        },
        {
          id: "gen-push-c-3",
          name: "Tricep Kickback (Both Arms)",
          muscleGroup: "Triceps",
          muscleFocus: "Lateral and medial tricep heads — full lockout creates peak contraction",
          sets: 3,
          reps: "12 each side",
          weightDisplay: "4 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale on full extension, inhale bending back",
          formNotes:
            "Hinge at hip, back parallel to floor. Upper arm pinned to side, elbow at 90°. Extend arm back to full lockout — squeeze hard for 1 second. Return with control. Only the forearm moves. Delavier recommends a 1-second hold at peak for maximum tricep activation.",
          supersetId: "gen-push-c-ss1",
          youtubeUrl: "https://youtu.be/Pv5TGzMNJNE",
        },
        {
          id: "gen-push-c-4",
          name: "Plank to Push-Up",
          muscleGroup: "Core + Chest + Triceps",
          muscleFocus: "Anterior core stability with dynamic chest/tricep pressing — full-body compound challenge",
          sets: 3,
          reps: "10",
          weightDisplay: "bodyweight",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale on each push, steady breathing through the transition",
          formNotes:
            "Start in forearm plank. Push up to high plank one arm at a time, then lower back down. Then do one push-up. That's one rep. Keep hips level — control with your core. Slow and deliberate beats fast and sloppy every time.",
          supersetId: "gen-push-c-ss1",
          youtubeUrl: "https://youtu.be/bMsROJ2IKJY",
        },
      ],
    },
  ],
];

const PULL_TEMPLATES: Array<WorkoutDay["sections"]> = [
  // Template A — Back & Bicep Burn
  [
    {
      title: "Back & Bicep Burn",
      exercises: [
        {
          id: "gen-pull-a-1",
          name: "Concentration Curl",
          muscleGroup: "Biceps",
          muscleFocus: "Biceps brachii peak — isolated elbow position maximizes peak contraction",
          sets: 3,
          reps: "12 each side",
          weightDisplay: "4 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale curling up, inhale lowering slowly",
          formNotes:
            "Sit on bench edge, lean forward, rest elbow on inner thigh. Curl the dumbbell up with a full squeeze at the top. Lower slowly over 3 counts. No body swing — this is the most isolated bicep exercise. Delavier explains the peak contraction angle is highest in this seated position.",
          youtubeUrl: "https://youtu.be/Jvj2wV0vOYU",
        },
        {
          id: "gen-pull-a-2",
          name: "Prone Rear Delt Raise",
          muscleGroup: "Shoulders + Upper Back",
          muscleFocus: "Posterior deltoid and lower trapezius — lying prone removes momentum for strict form",
          sets: 3,
          reps: "15",
          weightDisplay: "3 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale raising, inhale lowering",
          formNotes:
            "Lie face-down on an incline bench. Arms hang down. Raise them out to the sides with elbows slightly bent, like wings. Squeeze shoulder blades at the top. The prone position makes this stricter than bent-over — gravity loads the eccentric descent.",
          youtubeUrl: "https://youtu.be/EA7u4Q_8HQ0",
        },
        {
          id: "gen-pull-a-3",
          name: "Zottman Curl",
          muscleGroup: "Biceps + Forearms",
          muscleFocus: "Biceps brachii on the way up, brachioradialis on the way down — two exercises in one",
          sets: 3,
          reps: "10",
          weightDisplay: "4 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale curling up, pause and rotate, inhale lowering with palms down",
          formNotes:
            "Curl up with palms facing up (supinated). At the top, rotate wrists so palms face DOWN. Lower slowly with palms down. Rotate back at the bottom. The eccentric with palms down works your forearms and brachioradialis. Delavier covers this in the forearm development section.",
          supersetId: "gen-pull-a-ss1",
          youtubeUrl: "https://youtu.be/ZrSAzsFoLSk",
        },
        {
          id: "gen-pull-a-4",
          name: "Band Lat Pulldown",
          muscleGroup: "Back",
          muscleFocus: "Latissimus dorsi — the V-taper muscle. Wide overhand grip targets lats broadly.",
          sets: 3,
          reps: "12",
          weightDisplay: "medium band",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale pulling down, inhale controlling back up",
          formNotes:
            "Anchor band overhead. Sit or kneel with a slight lean back. Pull band down to upper chest, driving elbows toward your hips. Initiate with your lats, not biceps — imagine pulling your elbows down to your back pockets. Slow 3-count return.",
          supersetId: "gen-pull-a-ss1",
          youtubeUrl: "https://youtu.be/lueEJGjTuPQ",
        },
      ],
    },
  ],
  // Template B — Sculpted Back Day
  [
    {
      title: "Sculpted Back Day",
      exercises: [
        {
          id: "gen-pull-b-1",
          name: "Dumbbell Shrug",
          muscleGroup: "Trapezius",
          muscleFocus: "Upper trapezius — the neck-to-shoulder slope muscle that contributes to posture",
          sets: 3,
          reps: "15",
          weightDisplay: "6 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale shrugging up, inhale lowering",
          formNotes:
            "Stand tall, dumbbells at sides. Shrug shoulders straight UP as high as possible — think 'touch ears with shoulders.' Hold 1 second at top. Lower slowly. No shoulder rolling — pure up-down movement. Delavier emphasizes that rolling stresses the AC joint without adding benefit.",
          youtubeUrl: "https://youtu.be/cJRVVxmytaM",
        },
        {
          id: "gen-pull-b-2",
          name: "Incline Dumbbell Curl",
          muscleGroup: "Biceps",
          muscleFocus: "Biceps long head — incline stretches the long head for a superior growth stimulus",
          sets: 3,
          reps: "12",
          weightDisplay: "4 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale curling up, inhale lowering with control",
          formNotes:
            "Sit on incline bench (45–60°), arms hanging straight down. Curl both dumbbells up. The stretched bottom position is the magic — you'll feel the bicep long head working completely differently than standing curls. Delavier lists this as a top exercise for bicep length.",
          youtubeUrl: "https://youtu.be/soxrZlIl35U",
        },
        {
          id: "gen-pull-b-3",
          name: "Seated Band Row",
          muscleGroup: "Back",
          muscleFocus: "Rhomboids and middle trapezius — seated removes lower back fatigue for strict form",
          sets: 3,
          reps: "12",
          weightDisplay: "medium band",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale rowing in, inhale reaching forward",
          formNotes:
            "Sit on floor, legs extended, band looped around feet. Pull handles to lower ribs, elbows close to body. Squeeze shoulder blades together and hold 1 second. Reach forward on return, feeling the stretch between shoulder blades. Back straight throughout.",
          supersetId: "gen-pull-b-ss1",
          youtubeUrl: "https://youtu.be/xQNrFHEMhI4",
        },
        {
          id: "gen-pull-b-4",
          name: "Spider Curl",
          muscleGroup: "Biceps",
          muscleFocus: "Biceps short head and peak — prone position eliminates all body swing",
          sets: 3,
          reps: "12",
          weightDisplay: "3.5 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale curling up, inhale lowering slow",
          formNotes:
            "Lie face-down on incline bench (high angle). Let arms hang down. Curl dumbbells up to full contraction. Zero ability to cheat — pure bicep. Great for targeting the inner bicep head. Delavier notes the unique peak contraction angle that standard curls can't replicate.",
          supersetId: "gen-pull-b-ss1",
          youtubeUrl: "https://youtu.be/OVdSgcMmNkQ",
        },
      ],
    },
  ],
  // Template C — Full Pull Circuit
  [
    {
      title: "Full Pull Circuit",
      exercises: [
        {
          id: "gen-pull-c-1",
          name: "Chest-Supported T-Bar Row",
          muscleGroup: "Back",
          muscleFocus: "Middle trapezius and rhomboids — chest support eliminates lower back fatigue",
          sets: 3,
          reps: "12",
          weightDisplay: "5 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale pulling up, inhale lowering with control",
          formNotes:
            "Lie face-down on incline bench. Hold dumbbells, arms hanging. Pull elbows up toward ceiling squeezing shoulder blades hard. Hold 1 second. Lower until full stretch. Delavier recommends chest-supported rowing for anyone wanting to build the mid-back without loading the spine.",
          youtubeUrl: "https://youtu.be/j3Igk5nyZE4",
        },
        {
          id: "gen-pull-c-2",
          name: "Face Pull",
          muscleGroup: "Shoulders + Upper Back",
          muscleFocus: "Posterior deltoid and rotator cuff — the most important shoulder health movement",
          sets: 3,
          reps: "15",
          weightDisplay: "light band",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale pulling to face, inhale returning",
          formNotes:
            "Anchor band at face height. Pull handles toward your face with elbows flaring HIGH and wide. At end position hands are beside ears, elbows above hands. This is external shoulder rotation — crucial rotator cuff health. Delavier includes this as injury prevention for frequent pressers.",
          youtubeUrl: "https://youtu.be/rep-qVOkqgk",
        },
        {
          id: "gen-pull-c-3",
          name: "Cross-Body Hammer Curl",
          muscleGroup: "Biceps + Forearms",
          muscleFocus: "Brachialis and brachioradialis — the muscles that give arm thickness between bicep and forearm",
          sets: 3,
          reps: "12 each side",
          weightDisplay: "4 kg",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale curling across, inhale lowering",
          formNotes:
            "Neutral grip (thumbs up). Curl right arm across body toward left shoulder, then left arm toward right shoulder. The cross-body angle shifts stress toward the brachialis. Delavier highlights this variation for creating forearm-to-bicep fullness that standard curls miss.",
          supersetId: "gen-pull-c-ss1",
          youtubeUrl: "https://youtu.be/TwD-YGVP4Bk",
        },
        {
          id: "gen-pull-c-4",
          name: "Band Straight-Arm Pulldown",
          muscleGroup: "Back",
          muscleFocus: "Latissimus dorsi in isolation — straight arms remove bicep involvement entirely",
          sets: 3,
          reps: "12",
          weightDisplay: "medium band",
          restBetweenSets: "60 sec",
          breathingCue: "Exhale pulling down, inhale raising back up",
          formNotes:
            "Anchor band overhead. Stand facing anchor, slight forward lean. Arms straight, pull the band down to your thighs by driving elbows toward hips — elbows stay straight throughout. Only your shoulders move. This is Delavier's preferred lat isolation: no biceps, pure lats.",
          supersetId: "gen-pull-c-ss1",
          youtubeUrl: "https://youtu.be/lT4h_5QHKAQ",
        },
      ],
    },
  ],
];

export function generateWorkout(
  type: "push" | "pull",
  workoutNumber: number,
  typeCount: number
): WorkoutDay {
  const templates = type === "push" ? PUSH_TEMPLATES : PULL_TEMPLATES;
  const names = type === "push" ? PUSH_NAMES : PULL_NAMES;
  const templateIdx = typeCount % templates.length;
  const nameIdx = typeCount % names.length;

  return {
    dayNumber: workoutNumber,
    name: names[nameIdx],
    description:
      type === "push"
        ? "A fresh push workout inspired by Delavier's Women's Strength Training Anatomy. Focus on mind-muscle connection and full range of motion."
        : "A fresh pull workout inspired by Delavier's Women's Strength Training Anatomy. Feel the target muscle on every single rep.",
    warmUp: WARM_UP,
    coolDown: COOL_DOWN,
    sections: templates[templateIdx],
  };
}
