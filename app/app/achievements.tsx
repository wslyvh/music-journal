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

const weeks = 24;

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
          <View className="flex-row items-baseline pt-2">
            <Text className="text-4xl font-bold text-base-content">
              {stats.total}
            </Text>
          </View>
          <Text className="text-muted">Total sessions</Text>
        </View>

        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <View className="flex-row items-baseline pt-2">
            <Text className="text-4xl font-bold text-base-content">
              {formatDuration(stats.totalDuration)}
            </Text>
            <Text className="text-2xl text-muted ml-1">
              {stats.totalDuration < 7200 && " min"}
              {stats.totalDuration >= 7200 && " hr"}
            </Text>
          </View>
          <Text className="text-muted">Total practice time</Text>
        </View>
      </View>

      <View className="flex flex-row gap-4 justify-between mb-8">
        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <View className="flex-row items-baseline pt-2">
            <Text className="text-4xl font-bold text-base-content">
              {formatDuration(stats.averageSession)}
            </Text>
            <Text className="text-2xl text-muted ml-1">
              {stats.averageSession > 7200 && " hr"}
              {stats.averageSession < 7200 && " min"}
            </Text>
          </View>
          <Text className="text-muted">Average session</Text>
        </View>

        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <View className="flex-row items-baseline pt-2">
            <Text className="text-4xl font-bold text-base-content">
              {formatDuration(stats.longestSession)}
            </Text>
            <Text className="text-2xl text-muted ml-1">
              {stats.longestSession > 7200 && " hr"}
              {stats.longestSession < 7200 && " min"}
            </Text>
          </View>
          <Text className="text-muted">Longest session</Text>
        </View>
      </View>

      <Text className="text-xl font-bold text-base-content mb-4">Overview</Text>

      <View className="flex flex-row gap-4 justify-between mb-8">
        <View className="flex flex-col gap-1 flex-1">
          <View className="flex flex-row gap-1">
            {[...Array(weeks)].map((_, weekIndex) => (
              <View
                key={`week-${weekIndex}`}
                className="flex flex-col gap-1 flex-1"
              >
                {[...Array(7)].map((_, dayIndex) => {
                  const date = dayjs()
                    .subtract(weeks - 1 - weekIndex, "weeks")
                    .startOf("week")
                    .add(dayIndex, "days");

                  if (date.isAfter(dayjs())) {
                    return null;
                  }

                  const activityDay = stats.days.find((day) =>
                    dayjs(day.date).isSame(date, "day")
                  );

                  return (
                    <View
                      key={date.format("YYYY-MM-DD")}
                      className={`aspect-square rounded-md ${
                        activityDay
                          ? activityDay.duration <= 600
                            ? "bg-primary/40"
                            : activityDay.duration <= 1200
                            ? "bg-primary/60"
                            : activityDay.duration <= 1800
                            ? "bg-primary/80"
                            : "bg-primary"
                          : "bg-base-200"
                      }`}
                    >
                      <Text className="text-xs text-center text-muted pt-1">
                        {/* {date.format("DD")} */}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>

          <View className="flex flex-row mt-1 gap-1">
            {[...Array(weeks)].map((_, weekIndex) => {
              const date = dayjs()
                .subtract(weeks - 1 - weekIndex, "weeks")
                .startOf("week");
              const nextWeek = date.add(1, "week");

              return (
                <View key={`month-${weekIndex}`} className="flex-1 relative">
                  {date.format("MMM") !== nextWeek.format("MMM") && (
                    <Text className="text-xs absolute left-0 w-8">
                      {nextWeek.format("MMM")}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <Text className="text-xl font-bold text-base-content mt-2 mb-4">
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
