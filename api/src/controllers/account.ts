import {
  createAccount,
  createVerificationToken,
  deleteAccount,
  getAccount,
  getAccountByEmail,
  updateAccount,
  verifyVerificationToken,
} from "@/clients/account";
import { sendVerificationToken } from "@/clients/smtp";
import { authHandler } from "@/middleware/auth";
import { Request, Response, Router } from "express";
import { validate } from "@/middleware/validate";
import { body } from "express-validator";
import { generateToken } from "@/utils/jwt";
import { CONFIG } from "@/utils/config";
import dayjs from "dayjs";

const tokenValidation = [body("identifier").isEmail().normalizeEmail()];
const loginValidation = [
  body("identifier").isEmail().normalizeEmail(),
  body("token").isNumeric().trim().isLength({ min: 6, max: 6 }),
  body("appId").optional().isString().trim(),
];

export const accountRouter = Router();
accountRouter.get(`/account`, authHandler, GetAccount);
accountRouter.put(`/account`, authHandler, UpdateAccount);
accountRouter.delete(`/account`, authHandler, DeleteAccount);
accountRouter.post(`/account/token`, validate(tokenValidation), Token);
accountRouter.post(`/account/login`, validate(loginValidation), Login);
accountRouter.post(`/account/logout`, authHandler, Logout);

async function GetAccount(req: Request, res: Response) {
  const userId = req.user.id;

  const account = await getAccount(userId);
  if (!account) {
    res.status(404).send({ message: "Account not found." });
    return;
  }

  res.status(200).send({ data: account });
}

async function UpdateAccount(req: Request, res: Response) {
  const userId = req.user.id;
  const data = req.body; // TODO: validate

  const account = await updateAccount(userId, data);
  if (!account) {
    res.status(500).send({ message: "Unable to update account." });
    return;
  }

  res.status(200).send({ data: account });
}

async function DeleteAccount(req: Request, res: Response) {
  const userId = req.user.id;

  const success = await deleteAccount(userId);
  if (!success) {
    res.status(500).send({ message: "Unable to delete account." });
    return;
  }

  res.status(204).send();
}

async function Token(req: Request, res: Response) {
  const { identifier } = req.body;

  const data = await createVerificationToken(identifier);
  if (!data) {
    res.status(500).send({ message: "Unable to create verification token." });
    return;
  }

  await sendVerificationToken(identifier, data.token);

  res.status(204).send();
}

async function Login(req: Request, res: Response) {
  const { identifier, token, appId } = req.body;

  const data = await verifyVerificationToken(identifier, token);
  if (!data) {
    res.status(400).send({ message: "Unable to verify session token." });
    return;
  }

  let account = await getAccountByEmail(identifier, appId);
  if (!account) {
    account = await createAccount(identifier, appId);
  }

  if (!account) {
    res.status(500).send({ message: "Unable to create account." });
    return;
  }

  const jwt = await generateToken({
    sub: account.id,
    aud: appId,
  });

  res.status(200).send({
    data: {
      account,
      token: jwt,
      expires: dayjs().add(CONFIG.JWT_EXPIRATION, "seconds").unix(),
    },
  });
}

async function Logout(req: Request, res: Response) {
  res.status(204).send();
}
