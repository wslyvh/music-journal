import { Achievement } from "@/types";

export function getAchievementImage(id: string) {
  switch (id) {
    default:
      return require("@/assets/achievements/default.png");
  }
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "joined",
    title: "Join the club",
    description: "Register to stay motivated!",
  },
  {
    id: "profile",
    title: "Profile perfectionist",
    description: "Complete your profile to personalize your experience",
  },
  {
    id: "first-practice",
    title: "First practice",
    description: "Log your first practice session",
  },
  {
    id: "10-sessions",
    title: "10 sessions",
    description: "Practice for 10 sessions",
  },
  {
    id: "20-sessions",
    title: "20 sessions",
    description: "Practice for 20 sessions",
  },
  {
    id: "50-sessions",
    title: "50 sessions",
    description: "Practice for 50 sessions",
  },
  {
    id: "100-sessions",
    title: "100 sessions",
    description: "Practice for 100 sessions",
  },
  {
    id: "1-hour",
    title: "1 hour",
    description: "Practice for 1 hour",
  },
  {
    id: "10-hours",
    title: "10 hours",
    description: "Practice for 10 hours",
  },
  {
    id: "20-hours",
    title: "20 hours",
    description: "Practice for 20 hours",
  },
  {
    id: "50-hours",
    title: "50 hours",
    description: "Practice for 50 hours",
  },
  {
    id: "100-hours",
    title: "100 hours",
    description: "Practice for 100 hours",
  },
  {
    id: "7-day-streak",
    title: "7 day streak",
    description: "Keep practicing for 7 days straight",
  },
  {
    id: "14-day-streak",
    title: "14 day streak",
    description: "Keep practicing for 14 days straight",
  },
  {
    id: "30-day-streak",
    title: "30 day streak",
    description: "Keep practicing for 30 days straight",
  },
  {
    id: "50-day-streak",
    title: "50 day streak",
    description: "Keep practicing for 50 days straight",
  },
  {
    id: "100-day-streak",
    title: "100 day streak",
    description: "Keep practicing for 100 days straight",
  },
];
