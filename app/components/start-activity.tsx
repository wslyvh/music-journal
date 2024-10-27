import { View, Text } from "react-native";
import { Button } from "@/components/button";
import { router } from "expo-router";

export function StartActivityBanner() {
  return (
    <View className="flex bg-base-200 rounded-xl p-8 gap-2">
      <Text className="text-xl font-bold text-base-content">Ready to jam?</Text>
      <Text className="mb-2 text-base-content">
        Pick up your instrument and start a new practice session. All your stats
        will be recorded here when you finish.
      </Text>

      <Button text="Start Activity" onPress={() => router.push("/start")} />
    </View>
  );
}
