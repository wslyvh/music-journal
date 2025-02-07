import React from "react";
import { View, Text } from "react-native";
import { Button } from "../button";
import { StarRating } from "./rating";
import { formatTime } from "@/utils/format";
import { useRecorder } from "@/context/recording";
import { Input } from "../input";
import { InstrumentPicker } from "../instrument-picker";
import { useInstrument } from "@/hooks/useInstrument";
import { usePracticeContext } from "@/context/practice";

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

      <View className="mt-4">
        <Text className="text-base-content font-bold">
          What are your goals for today
        </Text>
        <Input
          className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
            practice.current.goals?.length && practice.current.goals?.length > 0
              ? "text-base-content"
              : "text-muted"
          }`}
          placeholder="Set your intention for this session..."
          value={practice.current?.goals}
          onChangeText={(value: string) =>
            practice.setPractice({ ...practice.current, goals: value })
          }
          numberOfLines={5}
          multiline
        />
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold">
          What did you practice today?
        </Text>
        <Input
          className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
            practice.current.notes?.length && practice.current.notes?.length > 0
              ? "text-base-content"
              : "text-muted"
          }`}
          placeholder="Add any notes after the session..."
          value={practice.current?.notes}
          onChangeText={(value: string) =>
            practice.setPractice({ ...practice.current, notes: value })
          }
          numberOfLines={5}
          multiline
        />
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold">How did it go?</Text>
        <StarRating
          className="mt-4"
          score={practice.current?.rating ?? 0}
          onScore={(value: number) =>
            practice.setPractice({ ...practice.current, rating: value })
          }
        />
      </View>

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
