export function getWorkoutDayNumber(today: Date): 1 | 2 {
  const anchor = new Date("2026-04-16");
  const todayMidnight = new Date(today);
  todayMidnight.setHours(0, 0, 0, 0);
  anchor.setHours(0, 0, 0, 0);
  const diffDays = Math.round((todayMidnight.getTime() - anchor.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays % 2 === 0 ? 1 : 2;
}
