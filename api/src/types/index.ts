import "express-session";

declare module "express-session" {
  interface Session {
    userId?: number;
    tokenId?: number;
    appId?: string;
  }
}

export interface Account {
  id: number;
  email: string;
  createdAt: number;
  updatedAt: number;
  appId?: string;
}

export interface VerificationToken {
  identifier: string;
  token: number;
  expires: number;
}
