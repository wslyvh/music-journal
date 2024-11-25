import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import { logHandler } from "@/middleware/log";
import { errorHandler } from "@/middleware/error";
import { notFoundHandler } from "@/middleware/notfound";
import { csrfProtectionHandler, csrfTokenHandler } from "@/middleware/csrf";
import { router } from "@/routes";

const app = express();

// configure express app
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logHandler);

// Apply CSRF middleware
// app.use(csrfTokenHandler);
// app.use(csrfProtectionHandler);

// add routes
app.use(router);

// add route middleware handlers after routes
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
