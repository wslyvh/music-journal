import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";
import { DataSchema, Profile } from "@/types";

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
  await AsyncStorage.setItem(
    "profile",
    JSON.stringify({
      version: SCHEMA_VERSION,
      data: {
        ...profile,
        id,
      },
    })
  );

  return {
    ...profile,
    id,
  };
}

export async function deleteProfile() {
  console.log("deleteProfile");

  await AsyncStorage.clear();
}
