import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",

  APP_ID: "music-journal",
  APP_NAME: "Music Journal",
  APP_DOMAIN: "musicjournal.fm",

  API_KEYS: process.env.API_KEYS?.split(",") || [],
  SESSION_SECRET:
    process.env.SESSION_SECRET ||
    "default-test-session-secret-for-iron-session",

  DB_CONNECTIONSTRING: process.env.DB_CONNECTIONSTRING,

  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_FROM: process.env.SMTP_FROM,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
};
