import { Profile } from "@/types";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

export const SUPABASE_CLIENT = createClient(
  Constants.expoConfig?.extra?.SUPABASE_URL ?? "",
  Constants.expoConfig?.extra?.SUPABASE_ANON_KEY ?? ""
);

export async function syncProfile(profile: Profile) {
  console.log("syncProfile to supabase", profile);

  try {
    if (profile.updatedAt) {
      await SUPABASE_CLIENT.from("profiles")
        .update(profile)
        .eq("id", profile.id)
        .select();
    } else {
      await SUPABASE_CLIENT.from("profiles").insert(profile);
    }
  } catch (err) {
    console.error("Error syncing profile to supabase", err);
  }
}
