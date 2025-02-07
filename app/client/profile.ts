import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";
import { DataSchema, Profile } from "@/types";
import { completeAchievement } from "./achievements";
import { seedPractices } from "@/client/practices";
import { syncProfile } from "@/utils/supabase";
import Constants from "expo-constants";
import dayjs from "dayjs";

const SCHEMA_VERSION = 1;

export async function getProfile(): Promise<Profile | null> {
  try {
    const data = await AsyncStorage.getItem("profile");
    if (!data) return null;

    const profile = JSON.parse(data) as DataSchema<Profile>;
    if (profile.version !== SCHEMA_VERSION) {
      return null;
    }

    return profile.data;
  } catch (err) {
    console.error("Error getting profile:", err);
    return null;
  }
}

export async function setProfile(profile: Profile) {
  const id = profile.id ?? randomUUID();
  console.log("setProfile", id, profile);

  const profileData = { ...profile, id };
  await AsyncStorage.setItem(
    "profile",
    JSON.stringify({
      version: SCHEMA_VERSION,
      data: profileData,
    })
  );

  if (!profile.id) {
    await completeAchievement("joined");
  } else {
    profileData.updatedAt = dayjs().unix();
  }

  await syncProfile(profileData);

  if (Constants.expoConfig?.extra?.SEED_PROFILE) {
    await seedPractices();
  }

  return profileData;
}

export async function deleteProfile() {
  console.log("deleteProfile");

  await AsyncStorage.clear();
}
