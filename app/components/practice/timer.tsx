import React, { View } from "react-native";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { ConfirmPractice } from "@/components/practice/confirm";
import { formatTime } from "@/utils/format";
import { useRecorder } from "@/context/recording";
import { PracticeFeatures } from "@/components/practice/features";

export function PracticeTimer() {
  const recorder = useRecorder();

  return (
    <View className="gap-4">
      {recorder.state === "STOPPED" && <ConfirmPractice />}

      {recorder.state !== "STOPPED" && (
        <>
          <View className="items-center justify-center my-8">
            <View className="w-48 h-48 rounded-full border-2 border-base-300 items-center justify-center border-2">
              <Text className="text-4xl font-bold">
                {formatTime(recorder.timer)}
              </Text>
            </View>
          </View>

          <PracticeFeatures />

          <View className="flex flex-col justify-center space-between mt-8 gap-4">
            {recorder.state === "" && (
              <Button onPress={() => recorder.start()} text="Start Session" />
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
                  type="neutral"
                />
                <Button
                  onPress={() => recorder.stop()}
                  text="Finish session"
                  type="primary"
                />
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
}
