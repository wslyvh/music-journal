import { View, Text } from "react-native";
import { Button } from "../button";
import { ConfirmPractice } from "./confirm";
import { formatTime } from "@/utils/format";
import { router } from "expo-router";
import { useEffect } from "react";
import { useState } from "react";

export function PracticeTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const onStopPractice = () => {
    setIsRunning(false);
    setIsStopping(true);
  };

  const onResumePractice = () => {
    setIsStopping(false);
    setIsRunning(true);
  };

  const onEndPractice = () => {
    console.log("End practice. Save to db, reset and navigate to home.");
    setTime(0);
    setIsRunning(false);
    setIsStopping(false);

    router.replace("/");
  };

  return (
    <View className="space-y-6">
      {!isStopping && (
        <>
          <View className="items-center justify-center my-8">
            <View className="w-48 h-48 rounded-full border-2 border-base-300 items-center justify-center border-2">
              <Text className="text-4xl font-bold text-base-content">
                {formatTime(time)}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center space-between space-x-4 mt-8">
            {!isRunning && time === 0 && (
              <Button
                onPress={() => setIsRunning(true)}
                text="Start Practice"
                className="flex-1"
              />
            )}

            {(isRunning || time > 0) && (
              <>
                <Button
                  onPress={
                    isRunning ? () => setIsRunning(false) : onResumePractice
                  }
                  text={isRunning ? "Pause" : "Resume"}
                  type="primary"
                  className="flex-1"
                />
                <Button
                  onPress={onStopPractice}
                  text="Finish session"
                  type="secondary"
                  className="flex-1"
                />
              </>
            )}
          </View>
        </>
      )}

      {isStopping && (
        <ConfirmPractice
          time={time}
          onResumePractice={onResumePractice}
          onEndPractice={onEndPractice}
        />
      )}
    </View>
  );
}
