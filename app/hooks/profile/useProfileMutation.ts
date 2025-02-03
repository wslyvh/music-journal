import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setProfile } from "@/client/profile";
import { Profile } from "@/types";

export function useProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["profile"],
    mutationFn: (profile: Profile) => setProfile(profile),
    onSuccess: (newProfile) => {
      queryClient.setQueryData(["profile"], newProfile);
    },
  });
}
