export interface Job {
  id: number;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at?: string;
}