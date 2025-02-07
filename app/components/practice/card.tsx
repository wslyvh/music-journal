import React from "react";
import { View } from "react-native";
import { Text } from "@/components/text";
import { Practice } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { formatDuration } from "@/utils/format";
import { Link } from "expo-router";
import { THEME_COLORS } from "@/utils/theme";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface Props {
  className?: string;
  item: Practice;
}

export function PracticeCard(props: Props) {
  return (
    <Link href={`/practices/${props.item.id}`} key={props.item.id} asChild>
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
              {dayjs(props.item.timestamp).format("ddd, MMM DD")}
            </Text>
            <Text className="text-xs text-muted ml-2">
              {dayjs(props.item.timestamp).fromNow()}
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
                {formatDuration(props.item.duration, false, true)}
              </Text>
            </View>
            <View className="flex-row">
              {Array.from(Array(props.item.rating ?? 0).keys()).map((i) => (
                <Ionicons
                  key={`${props.item.id}_rating_${i}`}
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
}
