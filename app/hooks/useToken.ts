import { getToken } from "@/utils/token";
import { useQuery } from "@tanstack/react-query";

export function useAuthToken() {
  return useQuery({
    queryKey: ["auth-token"],
    queryFn: getToken,
    staleTime: Infinity,
  });
}
