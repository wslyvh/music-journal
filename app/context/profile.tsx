import { useEffect } from "react";
import { useProfile } from "@/hooks/profile/useProfile";
import { PropsWithChildren } from "react";
import { usePathname, useRouter } from "expo-router";
import { LoadingScreen } from "@/components/loading";

export function ProfileProvider(props: PropsWithChildren) {
  const { isLoading, data: profile } = useProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !profile && pathname !== "/onboarding") {
      router.push("/onboarding");
    }
  }, [isLoading, profile, pathname]);

  if (isLoading) return <LoadingScreen />;

  return <>{props.children}</>;
}
