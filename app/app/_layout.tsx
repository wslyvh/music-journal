import { Stack } from "expo-router";
import { View, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DataProvider from "@/context/data";
import RecordingProvider from "@/context/recording";
import { useRouter, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { THEME_COLORS } from "@/utils/theme";
import "@/assets/global.css";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const pages = [
    "index",
    "start",
    "leaderboard",
    "login",
    "settings",
    "settings/profile",
    "settings/delete",
    "practice/[id]",
    "+not-found",
  ];

  const tabs = [
    {
      name: "index",
      title: "Home",
      icon: (focused: boolean) => (focused ? "home-sharp" : "home-outline"),
    },
    {
      name: "start",
      title: "Start",
      icon: (focused: boolean) => (focused ? "play" : "play-outline"),
    },
    {
      name: "leaderboard",
      title: "Leaderboard",
      icon: (focused: boolean) =>
        focused ? "stats-chart" : "stats-chart-outline",
    },
    {
      name: "settings",
      title: "Settings",
      icon: (focused: boolean) => (focused ? "settings" : "settings-outline"),
    },
  ];

  return (
    <DataProvider>
      <RecordingProvider>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View className="flex-1 items-center bg-base-100 pt-8">
          <View className="flex-1 w-full max-w-4xl">
            <Stack>
              {pages.map((page) => (
                <Stack.Screen
                  key={page}
                  name={page}
                  options={{ headerShown: false }}
                />
              ))}
            </Stack>

            {/* Bottom Gradient */}
            <View
              className="fixed bottom-0 inset-x-0 w-screen"
              style={{
                height: 120,
                overflow: "hidden",
              }}
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)"]}
                className="absolute inset-0"
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}
              />
            </View>

            {/* Floating Tab Bar */}
            <View className="absolute bottom-4 left-2 right-2">
              <View
                className="flex-row rounded-full h-[60px] items-center justify-around mx-2 bg-base-300"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                {tabs.map((tab) => {
                  const focused =
                    pathname === `/${tab.name}` ||
                    (tab.name === "index" && pathname === "/");

                  return (
                    <TouchableOpacity
                      key={tab.name}
                      className="flex-1 h-full items-center justify-center"
                      onPress={() =>
                        router.replace(
                          (tab.name === "index" ? "/" : `/${tab.name}`) as any
                        )
                      }
                    >
                      <Ionicons
                        name={tab.icon(focused)}
                        color={
                          focused
                            ? THEME_COLORS["primary"]
                            : THEME_COLORS["muted"]
                        }
                        size={24}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </RecordingProvider>
    </DataProvider>
  );
}
