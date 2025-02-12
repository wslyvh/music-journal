import React from "react";
import { View, Text } from "react-native";
import { StarRating } from "./rating";
import { Input } from "../input";
import { usePracticeContext } from "@/context/practice";

interface Props {
  className?: string;
}

export function PracticeNotes(props: Props) {
  const practice = usePracticeContext();

  let className = "flex-col";
  if (props.className) className += ` ${props.className}`;

  return (
    <View className={className}>
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
          placeholder="Set your goals prior to this session..."
          value={practice.current?.goals}
          onChangeText={(value: string) =>
            practice.setPractice({ ...practice.current, goals: value })
          }
          numberOfLines={3}
          textAlignVertical="top"
          style={{ textAlignVertical: "top" }}
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
          numberOfLines={3}
          textAlignVertical="top"
          style={{ textAlignVertical: "top" }}
          multiline
        />
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold">Additional data</Text>
        <Input
          className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
            practice.current.data ? "text-base-content" : "text-muted"
          }`}
          placeholder="Any numeric value, e.g. BPM, etc."
          value={practice.current?.data?.toString()}
          numeric
          onChangeText={(value: string) => {
            practice.setPractice({
              ...practice.current,
              data: Number(value),
            });
          }}
        />
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold">External resource</Text>
        <Input
          className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
            practice.current.resource ? "text-base-content" : "text-muted"
          }`}
          placeholder="e.g. YouTube video, tutorial, page nr, etc."
          value={practice.current?.resource}
          onChangeText={(value: string) => {
            practice.setPractice({
              ...practice.current,
              resource: value,
            });
          }}
        />
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold mt-2">How did it go?</Text>
        <StarRating
          className="mt-4"
          score={practice.current?.rating ?? 0}
          onScore={(value: number) =>
            practice.setPractice({ ...practice.current, rating: value })
          }
        />
      </View>
    </View>
  );
}
