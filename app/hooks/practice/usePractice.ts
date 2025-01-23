import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/hooks/profile/useProfile";
import { getPractice } from "@/client/practices";

export function usePractice(id: string) {
  const { data: profile } = useProfile();

  return useQuery({
    queryKey: ["practices", id],
    enabled: !!profile && !!id,
    queryFn: () => getPractice(id),
  });
}
