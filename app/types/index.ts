export interface Profile {
  id?: string;
  username: string;
  instrument: string;
  yearsOfExperience: number;
  practiceFrequency: number;
  goals: string;

  createdAt: number;
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
