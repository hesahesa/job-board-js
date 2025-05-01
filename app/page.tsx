import Hero from "@/components/hero";
import JobPostList from "@/components/portal/job-post-lists";
import { getAllJobs } from "@/utils/supabase/queries";

export default async function Home() {
  const jobs = await getAllJobs();
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Available Jobs:</h2>
        <JobPostList jobs={jobs}/>
      </main>
    </>
  );
}
