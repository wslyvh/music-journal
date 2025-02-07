import { DataSchema, Practice, PracticeData, PracticeStats } from "@/types";
import { randomUUID } from "expo-crypto";
import { getProfile } from "@/client/profile";
import { completeAchievement } from "./achievements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const SCHEMA_VERSION = 1;

export async function getPractices() {
  console.log("getPractices");

  const practiceData = await AsyncStorage.getItem("practices");
  if (!practiceData) return [];

  const data = JSON.parse(practiceData) as DataSchema<Practice[]>;
  if (data.version !== SCHEMA_VERSION) {
    return [];
  }

  return data.data.sort(
    (a: Practice, b: Practice) => b.timestamp - a.timestamp
  );
}

export async function getPractice(id: string) {
  console.log("getPractice", id);

  const practices = await getPractices();
  const practice = practices.find((practice: Practice) => practice.id === id);

  return practice;
}

export async function getPracticeStats(period?: number) {
  console.log("getPracticeStats", period);

  let practices = await getPractices();
  if (!practices.length) {
    return {
      total: 0,
      totalDuration: 0,
      longestSession: 0,
      averageSession: 0,
      days: [],
    };
  }

  if (period) {
    practices = practices.filter((practice: Practice) => {
      return practice.timestamp > Date.now() - period * 24 * 60 * 60 * 1000;
    });
  }

  const totalDuration = practices.reduce((acc: number, practice: Practice) => {
    return acc + practice.duration;
  }, 0);

  const longestSession = practices.sort(
    (a: Practice, b: Practice) => b.duration - a.duration
  )[0]?.duration;

  const averageSession =
    practices.reduce((acc: number, practice: Practice) => {
      return acc + practice.duration;
    }, 0) / practices.length;

  const practicesByDay = practices.reduce(
    (acc: { [key: string]: Practice[] }, practice: Practice) => {
      const day = dayjs(practice.timestamp).format("YYYY-MM-DD");
      if (!acc[day]) acc[day] = [];
      acc[day].push(practice);
      return acc;
    },
    {}
  );

  const days = Object.entries(practicesByDay).map(([date, dayPractices]) => ({
    date: dayjs(date).valueOf(),
    sessions: dayPractices.length,
    duration: dayPractices.reduce(
      (sum, practice) => sum + practice.duration,
      0
    ),
  }));

  return {
    total: practices.length,
    totalDuration,
    longestSession,
    averageSession,
    days,
  } as PracticeStats;
}

export async function createPractice(practice: PracticeData) {
  const id = randomUUID();
  const profile = await getProfile();
  if (!profile) console.error("No profile found");

  console.log("createPractice", id, profile?.id, practice);

  const practices = await getPractices();
  let practiceData = {
    ...practice,
    id,
    accountId: profile?.id ?? "",
  };
  if (!practiceData.timestamp) {
    practiceData.timestamp = Date.now();
  }

  practices.push(practiceData);
  await AsyncStorage.setItem(
    "practices",
    JSON.stringify({ version: SCHEMA_VERSION, data: practices })
  );

  await updatePracticeAchievements(practices);
  return practice;
}

export async function updatePractice(practice: Practice) {
  console.log("updatePractice", practice);

  const practices = await getPractices();
  const index = practices.findIndex((p: Practice) => p.id === practice.id);
  if (index === -1) {
    throw new Error("Practice not found");
  }

  practices[index] = practice;
  await AsyncStorage.setItem(
    "practices",
    JSON.stringify({ version: SCHEMA_VERSION, data: practices })
  );

  return practice;
}

export async function deletePractice(id: string) {
  console.log("deletePractice", id);

  const practices = await getPractices();
  const index = practices.findIndex((p: Practice) => p.id === id);
  if (index === -1) {
    throw new Error("Practice not found");
  }

  practices.splice(index, 1);
  await AsyncStorage.setItem(
    "practices",
    JSON.stringify({ version: SCHEMA_VERSION, data: practices })
  );
}

export async function deletePractices() {
  await AsyncStorage.removeItem("practices");
}

export async function updatePracticeAchievements(practices: Practice[]) {
  if (!practices.length) return;

  if (practices.length === 1) {
    await completeAchievement("first-practice");
  }

  if (practices.length === 10) {
    await completeAchievement("10-sessions");
  }

  if (practices.length === 20) {
    await completeAchievement("20-sessions");
  }

  if (practices.length === 50) {
    await completeAchievement("50-sessions");
  }

  if (practices.length === 100) {
    await completeAchievement("100-sessions");
  }

  const totalDuration = practices.reduce((acc: number, practice: Practice) => {
    return acc + practice.duration;
  }, 0);

  if (totalDuration >= 60 * 60 * 1000) {
    await completeAchievement("1-hour");
  }

  if (totalDuration >= 10 * 60 * 60 * 1000) {
    await completeAchievement("10-hours");
  }

  if (totalDuration >= 20 * 60 * 60 * 1000) {
    await completeAchievement("20-hours");
  }

  if (totalDuration >= 50 * 60 * 60 * 1000) {
    await completeAchievement("50-hours");
  }

  if (totalDuration >= 100 * 60 * 60 * 1000) {
    await completeAchievement("100-hours");
  }

  const practicesByDay = practices.reduce(
    (acc: { [key: string]: Practice[] }, practice: Practice) => {
      const day = dayjs(practice.timestamp).format("YYYY-MM-DD");
      if (!acc[day]) acc[day] = [];
      acc[day].push(practice);
      return acc;
    },
    {}
  );

  let streak = 0;
  const today = dayjs().format("YYYY-MM-DD");

  if (practicesByDay[today]) {
    streak = 1;
    let checkDate = dayjs(today).subtract(1, "day");

    while (practicesByDay[checkDate.format("YYYY-MM-DD")]) {
      streak++;
      checkDate = checkDate.subtract(1, "day");
    }
  }

  if (streak >= 7) {
    await completeAchievement("7-day-streak");
  }

  if (streak >= 14) {
    await completeAchievement("14-day-streak");
  }

  if (streak >= 30) {
    await completeAchievement("30-day-streak");
  }

  if (streak >= 50) {
    await completeAchievement("50-day-streak");
  }

  if (streak >= 100) {
    await completeAchievement("100-day-streak");
  }
}
