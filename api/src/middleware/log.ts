import { Request, Response, NextFunction } from "express";

const excludePaths = ["/static"];

export function logHandler(req: Request, res: Response, next: NextFunction) {
  if (!excludePaths.some((path) => req.path.startsWith(path))) {
    console.log(`[${req.method}] ${req.path}`);
  }

  next();
}
