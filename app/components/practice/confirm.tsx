import React from "react";
import { View, Text } from "react-native";
import { Button } from "../button";
import { formatTime } from "@/utils/format";
import { useRecorder } from "@/context/recording";
import { InstrumentPicker } from "../instrument-picker";
import { useInstrument } from "@/hooks/useInstrument";
import { usePracticeContext } from "@/context/practice";
import { PracticeNotes } from "./notes";

interface Props {
  className?: string;
}

export function ConfirmPractice(props: Props) {
  const practice = usePracticeContext();
  const recorder = useRecorder();
  const instrument = useInstrument();

  let className = "flex-col";
  if (props.className) className += ` ${props.className}`;

  return (
    <View className={className}>
      <View className="gap-4">
        <InstrumentPicker
          items={instrument ? [instrument] : []}
          selected={instrument ?? ""}
          onSelect={(value) =>
            practice.setPractice({ ...practice.current, type: value })
          }
        />
        <View className="flex-row justify-between border-b border-base-300 pb-4 mt-4">
          <Text className="text-base-content font-bold">Practice Time</Text>
          <Text className="text-base-content">
            {formatTime(recorder.timer)}
          </Text>
        </View>
      </View>

      <PracticeNotes />

      <View className="flex flex-col space-between mt-8 gap-4">
        <Button
          onPress={() => recorder.resume()}
          text="Resume Practice"
          type="neutral"
        />
        <Button
          onPress={() => recorder.submit()}
          text="End Session"
          type="primary"
        />
      </View>
    </View>
  );
}
