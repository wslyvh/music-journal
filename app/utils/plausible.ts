import {
  applicationName,
  getAndroidId,
  getIosIdForVendorAsync,
  nativeApplicationVersion,
} from "expo-application";
import { osVersion, modelName } from "expo-device";
import { Platform } from "react-native";
import { CONFIG } from "./config";

const plausibleEventName = {
  pageview: "pageview",
} as const;

type EventName = keyof typeof plausibleEventName;

const getDeviceId = async () => {
  if (Platform.OS === "android") {
    return getAndroidId();
  }
  if (Platform.OS === "ios") {
    return getIosIdForVendorAsync();
  }
  return "web-user";
};

export const trackEvent = (eventName: EventName, pathname: string = "/") => {
  getDeviceId().then((deviceId) => {
    const appName = applicationName ?? CONFIG.APP_NAME;
    const appVersion = nativeApplicationVersion ?? "1.0.0";
    const osName = Platform.OS;
    const userAgent = `${appName}/${appVersion} (${osName} ${
      osVersion ?? "unknown"
    }; ${modelName ?? "browser"})`;

    fetch(`https://plausible.io/api/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": userAgent,
      },
      body: JSON.stringify({
        name: plausibleEventName[eventName],
        url: CONFIG.APP_URL + pathname,
        domain: CONFIG.APP_DOMAIN,
        props: {
          deviceId,
          pathname,
          platform: Platform.OS,
        },
      }),
    }).catch((error) => {
      console.error("Analytics error:", error);
    });
  });
};
