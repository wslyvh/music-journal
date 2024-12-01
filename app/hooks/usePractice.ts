import { CONFIG } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { useAuthToken } from "./useToken";

export function usePractice(id: string) {
  const { data: token } = useAuthToken();

  return useQuery({
    queryKey: ["practice", id, token],
    enabled: !!id && !!token,
    queryFn: async () => {
      const res = await fetch(`${CONFIG.API_URL}/practice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch practice");

      const { data } = await res.json();
      return data;
    },
  });
}
