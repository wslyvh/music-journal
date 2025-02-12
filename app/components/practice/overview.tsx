import React, { useEffect, useState } from "react";
import { View, Modal, Pressable } from "react-native";
import { Text } from "@/components/text";
import { Practice } from "@/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Ionicons } from "@expo/vector-icons";
import { StartActivityBanner } from "../start-activity";
import { formatDuration } from "@/utils/format";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { usePractices } from "@/hooks/practice/usePractices";
import { THEME_COLORS } from "@/utils/theme";
import { usePracticeStats } from "@/hooks/practice/usePracticeStats";
import ConfettiCannon from "react-native-confetti-cannon";
import { Button } from "../button";
import { PracticeCard } from "./card";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface Props {
  className?: string;
}

export function PracticeOverview(props: Props) {
  const { data: practices, refetch: refetchPractices } = usePractices();
  const { data: stats } = usePracticeStats();
  const { practice } = useLocalSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (practice === "true" && practices?.length === 1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [practice, practices]);

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
            No sessions found
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      {showConfetti && (
        <>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showConfetti}
            onRequestClose={() => setShowConfetti(false)}
          >
            <Pressable
              className="flex-1 justify-center items-center"
              onPress={() => setShowConfetti(false)}
            >
              <View className="absolute top-0 left-0 right-0 bottom-0 bg-[#000] opacity-60" />

              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <ConfettiCannon
                  count={100}
                  origin={{ x: 0, y: 0 }}
                  autoStart={true}
                  fadeOut={true}
                />
              </View>

              <Pressable onPress={(e) => e.stopPropagation()}>
                <View className="bg-base-200 rounded-lg p-6 w-full max-w-sm">
                  <Text className="text-xl font-bold mb-4">
                    Congratulations 🎉
                  </Text>

                  <Text className="text-base mb-6">
                    You've completed your first practice session. Keep up the
                    great work!
                  </Text>

                  <Button
                    onPress={() => {
                      setShowConfetti(false);
                      router.setParams({ practice: undefined });
                    }}
                    text="Continue"
                  />
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </>
      )}

      <View className={className}>
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

        <View className="bg-base-200 rounded-xl p-4 mb-4 gap-2">
          <View className="flex-row items-baseline pt-2">
          <Text className="text-xl font-bold text-base-content">
              Latest activity
          </Text>
          </View>
          <Text className="text-muted">Current streak</Text>

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
          return <PracticeCard item={practice} key={practice.id} />;
        })}
      </View>
    </>
  );
}
