import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name:
    process.env.APP_ENVIRONMENT === "development" ? "MJ Dev" : "Music Journal",
  description:
    "Transform your music practice with Music Journal, the app that helps you record, reflect, and improve.",
  slug: "music-journal-app",
  version: "0.1.0",
  githubUrl: "https://github.com/wslyvh/music-journal",
  owner: "wslyvh",
  userInterfaceStyle: "automatic",
  icon: "./assets/images/icon.png",
  scheme: "music-journal",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ff5533",
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
      UIBackgroundModes: ["audio", "remote-notification"],
    },
    bundleIdentifier: "wslyvh.musicjournal.fm",
  },
  android: {
    package:
      process.env.APP_ENVIRONMENT === "development"
        ? "wslyvh.musicjournal.dev"
        : "wslyvh.musicjournal.fm",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ff5533",
    },
    permissions: ["WAKE_LOCK", "SCHEDULE_EXACT_ALARM", "POST_NOTIFICATIONS"],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  notification: {
    icon: "./assets/images/notification.png",
    color: "#ff5533",
  },
  plugins: ["expo-router", "expo-notifications"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    SEED_PROFILE: process.env.SEED_PROFILE ?? false,
    SUPABASE_URL: process.env.SUPABASE_URL ?? "",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? "",
    router: {
      origin: false,
    },
    eas: {
      projectId: "08fd2b10-f6bb-40fc-98ec-18fe1fbb61d0",
    },
  },
};

export default config;
