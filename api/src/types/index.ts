import "express-session";

declare module "express-session" {
  interface Session {
    userId?: number;
    tokenId?: number;
  }
}

export interface Account {
  id: number;
  email: string;
  createdAt: number;
  updatedAt: number;
  domain: string;
}

export interface VerificationToken {
  identifier: string;
  token: number;
  expires: number;
}
