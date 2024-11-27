import { ScreenLayout } from "@/components/screen-layout";
import { PracticeTimer } from "@/components/practice/timer";
import { Join } from "@/components/account/banner";
import { useAuth } from "@/hooks/useAuth";

export default function Start() {
  const { isAuthenticated } = useAuth();

  return (
    <ScreenLayout title="Practice Timer">
      {!isAuthenticated && (
        <Join
          className="mb-4"
          description="Register to record, reflect, and improve your musical journey. Progress will not be saved unless registered. "
        />
      )}

      <PracticeTimer />
    </ScreenLayout>
  );
}
