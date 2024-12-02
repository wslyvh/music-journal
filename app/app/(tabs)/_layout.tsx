import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { THEME_COLORS } from "@/utils/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: THEME_COLORS["primary"],
        tabBarStyle: {
          backgroundColor: THEME_COLORS["base-300"],
          borderTopWidth: 0,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="start"
        options={{
          title: "Start",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "play" : "play-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/profile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings/delete"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="practice/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
