import { Request, Response } from "express";

export function errorHandler(error: Error, req: Request, res: Response) {
  console.error("[500]", error.message, error.stack);

  res.status(500).send({
    status: 500,
    message: "Unexpected Error",
  });
}
