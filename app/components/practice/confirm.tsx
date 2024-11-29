import React from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "../button";
import { StarRating } from "./rating";
import { formatTime } from "@/utils/format";
import { useRecorder } from "@/context/recording";

interface Props {
  className?: string;
}

export function ConfirmPractice(props: Props) {
  const recorder = useRecorder();

  let className = "flex-col";
  if (props.className) className += ` ${props.className}`;

  return (
    <View className={className}>
      <View className="space-y-4">
        <View className="flex-row justify-between border-b border-base-300 pb-4">
          <Text className="text-base-content font-bold">Category</Text>
          <Text className="text-base-content">default</Text>
          {/* // TODO: Select Dropbox with my Instruments  */}
        </View>
        <View className="flex-row justify-between border-b border-base-300 pb-4">
          <Text className="text-base-content font-bold">Practice Time</Text>
          <Text className="text-base-content">
            {formatTime(recorder.timer)}
          </Text>
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold">
          What did you practice today?
        </Text>
        <TextInput
          className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
            recorder.current.notes?.length && recorder.current.notes?.length > 0
              ? "text-base-content"
              : "text-muted"
          }`}
          placeholder="Notes..."
          value={recorder.current?.notes}
          onChangeText={(value: string) =>
            recorder.setPractice({ ...recorder.current, notes: value })
          }
          multiline
        />
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold">How did it go?</Text>
        <StarRating
          className="mt-4"
          score={recorder.current?.rating ?? 0}
          onScore={(value: number) =>
            recorder.setPractice({ ...recorder.current, rating: value })
          }
        />
      </View>

      <View className="flex-row space-between space-x-4 mt-8">
        <Button
          onPress={() => recorder.submit()}
          text="End Session"
          type="primary"
          className="flex-1"
        />
        <Button
          onPress={() => recorder.resume()}
          text="Resume Practice"
          type="neutral"
          className="flex-1"
        />
      </View>
    </View>
  );
}
