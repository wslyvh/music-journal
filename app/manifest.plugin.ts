import { ExpoConfig } from "expo/config";
import { withAndroidManifest, AndroidConfig } from "@expo/config-plugins";

export function withForegroundService(config: ExpoConfig) {
  return withAndroidManifest(config, async (config) => {
    const manifest = config.modResults;

    if (!manifest.manifest.$["xmlns:tools"]) {
      manifest.manifest.$["xmlns:tools"] = "http://schemas.android.com/tools";
    }

    const mainApplication =
      AndroidConfig.Manifest.getMainApplicationOrThrow(manifest);

    mainApplication["service"] = mainApplication["service"] || [];
    mainApplication["service"].push({
      $: {
        "android:name": "app.notifee.core.ForegroundService",
        "android:foregroundServiceType": "microphone",
        // @ts-ignore
        "tools:replace": "android:foregroundServiceType",
      },
    });

    return config;
  });
}
