import { accountRouter } from "@/controllers/account";
import { practiceRouter } from "./controllers/practice";
import { leaderboardRouter } from "./controllers/leaderboard";
import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("OK 200");
});

router.use(accountRouter);
router.use(practiceRouter);
router.use(leaderboardRouter);
