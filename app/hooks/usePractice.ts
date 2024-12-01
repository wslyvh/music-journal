import { CONFIG } from "@/utils/config";
import { getToken } from "@/utils/token";
import { useQuery } from "@tanstack/react-query";

export function usePractice(id: string) {
  return useQuery({
    queryKey: ["practice", id],
    enabled: !!id,
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;

      const res = await fetch(`${CONFIG.API_URL}/practice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch practice");

      const { data } = await res.json();
      return data;
    },
  });
}
