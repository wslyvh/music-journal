import { updatePractice } from "@/client/practices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePracticeMutationUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["practices"],
    mutationFn: updatePractice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practices"] });
    },
  });
}
