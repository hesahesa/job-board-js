import { Job } from "@/utils/model/job";
import { JobPost } from "./job-post";

export default function JobPostList({jobs}: {jobs: Job[]}) {
  return (
    <>
      {jobs?.length > 0 ? (
        <ol className="flex flex-col gap-6">
          {jobs.map((job) => (
            <JobPost key={job.id} job={job} />
          ))}
        </ol>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="font-medium text-xl mb-4">No Jobs Available</h2>
        </div>
      )}
    </>
  );
}
