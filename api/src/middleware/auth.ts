import { Request, Response, NextFunction } from "express";
import "express-session";

export function authHandler(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
