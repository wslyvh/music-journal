import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import pgSession from "connect-pg-simple";
import session, { SessionOptions } from "express-session";
import { logHandler } from "@/middleware/log";
import { errorHandler } from "@/middleware/error";
import { notFoundHandler } from "@/middleware/notfound";
import { csrfProtectionHandler, csrfTokenHandler } from "@/middleware/csrf";
import { router } from "@/routes";
import { CONFIG } from "@/utils/config";
import { getDbPool } from "./clients/db";

dotenv.config();

const app = express();

// configure express app
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(logHandler);

const pgSessionStore = pgSession(session);
const sessionConfig: SessionOptions = {
  name: CONFIG.APP_ID,
  secret: CONFIG.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  },
  resave: false,
  saveUninitialized: true,
  store: new pgSessionStore({
    pool: getDbPool(),
    tableName: "sessions",
  }),
};

if (CONFIG.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sessionConfig.cookie = { ...sessionConfig.cookie, secure: true };
}
app.use(session(sessionConfig));

// Apply CSRF middleware
// app.use(csrfTokenHandler);
// app.use(csrfProtectionHandler);

// add routes
app.use(router);

// add route middleware handlers after routes
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
