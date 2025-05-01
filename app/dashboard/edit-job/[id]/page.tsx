import { updateJobAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getJobById } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

export default async function EditJob({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const job = await getJobById(Number.parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (job.created_by !== user.data.user?.id) {
    return <div>You are not allowed to edit this job</div>;
  }

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto" action={updateJobAction}>
      <h1 className="text-2xl font-medium">Edit Job</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <input type="hidden" name="id" value={job.id} />
        <Label htmlFor="title">Title</Label>
        <Input name="title" placeholder="My Awesome Job" defaultValue={job.title?? ""} required />
        <Label htmlFor="company_name">Company Name</Label>
        <Input name="company_name" placeholder="XYZ Inc." defaultValue={job.company_name?? ""} required />
        <Label htmlFor="description">Description</Label>
        <Input name="description" placeholder="XYZ Inc. is an awesome company and we want you!" defaultValue={job.description?? ""} required />
        <Label htmlFor="location">Location</Label>
        <Input name="location" placeholder="Antarctica" defaultValue={job.location?? ""} required />
        <Label htmlFor="job_type">Job Type</Label>
        <select name="job_type" id="job_type" defaultValue={job.job_type ?? "full_time"}>
          <option value="full_time">Full-Time</option>
          <option value="part_time">Part-Time</option>
          <option value="contract">Contract</option>
        </select>
        <br />
        <SubmitButton pendingText="Submitting...">
          Submit
        </SubmitButton>
      </div>
    </form>
  );
}
