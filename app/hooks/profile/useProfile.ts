import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/client/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
  });
}
