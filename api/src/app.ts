import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import createMemoryStore from "memorystore";
import session, { SessionOptions } from "express-session";
import { logHandler } from "@/middleware/log";
import { errorHandler } from "@/middleware/error";
import { notFoundHandler } from "@/middleware/notfound";
import { csrfProtectionHandler, csrfTokenHandler } from "@/middleware/csrf";
import { router } from "@/routes";
import { CONFIG } from "@/utils/config";

dotenv.config();

const app = express();

// configure express app
app.use(cors());
app.use(helmet());
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(logHandler);

const store = createMemoryStore(session);
const sessionConfig: SessionOptions = {
  name: CONFIG.API_ID,
  secret: CONFIG.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new store({
    checkPeriod: 86400000,
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
