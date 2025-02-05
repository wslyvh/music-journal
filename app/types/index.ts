export interface DataSchema<T> {
  version: number;
  data: T;
}

export interface Profile {
  id?: string;
  username: string;
  instrument: string;
  yearsOfExperience: number;
  practiceFrequency: number;
  goals: string;

  createdAt: number;
}

export interface PracticeStats {
  total: number;
  totalDuration: number;
  longestSession: number;
  averageSession: number;
  days: {
    date: number;
    sessions: number;
    duration: number;
  }[];
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
  goals?: string;
  notes?: string;
  rating?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed?: number;
}
