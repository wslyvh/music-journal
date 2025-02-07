import { View } from "react-native";
import { memo } from "react";
import { Sheet } from "@/components/sheet";
import { THEME_COLORS } from "@/utils/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { StarRating } from "./rating";
import { usePracticeContext } from "@/context/practice";
import { PracticeAlarm } from "./alarm";

export const PracticeFeatures = memo(function PracticeFeatures() {
  const practice = usePracticeContext();

  return (
    <>
      <View className="flex flex-row items-center justify-center gap-8">
        <Sheet
          trigger={
            <View className="w-16 h-16 rounded-full bg-base-200 items-center justify-center">
              <Ionicons
                name="reader-outline"
                size={28}
                color={THEME_COLORS["base-content"]}
                className="text-base-content"
              />
            </View>
          }
        >
          <View className="flex flex-col">
            <Text className="text-lg font-bold">Practice notes</Text>

            <View className="my-4">
              <View className="flex flex-row">
                <Text>What are your goals for today?</Text>
              </View>

              <Input
                className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
                  practice.current.goals?.length &&
                  practice.current.goals?.length > 0
                    ? "text-base-content"
                    : "text-muted"
                }`}
                placeholder="Set your intention for this session..."
                value={practice.current?.goals}
                onChangeText={(value: string) =>
                  practice.setPractice({ ...practice.current, goals: value })
                }
                multiline
              />
            </View>

            <View className="my-4">
              <View className="flex flex-row">
                <Text>What did you learn?</Text>
              </View>

              <Input
                className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
                  practice.current.notes?.length &&
                  practice.current.notes?.length > 0
                    ? "text-base-content"
                    : "text-muted"
                }`}
                placeholder="Add any notes after the session..."
                value={practice.current?.notes}
                onChangeText={(value: string) =>
                  practice.setPractice({ ...practice.current, notes: value })
                }
                multiline
              />
            </View>

            <View className="my-4">
              <View className="flex flex-row">
                <Text>How do you feel about this session?</Text>
              </View>

              <View className="mt-4">
                <StarRating
                  score={practice.current.rating || 0}
                  onScore={(value) => {
                    practice.setPractice({
                      ...practice.current,
                      rating: value,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </Sheet>

        <Sheet
          trigger={
            <View className="w-16 h-16 rounded-full bg-base-200 items-center justify-center">
              <Ionicons
                name="alarm-outline"
                size={28}
                color={THEME_COLORS["base-content"]}
                className="text-base-content"
              />
            </View>
          }
        >
          <PracticeAlarm />
        </Sheet>

        <Sheet
          trigger={
            <View className="w-16 h-16 rounded-full bg-base-200 items-center justify-center">
              <MaterialCommunityIcons
                name="metronome"
                size={28}
                color={THEME_COLORS["muted"]}
                className="text-muted opacity-40"
              />
            </View>
          }
        >
          <View className="flex flex-col">
            <Text className="text-lg font-bold">Metronome</Text>
            <View className="flex flex-row mt-4">
              <Text className="text-muted">Coming soon</Text>
            </View>
          </View>
        </Sheet>

        <Sheet
          trigger={
            <View className="w-16 h-16 rounded-full bg-base-200 items-center justify-center">
              <Ionicons
                name="mic-outline"
                size={28}
                color={THEME_COLORS["muted"]}
                className="text-muted opacity-40"
              />
            </View>
          }
        >
          <View className="flex flex-col">
            <Text className="text-lg font-bold">Recording</Text>
            <View className="flex flex-row mt-4">
              <Text className="text-muted">Coming soon</Text>
            </View>
          </View>
        </Sheet>
      </View>
    </>
  );
});
