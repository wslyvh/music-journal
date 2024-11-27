export interface Account extends AccountProfileData {
  id: number;
  email: string;
  createdAt: number;
  updatedAt: number;
  appId?: string;
  onboarded?: boolean;
}

export interface AccountProfileData {
  username: string;
  instruments: string[];
}

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
