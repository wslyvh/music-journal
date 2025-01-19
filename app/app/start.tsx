import { ScreenLayout } from "@/components/screen-layout";
import { PracticeTimer } from "@/components/practice/timer";
import { Join } from "@/components/account/banner";
import { useAuth } from "@/hooks/useAuth";
import { useRecorder } from "@/context/recording";
import { Text } from "@/components/text";
import { Permissions } from "@/components/permissions";

export default function Start() {
  const recorder = useRecorder();
  const { account, accountError } = useAuth();

  if (accountError) {
    return <Text>Error: {accountError.message}</Text>;
  }

  return (
    <ScreenLayout title="Practice Timer" cancelable={recorder.state !== ""}>
      <Permissions className="my-4" />

      {!account && (
        <Join
          className="mb-4"
          description="Register to record your practice sessions. Progress will otherwise be lost."
        />
      )}

      <PracticeTimer />
    </ScreenLayout>
  );
}
