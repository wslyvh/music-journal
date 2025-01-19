import { useQuery } from "@tanstack/react-query";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
} from "expo-notifications";

async function checkPermissions() {
  try {
    console.log("Checking notification permissions");
    const { status } = await getPermissionsAsync();
    console.log("Notification Permissions Status:", status);
    if (status === "granted") return true;

    const res = await requestPermissionsAsync();
    if (res.granted) return true;

    return false;
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
