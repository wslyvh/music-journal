import { View } from "react-native";
import { memo } from "react";
import { Sheet } from "@/components/sheet";
import { THEME_COLORS } from "@/utils/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@/components/text";
import { PracticeAlarm } from "./alarm";
import { PracticeNotes } from "./notes";

export const PracticeFeatures = memo(function PracticeFeatures() {
  return (
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

          <PracticeNotes />
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
  );
});
