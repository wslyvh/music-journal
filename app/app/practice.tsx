import { ScreenLayout } from "@/components/screen-layout";
import { PracticeTimer } from "@/components/practice/timer";
import { useRecorder } from "@/context/recording";

export default function Practice() {
  const recorder = useRecorder();

  return (
    <ScreenLayout title="Start Jamming" cancelable={recorder.state !== ""}>
      <PracticeTimer />
    </ScreenLayout>
  );
}
