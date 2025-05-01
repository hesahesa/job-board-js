import { Job } from "@/utils/model/job";
import Link from "next/link";

export function JobPost({
  job,
  edit_mode = false,
}: {
  job: Job,
  edit_mode: boolean;
}) {
  return (
    <li className="relative">
      <label
        htmlFor={job.title?? ""}
        className={`relative text-base text-foreground peer-checked:line-through font-medium`}
      >
        <span className="ml-8">{job.title?? "No Title"}</span>
        <div
          className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}
        >
            <div className="flex flex-col">
                <span>Company name: {job.company_name?? "No Company"}</span>
                <span>Location: {job.location?? "No Location"}</span>
                <span>Job Type:{job.job_type?? "No Job Type"}</span>
                <span>Description: {job.description?? "No Description"}</span>
                { edit_mode &&<Link href={`/dashboard/edit-job/${job.id}`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
                }
                { edit_mode &&<Link href={`/dashboard/delete-job/${job.id}`} className="text-red-500 hover:underline">
                  Delete
                </Link>
                }
            </div>
        </div>
      </label>
    </li>
  );
}
