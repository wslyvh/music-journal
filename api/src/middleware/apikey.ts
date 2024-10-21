import { Request, Response, NextFunction } from "express";
import { CONFIG } from "@/utils/config";

function isAuthorized(req: Request) {
  const apiKey = req.query.apiKey;
  if (!apiKey || typeof apiKey !== "string") {
    return false;
  }

  return CONFIG.API_KEYS.includes(apiKey);
}

export function apikeyHandler(req: Request, res: Response, next: NextFunction) {
  if (isAuthorized(req)) {
    next();
  } else {
    res.status(401).send({ status: 401, message: "Unauthorized" });
  }
}
