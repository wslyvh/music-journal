import { Practice, PracticeData } from "@/types";
import { CONFIG } from "@/utils/config";
import { getToken } from "@/utils/token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePractice() {
  const queryClient = useQueryClient();

  const practicesQuery = useQuery({
    queryKey: ["practice"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return [];

      const res = await fetch(`${CONFIG.API_URL}/practice`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch sessions");

      const { data } = await res.json();
      return data;
    },
  });

  const createPracticeMutation = useMutation({
    mutationKey: ["practice"],
    mutationFn: async (practice: PracticeData) => {
      const token = await getToken();
      if (!token) return [];

      const res = await fetch(`${CONFIG.API_URL}/practice`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(practice),
      });

      if (!res.ok) throw new Error("Failed to create practice");

      const { data } = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practice"] });
    },
  });

  const updatePracticeMutation = useMutation({
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
    practicesQuery,
    createPracticeMutation,
    updatePracticeMutation,
  };
}
