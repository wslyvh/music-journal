import { Platform } from "react-native";

const DEV_API_URL =
  Platform.OS === "android"
    ? "http://192.168.1.20:4000" // Android Studio Emulator // 10.0.2.2
    : // Localhost 192.168.1.20
      "http://localhost:4000"; // iOS & Web
const PROD_API_URL = "https://api.musicjournal.fm";

export const CONFIG = {
  API_URL: PROD_API_URL,

  APP_EMOJI: "🎵",
  APP_ID: "music-journal",
  APP_NAME: "Music Journal",
  APP_DESCRIPTION:
    "Music Journal helps helps you transform your music practice. Record, reflect and improve!",
  APP_CONTACT: "support@musicjournal.fm",
  APP_URL: "https://app.musicjournal.fm",
  WEBSITE_URL: "https://www.musicjournal.fm",

  SOCIAL_TWITTER: "wslyvh",
  SOCIAL_GITHUB: "wslyvh/music-journal",
};

export const INSTRUMENTS = [
  "Bass",
  "Cello",
  "Clarinet",
  "Drums",
  "Flute",
  "Guitar",
  "Harmonica",
  "Keyboard",
  "Oboe",
  "Percussion",
  "Piano",
  "Saxophone",
  "Trombone",
  "Trumpet",
  "Tuba",
  "Ukulele",
  "Violin",
  "Voice",
  "Vocals",
  "Other",
];
