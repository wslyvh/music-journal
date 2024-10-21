import { Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  console.log("[404]", req.path, "not found");

  res.status(404).send({
    status: 404,
    message: "Not Found",
  });
}
