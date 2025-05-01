import JobPostList from "@/components/portal/job-post-lists";
import { JobSearchForm } from "@/components/portal/job-search-form";
import { getAllJobs } from "@/utils/supabase/queries";

export default async function Home() {
  const jobs = await getAllJobs();
  return (
    <>
      <JobSearchForm />
      <main className="flex-1 flex w-full flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Available Jobs:</h2>
        <JobPostList jobs={jobs}/>
      </main>
    </>
  );
}
