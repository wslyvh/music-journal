import { View, Text } from "react-native";
import { Button } from "../button";
import { ConfirmPractice } from "./confirm";
import { formatTime } from "@/utils/format";
import { useRecorder } from "@/context/recording";

export function PracticeTimer() {
  const recorder = useRecorder();

  return (
    <View className="space-y-6">
      {recorder.state === "STOPPED" && <ConfirmPractice />}

      {recorder.state !== "STOPPED" && (
        <>
          <View className="items-center justify-center my-8">
            <View className="w-48 h-48 rounded-full border-2 border-base-300 items-center justify-center border-2">
              <Text className="text-4xl font-bold text-base-content">
                {formatTime(recorder.timer)}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center space-between space-x-4 mt-8">
            {recorder.state === "" && (
              <Button
                onPress={() => recorder.start()}
                text="Start Practice"
                className="flex-1"
              />
            )}

            {recorder.state !== "" && (
              <>
                <Button
                  onPress={
                    recorder.state === "RUNNING"
                      ? () => recorder.pause()
                      : () => recorder.resume()
                  }
                  text={recorder.state === "RUNNING" ? "Pause" : "Resume"}
                  type="primary"
                  className="flex-1"
                />
                <Button
                  onPress={() => recorder.stop()}
                  text="Finish session"
                  type="neutral"
                  className="flex-1"
                />
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
}
