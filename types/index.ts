export interface Project {
  id: number;
  name: string;
  goalAmount: string;
  currentAmount: string;
  deadline: Date;
}

export interface BoostResult {
  status: 'success' | 'error';
  data?: {
    transactionHash: string;
    amount: string;
  };
  error?: string;
}

export interface ProjectCardProps {
  project: Project;
  onBoost?: (amount: string) => Promise<BoostResult>;
  className?: string;
}