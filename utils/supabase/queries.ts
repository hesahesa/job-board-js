import { createClient } from "./server";
import { Database } from "./types";
import { Job } from "../model/job";

export const getAllJobs = async (): Promise<Job[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("job").select("*");

  if (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }

  return (data ?? []) as Job[];
};

export const getJobsByUser = async (userId: string): Promise<Job[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("job").select("*").eq("created_by", userId);

  if (error) {
    console.error("Error fetching jobs by user:", error);
    throw error;
  }

  return (data ?? []) as Job[];
};

export const updateJobByUser = async (
  jobId: number,
  userId: string,
  updates: Partial<Database["public"]["Tables"]["job"]["Update"]>
): Promise<Boolean> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("job")
    .update(updates)
    .eq("id", jobId)
    .eq("created_by", userId);

  if (error) {
    console.error("Error updating job by user:", error);
    return false;
  }

  return true;
};

export const deleteJobByUser = async (jobId: number, userId: string): Promise<Boolean> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("job")
    .delete()
    .eq("id", jobId)
    .eq("created_by", userId);

  if (error) {
    console.error("Error deleting job by user:", error);
    throw false;
  }

  return true;
};

export const insertJob = async (
  job: Database["public"]["Tables"]["job"]["Insert"]
): Promise<Job> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("job").insert(job).select().single();

  if (error) {
    console.error("Error inserting job:", error);
    throw error;
  }

  return data as Job;
};