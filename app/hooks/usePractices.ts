import { CONFIG } from "@/utils/config";
import { getToken } from "@/utils/token";
import { useQuery } from "@tanstack/react-query";

export function usePractices() {
  return useQuery({
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
}
