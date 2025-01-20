import { Animated, Easing, View } from "react-native";
import { Sheet } from "@/components/sheet";
import { THEME_COLORS } from "@/utils/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useRef } from "react";
import { Text } from "@/components/text";
import { useRecorder } from "@/context/recording";
import { Input } from "@/components/input";

export function PracticeFeatures() {
  const recorder = useRecorder();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <View className="flex flex-row items-center justify-center space-x-8">
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
          <View className="flex flex-col">
            <Text className="text-lg font-bold">Practice timer</Text>
            <View className="flex flex-row mt-4">
              <Text>10 min</Text>
            </View>
          </View>
        </Sheet>

        <Sheet
          trigger={
            <View className="w-16 h-16 rounded-full bg-base-200 items-center justify-center">
              <MaterialCommunityIcons
                name="metronome"
                size={28}
                color={THEME_COLORS["base-content"]}
                className="text-base-content"
              />
            </View>
          }
        >
          <View className="flex flex-col">
            <Text className="text-lg font-bold">Metronome</Text>
            <View className="flex flex-row mt-4">
              <Text>120 BPM</Text>
            </View>
          </View>
        </Sheet>

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
            <Text className="text-lg font-bold">Notes</Text>
            <View className="flex flex-row mt-4">
              <Text>What are you working on?</Text>
            </View>

            <Input
              className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
                recorder.current.notes?.length &&
                recorder.current.notes?.length > 0
                  ? "text-base-content"
                  : "text-muted"
              }`}
              placeholder="Practice notes..."
              value={recorder.current?.notes}
              onChangeText={(value: string) =>
                recorder.setPractice({ ...recorder.current, notes: value })
              }
              multiline
            />
          </View>
        </Sheet>

        <Sheet
          trigger={
            <View className="w-16 h-16 rounded-full bg-base-200 items-center justify-center">
              {recorder.state === "RUNNING" ? (
                <Animated.View style={{ opacity: pulseAnim }}>
                  <Ionicons
                    name="mic-outline"
                    size={28}
                    color={THEME_COLORS.primary}
                    className="text-primary"
                  />
                </Animated.View>
              ) : (
                <Ionicons
                  name="mic-outline"
                  size={28}
                  color={THEME_COLORS["base-content"]}
                  className="text-base-content"
                />
              )}
            </View>
          }
        >
          <View className="flex flex-col">
            <Text className="text-lg font-bold">Recording</Text>
            <View className="flex flex-row mt-4">
              <Text>Recording...</Text>
            </View>
          </View>
        </Sheet>
      </View>
    </>
  );
}
