import { ScreenLayout } from "@/components/screen-layout";
import { PracticeTimer } from "@/components/practice/timer";
import { useRecorder } from "@/context/recording";
import { Permissions } from "@/components/permissions";

export default function Practice() {
  const recorder = useRecorder();

  return (
    <ScreenLayout title="Practice Timer" cancelable={recorder.state !== ""}>
      <Permissions className="my-4" />

      <PracticeTimer />
    </ScreenLayout>
  );
}
