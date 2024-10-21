import { accountRouter } from "@/controllers/account";
import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("OK 200");
});

router.use(accountRouter);
