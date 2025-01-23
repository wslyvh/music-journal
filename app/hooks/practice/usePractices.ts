import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/hooks/profile/useProfile";
import { getPractices } from "@/client/practices";

export function usePractices() {
  const { data: profile } = useProfile();

  return useQuery({
    queryKey: ["practices"],
    enabled: !!profile,
    queryFn: getPractices,
  });
}
