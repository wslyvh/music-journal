import dotenv from "dotenv";
dotenv.config();

export const DEFAULTS = {
  PAGE_SIZE: 20,
};

export const CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",

  APP_ID: "music-journal",
  APP_NAME: "Music Journal",
  APP_DOMAIN: "musicjournal.fm",

  API_KEYS: process.env.API_KEYS?.split(",") || [],
  JWT_SECRET: process.env.JWT_SECRET || "default-test-secret",
  JWT_EXPIRATION: Number(process.env.JWT_EXPIRATION) || 24 * 60 * 60 * 365, // 1 year

  DB_CONNECTIONSTRING: process.env.DB_CONNECTIONSTRING,

  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_FROM: process.env.SMTP_FROM,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,

  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
  R2_ENDPOINT: process.env.R2_ENDPOINT ?? "",
};
