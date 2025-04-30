export interface Job {
  company_name: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: number;
  job_type: string | null;
  location: string | null;
  title: string | null;
}