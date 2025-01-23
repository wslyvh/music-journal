import { createPractice } from "@/client/practices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePracticeMutationCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["practices"],
    mutationFn: createPractice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practices"] });
    },
  });
}
