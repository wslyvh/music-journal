import { CONFIG } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { useAuthToken } from "./useToken";

export function usePractices() {
  const { data: token, isLoading: isTokenLoading } = useAuthToken();

  const query = useQuery({
    queryKey: ["practice", token],
    enabled: !!token && !isTokenLoading,
    queryFn: async () => {
      const res = await fetch(`${CONFIG.API_URL}/practice`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch sessions");

      const { data } = await res.json();
      if (!data) return [];
      return data;
    },
  });

  if (isTokenLoading) {
    return { ...query, isLoading: true };
  }

  return query;
}
