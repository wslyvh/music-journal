import React from "react";
import { View } from "react-native";
import { Text } from "@/components/text";
import { Practice } from "@/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Ionicons } from "@expo/vector-icons";
import { StartActivityBanner } from "../start-activity";
import { formatDuration } from "@/utils/format";
import { Link } from "expo-router";
import { usePractices } from "@/hooks/practice/usePractices";
import { THEME_COLORS } from "@/utils/theme";
import { usePracticeStats } from "@/hooks/practice/usePracticeStats";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface Props {
  className?: string;
}

export function PracticeOverview(props: Props) {
  const { data: practices, refetch: refetchPractices } = usePractices();
  const { data: stats } = usePracticeStats();

  let className = "flex-col mt-4";
  if (props.className) className += ` ${props.className}`;

  if (practices?.length === 0 || !stats) {
    return (
      <>
        <View className={className}>
          <StartActivityBanner />
        </View>

        <View className="flex flex-col items-center justify-center mt-4">
          <Text
            className="text-muted italic mt-4"
            onPress={() => refetchPractices()}
          >
            No practices found
          </Text>
        </View>
      </>
    );
  }

  return (
    <View className={className}>
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
          </Text>
          <Text className="text-muted">
            {stats.totalDuration < 7200 && <>Total minutes</>}
            {stats.totalDuration >= 7200 && <>Total hours</>}
          </Text>
        </View>
      </View>

      <View className="bg-base-200 rounded-xl p-4 mb-4 gap-2">
        <Text className="text-xl font-bold text-base-content">
          Lastest activity
        </Text>
        <Text className="text-muted">Past week</Text>

        <View className="flex flex-row mt-4">
          {[7, 6, 5, 4, 3, 2, 1, 0].map((i) => {
            const practiceDay = dayjs().subtract(i, "day");
            const count = practices?.filter((i: Practice) =>
              practiceDay.isSame(dayjs(i.timestamp), "day")
            );

            if (!count) return null;

            return (
              <View
                className="flex flex-col items-center flex-1"
                key={`daily_${i}`}
              >
                <View className="w-full max-w-4 h-32 justify-end">
                  {count.length === 0 && (
                    <View className="bg-neutral rounded h-2"></View>
                  )}
                  {count.length > 0 && (
                    <View className="bg-primary rounded h-32"></View>
                  )}
                </View>
                <Text className="text-xs text-muted mt-2">
                  {practiceDay.format("ddd")}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {practices?.slice(0, 5).map((practice: Practice) => {
        return (
          <Link href={`/practice/${practice.id}`} key={practice.id} asChild>
            <View className="flex-row py-4 border-b border-base-300 items-center active:opacity-70">
              <View className="w-12 h-12 mr-4">
                <View className="bg-secondary rounded-lg w-full h-full items-center justify-center">
                  <Ionicons
                    name="stats-chart"
                    size={18}
                    color={THEME_COLORS["secondary-content"]}
                  />
                </View>
              </View>

              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-base font-bold text-base-content flex-shrink">
                    {dayjs(practice.timestamp).format("ddd, MMM DD")}
                  </Text>
                  <Text className="text-xs text-muted ml-2">
                    {dayjs(practice.timestamp).fromNow()}
                  </Text>
                </View>

                <View className="flex-row items-center mt-2">
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={THEME_COLORS["muted"]}
                    />
                    <Text className="text-muted text-sm ml-2">
                      {formatDuration(practice.duration, false, true)}
                    </Text>
                  </View>
                  <View className="flex-row">
                    {Array.from(Array(practice.rating ?? 0).keys()).map((i) => (
                      <Ionicons
                        key={`${practice.id}_rating_${i}`}
                        name="star"
                        size={12}
                        color={THEME_COLORS["muted"]}
                        style={{ marginLeft: 2 }}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </Link>
        );
      })}
    </View>
  );
}
