import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/hooks/profile/useProfile";
import { getPracticeStats } from "@/client/practices";

export function usePracticeStats(period?: number) {
  const { data: profile } = useProfile();

  return useQuery({
    queryKey: ["practices", "stats", period],
    enabled: !!profile,
    queryFn: () => getPracticeStats(period),
  });
}
