import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/hooks/profile/useProfile";
import { getAchievements } from "@/client/achievements";

export function useAchievements() {
  const { data: profile } = useProfile();

  return useQuery({
    queryKey: ["practices", "achievements"],
    enabled: !!profile,
    queryFn: () => getAchievements(),
  });
}
