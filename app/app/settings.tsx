import { AccountBanner } from "@/components/account/banner";
import { ScreenLayout } from "@/components/screen-layout";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import { CONFIG } from "@/utils/config";
import { THEME_COLORS } from "@/utils/theme";
import { checkPermissions } from "@/hooks/useNotificationPermissions";
import {
  cancelDailyReminder,
  isDailyReminderEnabled,
} from "@/utils/notifications";
import { useState, useEffect } from "react";

export default function Settings() {
  const [dailyReminders, setDailyReminders] = useState(false);

  useEffect(() => {
    async function checkDailyReminder() {
      const enabled = await isDailyReminderEnabled();
      setDailyReminders(enabled);
    }

    checkDailyReminder();
  }, []);

  async function toggleNotifications(value: boolean) {
    if (value) {
      await checkPermissions();
      setDailyReminders(true);
    } else {
      await cancelDailyReminder();
      setDailyReminders(false);
    }
  }

  const appItems = [
    {
      title: "Manage Profile",
      icon: "person",
      action: () => router.push("/settings/profile"),
    },
    {
      title: "Delete Data",
      icon: "trash",
      action: () => router.push("/settings/delete"),
    },
  ];

  const navigationItems = [
    // {
    //   title: "Rate App",
    //   href: `${CONFIG.APP_URL}/rate`,
    // },
    { title: "Website", href: `${CONFIG.WEBSITE_URL}` },
    { title: "Support & Feedback", href: `mailto:${CONFIG.APP_CONTACT}` },
    { title: "Terms of Service", href: `${CONFIG.WEBSITE_URL}/terms` },
    { title: "Privacy Policy", href: `${CONFIG.WEBSITE_URL}/privacy` },
  ];

  return (
    <ScreenLayout title="Settings">
      <AccountBanner />

      <View className="flex gap-2 mt-8">
        <Text className="text-xl font-bold text-base-content">Profile</Text>
        {appItems.map((item, index) => (
          <TouchableOpacity
            key={`app-${index}`}
            onPress={item.action}
            className="flex-row items-center p-4 border-b border-base-300"
          >
            <Ionicons
              name={item.icon as any}
              size={21}
              color={THEME_COLORS["base-content"]}
              className="text-base-content"
            />
            <Text className="text-base-content ml-4">{item.title}</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={THEME_COLORS["base-content"]}
              className="text-base-content ml-auto"
            />
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex gap-2 mt-8">
        <Text className="text-xl font-bold text-base-content">
          Notifications
        </Text>
        <View className="flex-row items-center py-4 border-b border-base-300">
          <Text className="text-base-content">Daily Reminder</Text>
          <Switch
            value={dailyReminders}
            onValueChange={toggleNotifications}
            className="ml-auto"
            thumbColor={
              dailyReminders
                ? THEME_COLORS["primary"]
                : THEME_COLORS["base-content"]
            }
            trackColor={{
              false: THEME_COLORS["base-300"],
              true: THEME_COLORS["base-300"],
            }}
          />
        </View>
      </View>

      <View className="flex gap-2 my-8">
        <Text className="text-xl font-bold text-base-content">Application</Text>

        <View className="flex-row items-center py-4 border-b border-base-300">
          <Text className="text-base-content">App version</Text>
          <Text className="text-base-content ml-auto mr-4">
            {Constants.expoVersion ?? "pre-release"}
          </Text>
        </View>
        {navigationItems.map((item, index) => (
          <Link href={item.href as any} key={index} target="_blank" asChild>
            <TouchableOpacity className="flex-row items-center py-4 border-b border-base-300">
              <Text className="text-base-content">{item.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScreenLayout>
  );
}
