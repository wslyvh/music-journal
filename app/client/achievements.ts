import AsyncStorage from "@react-native-async-storage/async-storage";
import { Achievement, DataSchema } from "@/types";
import { ACHIEVEMENTS } from "@/utils/achievements";
import dayjs from "dayjs";

const SCHEMA_VERSION = 1;

export async function getAllAchievements() {
  console.log("getAllAchievements");

  return ACHIEVEMENTS;
}

export async function getAchievements() {
  console.log("getAchievements");

  const achievementsData = await AsyncStorage.getItem("achievements");
  const data = achievementsData
    ? (JSON.parse(achievementsData) as DataSchema<Achievement[]>)
    : null;

  if (!data || data.version !== SCHEMA_VERSION) {
    return ACHIEVEMENTS.map((achievement) => ({
      ...achievement,
    })) as Achievement[];
  }

  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    completed: data.data.find((a) => a.id === achievement.id)?.completed,
  })) as Achievement[];
}

export async function completeAchievement(id: string) {
  console.log("completeAchievement", id);

  const achievements = await getAchievements();
  const achievement = achievements.find((a) => a.id === id);
  if (!achievement) return;

  achievement.completed = dayjs().valueOf();

  await AsyncStorage.setItem(
    "achievements",
    JSON.stringify({ version: SCHEMA_VERSION, data: achievements })
  );

  return achievement;
}

export async function deleteAchievements() {
  await AsyncStorage.removeItem("achievements");
}
