import { Practice } from "@/types";
import { CONFIG } from "@/utils/config";
import { getToken } from "@/utils/token";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePracticeMutations() {
  const queryClient = useQueryClient();

  const createPractice = useMutation({
    mutationKey: ["practice"],
    mutationFn: async (formData: FormData) => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token");

      const res = await fetch(`${CONFIG.API_URL}/practice`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create practice");

      const { data } = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practice"] });
    },
  });

  const updatePractice = useMutation({
    mutationKey: ["practice"],
    mutationFn: async (practice: Practice) => {
      const token = await getToken();
      if (!token) return [];

      const res = await fetch(`${CONFIG.API_URL}/practice/${practice.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(practice),
      });

      if (!res.ok) throw new Error("Failed to update practice");

      const { data } = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practice"] });
    },
  });

  return {
    createPractice,
    updatePractice,
  };
}
