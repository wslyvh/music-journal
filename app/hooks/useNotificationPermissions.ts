import { setDailyReminder } from "@/utils/notifications";
import { useQuery } from "@tanstack/react-query";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
} from "expo-notifications";

async function checkPermissions() {
  try {
    console.log("Checking notification permissions");
    let granted = false;
    const { status } = await getPermissionsAsync();

    console.log("Notification Permissions Status:", status);
    if (status === "granted") granted = true;

    if (!granted) {
      console.log("Requesting notification permissions");
      const res = await requestPermissionsAsync();
      console.log("Notification Permissions Response:", res);
      if (res.granted) {
        granted = true;
      }
    }

    if (granted) {
      await setDailyReminder();
    }

    return granted;
  } catch (error) {
    console.error("Error checking notification permissions:", error);
    return false;
  }
}

export function useNotificationPermissions() {
  return useQuery({
    queryKey: ["permissions", "notification"],
    queryFn: checkPermissions,
  });
}
