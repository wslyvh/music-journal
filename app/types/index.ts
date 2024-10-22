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
