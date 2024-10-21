import { Request, Response, NextFunction } from "express";
import Tokens from "csrf";

const tokens = new Tokens();

export function csrfProtectionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    next();
  }

  const clientToken = req.headers["x-csrf-token"] as string;
  const serverToken = req.cookies["csrf-token"];

  if (!tokens.verify(serverToken, clientToken)) {
    res.status(403).json({ error: "Invalid CSRF token" });
    return;
  }

  next();
}

export function csrfTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.cookies["csrf-token"]) {
    const secret = tokens.secretSync();
    const token = tokens.create(secret);
    res.cookie("csrf-token", secret, { httpOnly: true, sameSite: "strict" });
    res.locals.csrfToken = token;
  } else {
    res.locals.csrfToken = tokens.create(req.cookies["csrf-token"]);
  }

  next();
}
