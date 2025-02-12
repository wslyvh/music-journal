import React, { useEffect, useState } from "react";
import { View, Modal, Pressable } from "react-native";
import { Text } from "@/components/text";
import { Practice } from "@/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { StartActivityBanner } from "../start-activity";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { usePractices } from "@/hooks/practice/usePractices";
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
    if (practice === "1") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [practice]);

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
        <View className="bg-base-200 rounded-xl p-4 mb-4 gap-2">
          <View className="flex-row items-baseline pt-2">
            <Text className="text-xl font-bold text-base-content">
              Latest activity
            </Text>
          </View>
          <Text className="text-muted">Current streak</Text>

          <View className="flex flex-row mt-4">
            {[6, 5, 4, 3, 2, 1, 0].map((i) => {
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
                  <View className="w-full justify-end">
                    <View
                      className={`w-8 h-8 rounded-full mx-auto ${
                        count.length > 0 ? "bg-primary" : "bg-neutral"
                      }`}
                    />
                  </View>
                  <Text className="text-xs text-muted mt-2">
                    {practiceDay.format("ddd")}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {!practices?.length && (
          <View className="flex flex-col items-center justify-center mt-4">
            <Text className="text-muted italic mt-4">
              No sessions recorded yet
            </Text>
          </View>
        )}

        {practices
          ?.filter((practice: Practice) => {
            const practiceDate = dayjs(practice.timestamp);
            const sevenDaysAgo = dayjs().subtract(7, "days");
            return practiceDate.isAfter(sevenDaysAgo);
          })
          .map((practice: Practice) => {
            return <PracticeCard item={practice} key={practice.id} />;
          })}

        {practices?.length && (
          <Link
            href="/practices"
            className="my-4 flex flex-row justify-end w-full text-right"
          >
            <Text className="text-primary">View all sessions &rarr;</Text>
          </Link>
        )}
      </View>
    </>
  );
}
