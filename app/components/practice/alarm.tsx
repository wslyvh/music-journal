import { View, TouchableOpacity, Vibration } from "react-native";
import { Text } from "@/components/text";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/button";
import {
  scheduleNotificationAsync,
  cancelScheduledNotificationAsync,
  getAllScheduledNotificationsAsync,
  SchedulableTriggerInputTypes,
} from "expo-notifications";
import { THEME_COLORS } from "@/utils/theme";

const MIN_DURATION = 5;
const MAX_DURATION = 60;
const STEP = 5;

interface Timer {
  id: string;
  endTime: number;
  remaining: number;
}

export function PracticeAlarm() {
  const [loading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [activeTimer, setActiveTimer] = useState<Timer | undefined>();

  // clear expired timers
  useEffect(() => {
    async function clearTimers() {
      const notifications = await getAllScheduledNotificationsAsync();
      const expiredTimers = notifications.filter((i) =>
        dayjs(i.content.data?.endTime).isBefore(dayjs())
      );

      if (expiredTimers.length > 0) {
        console.log("Clear expired timers", expiredTimers.length);
        Promise.all(
          expiredTimers.map((i) =>
            cancelScheduledNotificationAsync(i.identifier)
          )
        );
      }
    }

    clearTimers();
  }, []);

  // load active timer from notifications
  useEffect(() => {
    const loadTimer = async () => {
      const notifications = await getAllScheduledNotificationsAsync();
      const timer = notifications
        .filter((n) => n.content.data?.channelId === "practice-timer")
        .map((n) => {
          const endTime = dayjs(n.content.data?.endTime);
          return {
            id: n.content.data?.id as string,
            endTime: endTime.valueOf(),
            remaining: dayjs(endTime).diff(dayjs(), "second"),
          };
        })
        .find((t) => t.remaining > 0);

      setActiveTimer(timer);
      setLoading(false);
    };

    loadTimer();
  }, []);

  // update remaining time
  useEffect(() => {
    if (!activeTimer) return;

    const interval = setInterval(() => {
      const remaining = dayjs(activeTimer.endTime).diff(dayjs(), "second");

      if (remaining <= 0) {
        Vibration.vibrate([0, 300, 100, 300]);
        setActiveTimer(undefined);
        clearInterval(interval);
      } else {
        setActiveTimer((current) =>
          current ? { ...current, remaining } : undefined
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer]);

  function adjustDuration(amount: number) {
    setSelectedDuration((current) => {
      const newValue = current + amount;
      return Math.min(Math.max(newValue, MIN_DURATION), MAX_DURATION);
    });
  }

  async function startTimer() {
    try {
      const endTime = dayjs().add(selectedDuration, "minutes").toDate();
      const id = Date.now().toString();

      await scheduleNotificationAsync({
        content: {
          title: "Practice time's up! ⏰",
          body: `Your ${selectedDuration} minute practice timer is complete.`,
          sound: true,
          vibrate: [0, 300, 100, 300],
          priority: "high",
          interruptionLevel: "critical",
          data: {
            id,
            channelId: "practice-timer",
            startTime: dayjs().valueOf(),
            endTime: dayjs(endTime).valueOf(),
            duration: selectedDuration,
          },
        },
        trigger: {
          type: SchedulableTriggerInputTypes.DATE,
          date: endTime,
        },
      });

      setActiveTimer({
        id,
        endTime: dayjs(endTime).valueOf(),
        remaining: selectedDuration * 60,
      });
    } catch (error) {
      console.error("Failed to schedule timer:", error);
    }
  }

  async function clearTimer() {
    if (!activeTimer) return;

    try {
      const notifications = await getAllScheduledNotificationsAsync();
      const notification = notifications.find(
        (n) => n.content.data?.id === activeTimer.id
      );

      if (notification) {
        await cancelScheduledNotificationAsync(notification.identifier);
      }

      setActiveTimer(undefined);
    } catch (error) {
      console.error("Failed to cancel timer:", error);
    }
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  if (loading) return null;

  return (
    <View className="flex flex-col items-center gap-8">
      <Text className="text-lg font-bold">Practice Timer</Text>

      <View className="flex flex-row items-center gap-8">
        {!activeTimer && (
          <TouchableOpacity
            onPress={() => adjustDuration(-STEP)}
            disabled={!!activeTimer}
          >
            <Ionicons
              name="remove-circle"
              size={32}
              color={THEME_COLORS["base-content"]}
            />
          </TouchableOpacity>
        )}

        <View className="w-40 h-40 rounded-full border-4 border-base-300 items-center justify-center">
          <Text className="text-2xl font-bold text-base-content">
            {activeTimer
              ? formatTime(activeTimer.remaining)
              : `${selectedDuration}m`}
          </Text>
        </View>

        {!activeTimer && (
          <TouchableOpacity
            onPress={() => adjustDuration(STEP)}
            disabled={!!activeTimer}
          >
            <Ionicons
              name="add-circle"
              size={32}
              color={THEME_COLORS["base-content"]}
            />
          </TouchableOpacity>
        )}
      </View>

      <Button
        className="w-full"
        onPress={activeTimer ? clearTimer : startTimer}
        text={activeTimer ? "Cancel timer" : "Start timer"}
        type={activeTimer ? "neutral" : "primary"}
      />
    </View>
  );
}
