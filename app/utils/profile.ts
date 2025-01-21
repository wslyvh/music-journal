import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

export interface Profile {
  id?: string;
  username: string;
  instrument: string;
  yearsOfExperience: number;
  practiceFrequency: number;
  goals: string;

  createdAt: number;
}

export async function getProfile() {
  console.log("getProfile");

  const profile = await AsyncStorage.getItem("profile");
  if (profile) {
    console.log("getProfile", profile);
    return JSON.parse(profile) as Profile;
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

export async function removeProfile() {
  console.log("removeProfile");

  await AsyncStorage.removeItem("profile");
}
