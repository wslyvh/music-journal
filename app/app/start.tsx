import { ScreenLayout } from "@/components/screen-layout";
import { PracticeTimer } from "@/components/practice/timer";
import { Join } from "@/components/account/banner";
import { useAuth } from "@/hooks/useAuth";
import { useRecorder } from "@/context/recording";

export default function Start() {
  const recorder = useRecorder();
  const { isAuthenticated } = useAuth();

  return (
    <ScreenLayout title="Practice Timer" cancelable={recorder.state !== ""}>
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
