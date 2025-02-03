import { DataSchema, Practice, PracticeData, PracticeStats } from "@/types";
import { randomUUID } from "expo-crypto";
import { getProfile } from "@/client/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  if (period) {
    practices = practices.filter((practice: Practice) => {
      return practice.timestamp > Date.now() - period * 24 * 60 * 60 * 1000;
    });
  }

  const totalDuration = practices.reduce((acc: number, practice: Practice) => {
    return acc + practice.duration;
  }, 0);

  return {
    total: practices.length,
    totalDuration,
  } as PracticeStats;
}

export async function createPractice(practice: PracticeData) {
  const id = randomUUID();
  const profile = await getProfile();
  if (!profile) console.error("No profile found");

  console.log("createPractice", id, profile?.id, practice);

  const practices = await getPractices();
  practices.push({
    ...practice,
    id,
    accountId: profile?.id ?? "",
    timestamp: Date.now(),
  });
  await AsyncStorage.setItem(
    "practices",
    JSON.stringify({ version: SCHEMA_VERSION, data: practices })
  );

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
