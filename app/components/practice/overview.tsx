import React from "react";
import { usePractice } from "@/hooks/usePractice";
import { View, Text } from "react-native";
import { Practice } from "@/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Ionicons } from "@expo/vector-icons";
import { StartActivityBanner } from "../start-activity";
import { formatDuration } from "@/utils/format";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface Props {
  className?: string;
}

export function PracticeOverview(props: Props) {
  const { practicesQuery } = usePractice();
  const data = practicesQuery.data;

  let className = "flex-col mt-4";
  if (props.className) className += ` ${props.className}`;

  if (!data || data?.items?.length === 0) {
    return (
      <View className={className}>
        <StartActivityBanner />
      </View>
    );
  }

  return (
    <View className={className}>
      <View className="flex flex-row gap-2 justify-between mb-4">
        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <Text className="text-4xl font-bold text-base-content">
            {data.total}
          </Text>
          <Text className="text-muted">Total sessions</Text>
        </View>

        <View className="flex flex-col bg-base-200 rounded-xl p-4 gap-2 flex-1">
          <Text className="text-4xl font-bold text-base-content">
            {formatDuration(data.totalDuration)}
          </Text>
          <Text className="text-muted">
            {data.totalDuration < 7200 && <>Total minutes</>}
            {data.totalDuration >= 7200 && <>Total hours</>}
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
            const count = data.items.filter((i: Practice) =>
              practiceDay.isSame(dayjs(i.timestamp), "day")
            );

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

      {data.items.splice(0, 5).map((practice: Practice) => {
        return (
          <View
            key={practice.id}
            className="flex-row py-2 border-b border-base-300"
          >
            <View className="shrink-0 w-12 mr-4">
              <View className="bg-accent w-full h-full rounded-xl items-center justify-center">
                {/* // TODO: Change Icon to instrument type (or default) */}
                <Ionicons
                  name="star"
                  size={18}
                  className="color-accent-content"
                />
              </View>
            </View>
            <View className="flex-1">
              <View className="flex flex-row items-center">
                <Text className="text-lg font-bold text-base-content w-full">
                  {dayjs(practice.timestamp).format("ddd, MMM DD")}
                </Text>
                <Text className="text-xs text-muted ml-2 shrink-0">
                  {dayjs(practice.timestamp).fromNow()}
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex flex-row flex-1 items-center">
                  <Ionicons
                    name="time-outline"
                    size={18}
                    className="text-muted"
                  />
                  <View className="text-muted ml-2">
                    {formatDuration(practice.duration, false, true)}
                  </View>
                </View>
                <View className="flex flex-row shrink-0 ml-2">
                  {Array.from(Array(practice.rating ?? 0).keys()).map((i) => (
                    <Ionicons
                      key={`${practice.id}_rating_${i}`}
                      name="star"
                      size={12}
                      color="#a0acb7"
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
