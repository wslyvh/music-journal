import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export interface Profile {
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
  console.log("setProfile", profile);
  queryClient.setQueryData(["profile"], profile);
  await AsyncStorage.setItem("profile", JSON.stringify(profile));
}

export async function removeProfile() {
  console.log("removeProfile");
  await AsyncStorage.removeItem("profile");
}
