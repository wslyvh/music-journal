import { ScreenLayout } from "@/components/screen-layout";
import { Text } from "@/components/text";
import { useAchievements } from "@/hooks/practice/useAchievements";
import { usePracticeStats } from "@/hooks/practice/usePracticeStats";
import { Achievement } from "@/types";
import { formatDuration } from "@/utils/format";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLORS } from "@/utils/theme";
import dayjs from "dayjs";

export default function Achievements() {
  const { data: stats } = usePracticeStats();
  const { data: achievements } = useAchievements();

  if (!stats || !achievements)
    return (
      <ScreenLayout title="Achievements">
        <Text className="text-center text-muted">
          No data available. Start practicing to unlock achievements.
        </Text>
      </ScreenLayout>
    );

  return (
    <ScreenLayout title="Achievements">
      <View className="flex flex-row gap-4 justify-between mb-4">
        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <Text className="text-4xl font-bold text-base-content">
            {stats.total}
          </Text>
          <Text className="text-muted">Total sessions</Text>
        </View>

        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <Text className="text-4xl font-bold text-base-content">
            {formatDuration(stats.totalDuration)}
            <Text className="text-2xl text-muted">
              {stats.totalDuration < 7200 && " min"}
              {stats.totalDuration >= 7200 && " hr"}
            </Text>
          </Text>
          <Text className="text-muted">Total practice time</Text>
        </View>
      </View>

      <View className="flex flex-row gap-4 justify-between mb-4">
        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <Text className="text-4xl font-bold text-base-content">
            {formatDuration(stats.averageSession)}
            <Text className="text-2xl text-muted">
              {stats.averageSession > 7200 && " hr"}
              {stats.averageSession < 7200 && " min"}
            </Text>
          </Text>
          <Text className="text-muted">Average session</Text>
        </View>

        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <Text className="text-4xl font-bold text-base-content">
            {formatDuration(stats.longestSession)}
            <Text className="text-2xl text-muted">
              {stats.longestSession > 7200 && " hr"}
              {stats.longestSession < 7200 && " min"}
            </Text>
          </Text>
          <Text className="text-muted">Longest session</Text>
        </View>
      </View>

      <Text className="text-xl font-bold text-base-content mt-2 mb-6">
        Progress{" "}
        <Text className="text-sm text-muted ml-2">
          {achievements?.filter((i: Achievement) => i.completed).length} /{" "}
          {achievements.length}
        </Text>
      </Text>

      <View className="flex flex-col gap-4">
        {achievements?.map((i: Achievement) => (
          <View
            key={i.id}
            className="flex flex-row bg-base-200 rounded-xl p-4 gap-4 flex-1"
          >
            <View className="w-20 h-20 justify-center items-center bg-base-300 rounded-lg">
              {i.completed ? (
                <Ionicons name="trophy" size={24} color="#FFD700" />
              ) : (
                <Ionicons
                  name="lock-closed"
                  size={24}
                  color={THEME_COLORS["base-100"]}
                />
              )}
            </View>

            <View className="flex-1">
              <Text className="text-xl font-bold text-base-content">
                {i.title}
              </Text>
              <Text className="text-muted mt-2">{i.description}</Text>
              <Text className="text-muted italic mt-2">
                {i.completed
                  ? dayjs(i.completed).format("DD MMM YYYY")
                  : "Locked"}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenLayout>
  );
}
