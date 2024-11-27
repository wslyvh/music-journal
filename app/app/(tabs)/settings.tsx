import { AccountBanner } from "@/components/account/banner";
import { ScreenLayout } from "@/components/screen-layout";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import { CONFIG } from "@/utils/config";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const { account, logoutMutation } = useAuth();

  const appItems = [
    {
      title: "Manage Profile",
      icon: "person",
      action: () => router.push("/settings"),
    },
    {
      title: "Delete Account",
      icon: "trash",
      action: () => router.push("/settings"),
    },
    {
      title: "Sign Out",
      icon: "exit-outline",
      action: () => logoutMutation.mutate(),
    },
  ];

  const navigationItems = [
    // {
    //   title: "Rate App",
    //   href: `${CONFIG.APP_URL}/rate`,
    // },
    { title: "Website", href: `${CONFIG.APP_URL}` },
    { title: "Support & Feedback", href: `mailto:${CONFIG.APP_CONTACT}` },
    { title: "Terms of Service", href: `${CONFIG.APP_URL}/terms` },
    { title: "Privacy Policy", href: `${CONFIG.APP_URL}/privacy` },
  ];

  return (
    <ScreenLayout title="Settings">
      <AccountBanner />

      {account && (
        <View className="flex gap-2 mt-8">
          <Text className="text-xl font-bold text-base-content">Settings</Text>
          {appItems.map((item, index) => (
            <TouchableOpacity
              key={`app-${index}`}
              onPress={item.action}
              className="flex-row items-center p-4 border-b border-base-300"
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                className="text-base-content"
              />
              <Text className="text-base-content ml-4">{item.title}</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                className="text-base-content ml-auto"
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

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
