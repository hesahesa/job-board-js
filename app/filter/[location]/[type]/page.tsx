import JobPostList from "@/components/portal/job-post-lists";
import { getAllJobs } from "@/utils/supabase/queries";

export default async function FilteredHome({
  params,
}: {
  params: Promise<{ location: string; type: string }>;
}) {
  const { location, type } = await params;
  let jobs = await getAllJobs();

  jobs = jobs.filter((job) => {
    return job.location === location && job.job_type === type;
  });

  const headerText = `Available ${type} jobs in ${location}:`;

  return (
    <>
      <main className="flex-1 flex w-full flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">{headerText}</h2>
        <JobPostList jobs={jobs} />
      </main>
    </>
  );
}
