import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt";

export async function authHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyToken(token);

  if (!payload) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  req.user = {
    id: payload.sub,
    appId: payload.aud || "",
    ...payload,
  };

  next();
}
