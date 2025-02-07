import { ScreenLayout } from "@/components/screen-layout";
import { router, useLocalSearchParams } from "expo-router";
import { usePractice } from "@/hooks/practice/usePractice";
import { View } from "react-native";
import { formatTime } from "@/utils/format";
import { StarRating } from "@/components/practice/rating";
import { InstrumentPicker } from "@/components/instrument-picker";
import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import dayjs from "dayjs";
import { AudioPlayer } from "@/components/audio-player";

export default function PracticeDetails() {
  const { id } = useLocalSearchParams();
  const practice = usePractice(id as string);
  const [updatedPractice, setUpdatedPractice] = useState(practice.data);

  useEffect(() => {
    setUpdatedPractice(practice.data);
  }, [practice.data]);

  if (practice.isLoading) return <ScreenLayout title="Loading..." />;

  if (!updatedPractice)
    return (
      <ScreenLayout title="Not found">
        <View className="items-center justify-center">
          <Text className="text-lg font-bold text-base-content mt-8 mb-4">
            Practice not found
          </Text>
          <Button text="Go Back" onPress={() => router.push("/")} />
        </View>
      </ScreenLayout>
    );

  return (
    <ScreenLayout
      title={dayjs(updatedPractice.timestamp).format("ddd, MMM DD")}
      goBack
      // shareData={{
      //   title: "Check out my practice session!",
      //   message: `I practiced ${formatTime(
      //     updatedPractice.duration
      //   )} on ${dayjs(updatedPractice.timestamp).format("MMM DD, YYYY")}`,
      //   url: `${CONFIG.APP_URL}/practice/${id}`,
      // }}
    >
      <View className="">
        <View className="gap-4 mb-2">
          <InstrumentPicker
            items={[updatedPractice.type]}
            selected={updatedPractice.type}
            onSelect={(value) => {
              setUpdatedPractice({ ...updatedPractice, type: value });
            }}
          />
          <View className="flex-row justify-between border-b border-base-300 pb-4">
            <Text className="text-base-content font-bold">Date</Text>
            <Text className="text-base-content">
              {dayjs(updatedPractice.timestamp).format("MMM DD, YYYY")} at{" "}
              {dayjs(updatedPractice.timestamp).format("HH:mm")}
            </Text>
          </View>
          <View className="flex-row justify-between border-b border-base-300 pb-4">
            <Text className="text-base-content font-bold">Time Practiced</Text>
            <Text className="text-base-content">
              {formatTime(updatedPractice.duration)}
            </Text>
          </View>
        </View>

        <View className="my-2">
          <Text className="font-bold">Goals</Text>

          <Input
            className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
              updatedPractice.goals?.length && updatedPractice.goals?.length > 0
                ? "text-base-content"
                : "text-muted"
            }`}
            placeholder="Goals..."
            value={updatedPractice.goals}
            onChangeText={(value: string) =>
              setUpdatedPractice({ ...updatedPractice, goals: value })
            }
            multiline
          />
        </View>

        <View className="my-2">
          <Text className="font-bold">Notes</Text>

          <Input
            className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
              updatedPractice.notes?.length && updatedPractice.notes?.length > 0
                ? "text-base-content"
                : "text-muted"
            }`}
            placeholder="Notes..."
            value={updatedPractice.notes}
            onChangeText={(value: string) =>
              setUpdatedPractice({ ...updatedPractice, notes: value })
            }
            multiline
          />
        </View>

        <View className="my-2">
          <Text className="font-bold">Recording</Text>
          {!updatedPractice.recordingUrl && (
            <Text className="text-muted italic mt-4">
              No recording available
            </Text>
          )}
          {updatedPractice.recordingUrl && (
            <AudioPlayer url={updatedPractice.recordingUrl} className="mt-4" />
          )}
        </View>

        <View className="my-2">
          <Text className="font-bold">Rating</Text>
          <StarRating
            score={updatedPractice.rating}
            onScore={(value) => {
              setUpdatedPractice({ ...updatedPractice, rating: value });
            }}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}
