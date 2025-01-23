import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile, setProfile } from "@/client/profile";

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
