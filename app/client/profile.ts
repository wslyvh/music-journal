import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";
import { Profile } from "@/types";

export async function getProfile(): Promise<Profile | null> {
  try {
    const data = await AsyncStorage.getItem("profile");
    if (!data) return null;

    return JSON.parse(data);
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
      ...profile,
      id,
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
