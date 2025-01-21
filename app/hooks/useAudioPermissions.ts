import { useQuery } from "@tanstack/react-query";
import { Audio } from "expo-av";
import { Linking, Platform } from "react-native";
import { Alert } from "react-native";

async function checkPermissions() {
  try {
    const { status } = await Audio.getPermissionsAsync();
    console.log("Audio Permissions Status:", status);
    if (status === "granted") return true;

    const res = await Audio.requestPermissionsAsync();
    if (res.granted) return true;

    if (Platform.OS === "web") {
      window.alert(
        "Please enable microphone access in your browser settings to record audio."
      );
    } else {
      Alert.alert(
        "Microphone Access Required",
        "Please enable microphone access in your device settings to record audio.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
    }

    return false;
  } catch (error) {
    console.error("Error checking audio permissions:", error);
    return false;
  }
}

export function useAudioPermissions() {
  return useQuery({
    queryKey: ["permissions", "audio"],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    queryFn: checkPermissions,
  });
}
