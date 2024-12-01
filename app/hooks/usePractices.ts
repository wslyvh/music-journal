import { CONFIG } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { useAuthToken } from "./useToken";

export function usePractices() {
  const { data: token } = useAuthToken();

  return useQuery({
    queryKey: ["practice", token],
    enabled: !!token,
    queryFn: async () => {
      const res = await fetch(`${CONFIG.API_URL}/practice`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch sessions");

      const { data } = await res.json();
      return data;
    },
  });
}
