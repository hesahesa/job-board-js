import { createClient } from "./server";
import { Database } from "./types";

export const getAllJobs = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("job").select("*");

  if (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }

  return data;
};

export const getJobsByUser = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("job").select("*").eq("created_by", userId);

  if (error) {
    console.error("Error fetching jobs by user:", error);
    throw error;
  }

  return data;
};

export const updateJobByUser = async (jobId: number, userId: string, updates: Partial<Database["public"]["Tables"]["job"]["Update"]>) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job")
    .update(updates)
    .eq("id", jobId)
    .eq("created_by", userId);

  if (error) {
    console.error("Error updating job by user:", error);
    throw error;
  }

  return data;
};

export const deleteJobByUser = async (jobId: number, userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job")
    .delete()
    .eq("id", jobId)
    .eq("created_by", userId);

  if (error) {
    console.error("Error deleting job by user:", error);
    throw error;
  }

  return data;
};