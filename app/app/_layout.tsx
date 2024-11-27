import { Stack } from "expo-router";
import DataProvider from "@/context/data";
import RecordingProvider from "@/context/recording";
import "@/assets/global.css";

export default function RootLayout() {
  return (
    <DataProvider>
      <RecordingProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </RecordingProvider>
    </DataProvider>
  );
}
