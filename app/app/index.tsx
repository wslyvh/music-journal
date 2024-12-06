import { Join } from "@/components/account/banner";
import { PracticeOverview } from "@/components/practice/overview";
import { ScreenLayout } from "@/components/screen-layout";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <ScreenLayout title="Music Journal">
      {!isAuthenticated && <Join />}

      <PracticeOverview />
    </ScreenLayout>
  );
}
