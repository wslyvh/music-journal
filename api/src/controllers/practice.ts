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
import { uploadHandler } from "@/middleware/upload";
import { getFromStorage, uploadToStorage } from "@/clients/storage";
import crypto from "crypto";

const data = [
  body("type").isString().trim(),
  body("duration").isNumeric().trim(),
  body("data").optional().isNumeric().trim(),
  body("notes").optional().isString().trim(),
  body("rating").optional().isNumeric().trim().isLength({ min: 0, max: 5 }),
  body("visibility").optional().isNumeric().trim().isLength({ min: 0, max: 5 }),
];

export const practiceRouter = Router();
practiceRouter.post(
  `/practice`,
  authHandler,
  uploadHandler("recording"),
  CreatePractice
);
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
  const id = crypto.randomUUID();
  let recordingKey = null;

  if (req.file) {
    const fileName = `${userId}/${id}`;
    recordingKey = await uploadToStorage(
      req.file.buffer,
      fileName,
      req.file.mimetype
    );

    data.recordingKey = recordingKey;
  }

  const practice = await createPractice(id, userId, data);
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

  const fileName = `${userId}/${id}`;
  const recordingUrl = await getFromStorage(fileName);
  const practice = await getPractice(userId, id);

  if (!practice) {
    res.status(404).send({ message: "Practice not found." });
    return;
  }

  res.status(200).send({
    data: {
      ...practice,
      recordingUrl,
    },
  });
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
