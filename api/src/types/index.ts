declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        appId: string;
        [key: string]: string;
      };
    }
  }
}

export interface Account extends Profile {
  id: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  appId?: string;
}

export interface Profile {
  username: string;
  instruments: string[];
}

export type CreateAccountData = {
  email: "";
  type: "user";
  username: "";
  instrument: ["My Instrument"];
  appId: "";
};

export interface VerificationToken {
  identifier: string;
  token: number;
  expires: number;
}

export interface Practice extends PracticeData {
  id: string;
  accountId: string;
  timestamp: number;
}

export interface PracticeData {
  type: string;
  duration: number;
  data?: number;
  notes?: string;
  rating?: number;
  visibility?: number;
}
