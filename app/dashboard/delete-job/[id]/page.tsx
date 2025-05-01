import { deleteJobAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getJobById } from "@/utils/supabase/queries";

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

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto" action={deleteJobAction}>
      <h1 className="text-2xl font-medium">Delete Job</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <input type="hidden" name="id" value={job.id} />
        <Label htmlFor="title">Title</Label>
        <Input name="title" placeholder="My Awesome Job" defaultValue={job.title?? ""} required readOnly/>
        <Label htmlFor="company_name">Company Name</Label>
        <Input name="company_name" placeholder="XYZ Inc." defaultValue={job.company_name?? ""} required readOnly/>
        <Label htmlFor="description">Description</Label>
        <Input name="description" placeholder="XYZ Inc. is an awesome company and we want you!" defaultValue={job.description?? ""} required readOnly/>
        <Label htmlFor="location">Location</Label>
        <Input name="location" placeholder="Antarctica" defaultValue={job.location?? ""} required readOnly/>
        <Label htmlFor="job_type">Job Type</Label>
        <Input name="location" placeholder="Antarctica" defaultValue={job.job_type?? ""} required readOnly/>
        <br />
        <SubmitButton variant={"destructive"} pendingText="Submitting...">
          Delete
        </SubmitButton>
      </div>
    </form>
  );
}
