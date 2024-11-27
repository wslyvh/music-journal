import { Request, Response, Router } from "express";
import { getLeaderboard } from "@/clients/practice";
import { DEFAULTS } from "@/utils/config";

export const leaderboardRouter = Router();
leaderboardRouter.get(`/leaderboard/:id`, GetLeaderboard);

async function GetLeaderboard(req: Request, res: Response) {
  const instrument = req.params.id;
  const period = req.query.period ? parseInt(req.query.period as string) : 7;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const size = req.query.size
    ? parseInt(req.query.size as string)
    : DEFAULTS.PAGE_SIZE;

  const practices = await getLeaderboard(instrument, period, page, size);
  res.status(200).send({ data: practices });
}
