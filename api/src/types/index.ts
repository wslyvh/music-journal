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

export interface PagedResult<T> {
  total: number;
  currentPage: number;
  items: Array<T>;
}

export interface Account {
  id: string;
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
