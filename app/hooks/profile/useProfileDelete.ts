import { deleteProfile } from "@/client/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export function useProfileDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.push("/");
    },
  });
}
