import { useMutation } from "@tanstack/react-query";
import { Profile, setProfile } from "@/utils/profile";

export function useProfileMutation() {
  return useMutation({
    mutationKey: ["profile"],
    mutationFn: (profile: Profile) => setProfile(profile),
  });
}
