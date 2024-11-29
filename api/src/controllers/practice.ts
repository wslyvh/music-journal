import { authHandler } from "@/middleware/auth";
import { Request, Response, Router } from "express";
import { validate } from "@/middleware/validate";
import { body } from "express-validator";
import {
  createPractice,
  deletePractice,
  getPractice,
  getPracticesByAccountId,
  updatePractice,
} from "@/clients/practice";
import { DEFAULTS } from "@/utils/config";

const data = [
  body("type").isString().trim(),
  body("duration").isNumeric().trim(),
  body("data").optional().isNumeric().trim(),
  body("notes").optional().isString().trim(),
  body("rating").optional().isNumeric().trim().isLength({ min: 0, max: 5 }),
  body("visibility").optional().isNumeric().trim().isLength({ min: 0, max: 5 }),
];

export const practiceRouter = Router();
practiceRouter.post(`/practice`, authHandler, validate(data), CreatePractice);
practiceRouter.get(`/practice`, authHandler, GetPractices);
practiceRouter.get(`/practice/:id`, authHandler, GetPractice);
practiceRouter.put(
  `/practice/:id`,
  authHandler,
  validate(data),
  UpdatePractice
);
practiceRouter.delete(`/practice/:id`, authHandler, DeletePractice);

async function CreatePractice(req: Request, res: Response) {
  const userId = req.user.id;
  const data = req.body;

  const practice = await createPractice(userId, data);
  if (!practice) {
    res.status(500).send({ message: "Unable to create practice." });
    return;
  }

  res.status(200).send({ data: practice });
}

async function GetPractices(req: Request, res: Response) {
  const userId = req.user.id;
  const instrument = (req.query.instrument as string) ?? "";
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const size = req.query.size
    ? parseInt(req.query.size as string)
    : DEFAULTS.PAGE_SIZE;

  const practices = await getPracticesByAccountId(
    userId,
    instrument,
    page,
    size
  );
  res.status(200).send({ data: practices });
}

async function GetPractice(req: Request, res: Response) {
  const userId = req.user.id;
  const id = req.params.id;

  const practice = await getPractice(userId, id);
  res.status(200).send({ data: practice });
}

async function UpdatePractice(req: Request, res: Response) {
  const userId = req.user.id;
  const id = req.params.id;
  const data = req.body;

  const practice = await updatePractice(userId, id, data);
  if (!practice) {
    res.status(500).send({ message: "Unable to update practice." });
    return;
  }

  res.status(200).send({ data: practice });
}

async function DeletePractice(req: Request, res: Response) {
  const userId = req.user.id;
  const id = req.params.id;

  const success = await deletePractice(userId, id);
  if (!success) {
    res.status(500).send({ message: "Unable to delete practice." });
    return;
  }

  res.status(204).send();
}
