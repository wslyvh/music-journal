import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "../button";
import { StarRating } from "./rating";
import { formatTime } from "@/utils/format";
import { usePractice } from "@/hooks/usePractice";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  time: number;
  onResumePractice: () => void;
  onEndPractice: () => void;
}

export function ConfirmPractice(props: Props) {
  const { account } = useAuth();
  const { createPracticeMutation } = usePractice();
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);

  async function submitPractice() {
    createPracticeMutation.mutate({
      type: account?.instruments?.[0] ?? "My Instrument",
      duration: props.time,
      notes: notes,
      rating: rating,
      visibility: 1,
    });

    props.onEndPractice();
  }

  return (
    <View className="flex-col">
      <View className="space-y-4">
        <View className="flex-row justify-between border-b border-base-300 pb-4">
          <Text className="text-base-content font-bold">Category</Text>
          <Text className="text-base-content">default</Text>
          {/* // TODO: Select Dropbox with my Instruments  */}
        </View>
        <View className="flex-row justify-between border-b border-base-300 pb-4">
          <Text className="text-base-content font-bold">Practice Time</Text>
          <Text className="text-base-content">{formatTime(props.time)}</Text>
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold">
          What did you practice today?
        </Text>
        <TextInput
          className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
            notes.length > 0 ? "text-base-content" : "text-muted"
          }`}
          placeholder="Notes..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      <View className="mt-4">
        <Text className="text-base-content font-bold">How did it go?</Text>
        <StarRating className="mt-4" score={rating} onScore={setRating} />
      </View>

      <View className="flex-row space-between space-x-4 mt-8">
        <Button
          onPress={submitPractice}
          text="End Session"
          type="primary"
          className="flex-1"
        />
        <Button
          onPress={props.onResumePractice}
          text="Resume Practice"
          type="secondary"
          className="flex-1"
        />
      </View>
    </View>
  );
}
