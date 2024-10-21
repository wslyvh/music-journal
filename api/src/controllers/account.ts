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

const tokenValidation = [body("identifier").isEmail().normalizeEmail()];
const loginValidation = [
  body("identifier").isEmail().normalizeEmail(),
  body("token").isNumeric().trim().isLength({ min: 6, max: 6 }),
];

export const accountRouter = Router();
accountRouter.get(`/account`, authHandler, GetAccount);
accountRouter.put(`/account`, authHandler, UpdateAccount);
accountRouter.delete(`/account`, authHandler, DeleteAccount);
accountRouter.post(`/account/token`, validate(tokenValidation), Token);
accountRouter.post(`/account/login`, validate(loginValidation), Login);
accountRouter.post(`/account/logout`, authHandler, Logout);

async function GetAccount(req: Request, res: Response) {
  const userId = req.session.userId!!;

  const account = await getAccount(userId);
  if (!account) {
    res.status(404).send({ message: "Account not found." });
    return;
  }

  res.status(200).send({ data: account });
}

async function UpdateAccount(req: Request, res: Response) {
  const userId = req.session.userId!!;
  const data = req.body; // TODO: validate

  const account = await updateAccount(data);
  if (!account) {
    res.status(500).send({ message: "Unable to update account." });
    return;
  }

  res.status(200).send({ data: account });
}

async function DeleteAccount(req: Request, res: Response) {
  const userId = req.session.userId!!;

  const success = await deleteAccount(userId);
  if (!success) {
    res.status(500).send({ message: "Unable to delete account." });
    return;
  }

  res.status(204).send();
}

async function Token(req: Request, res: Response) {
  const identifier = req.body.identifier;

  const data = await createVerificationToken(identifier);
  if (!data) {
    res.status(500).send({ message: "Unable to create verification token." });
    return;
  }

  await sendVerificationToken(identifier, data.token);

  req.session.tokenId = data.token;
  req.session.save();

  res.status(204).send();
}

async function Login(req: Request, res: Response) {
  const { identifier, token } = req.body;

  const id = req.session.tokenId;
  if (!id) {
    res.status(400).send({ message: "Invalid session token." });
    return;
  }

  const data = await verifyVerificationToken(identifier, token);
  if (!data) {
    res.status(400).send({ message: "Unable to verify session token." });
    return;
  }

  let account = await getAccountByEmail(data.identifier);
  if (!account) {
    account = await createAccount(data.identifier);
  }

  if (!account) {
    res.status(500).send({ message: "Unable to create account." });
    return;
  }

  req.session.userId = account.id;
  req.session.save();

  res.status(200).send({ data: account });
}

async function Logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ message: "Unable to logout." });
      return;
    }
  });

  res.status(204).send();
}
