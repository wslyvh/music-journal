import { Stack } from "expo-router";
import {
  View,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DataProvider from "@/context/data";
import RecordingProvider from "@/context/recording";
import { useRouter, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { THEME_COLORS } from "@/utils/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import notifee from "@notifee/react-native";
import "@/assets/global.css";

notifee.registerForegroundService(() => {
  console.log("Registering foreground service");
  return new Promise(() => {
    console.log("Foreground service started");
  });
});

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  const pages = [
    "index",
    "start",
    "leaderboard",
    "onboarding",
    "login",
    "settings",
    "settings/profile",
    "settings/delete",
    "practice/[id]",
    "+not-found",
  ];

  const fullscreen = ["onboarding", "+not-found"];
  const showTabs = !fullscreen.some((route) => pathname === `/${route}`);

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
    // {
    //   name: "leaderboard",
    //   title: "Leaderboard",
    //   icon: (focused: boolean) =>
    //     focused ? "stats-chart" : "stats-chart-outline",
    // },
    {
      name: "settings",
      title: "Settings",
      icon: (focused: boolean) => (focused ? "settings" : "settings-outline"),
    },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <DataProvider>
          <RecordingProvider>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <View className="flex-1 items-center bg-base-100 pt-8">
              <View className="flex-1 w-full">
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
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: width,
                    height: 80,
                    overflow: "hidden",
                  }}
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0,0,0,0.4)",
                      "rgba(0,0,0,1.0)",
                    ]}
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
                {showTabs && (
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
                            onPress={() => {
                              const targetPath =
                                tab.name === "index" ? "/" : `/${tab.name}`;
                              if (pathname !== targetPath) {
                                router.replace(targetPath as any);
                              }
                            }}
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
                )}
              </View>
            </View>
          </RecordingProvider>
        </DataProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
