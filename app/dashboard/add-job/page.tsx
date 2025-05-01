import { addJobAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AddJob(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto" action={addJobAction}>
      <h1 className="text-2xl font-medium">Add new Job</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="title">Title</Label>
        <Input name="title" placeholder="My Awesome Job" required />
        <Label htmlFor="company_name">Company Name</Label>
        <Input name="company_name" placeholder="XYZ Inc." required />
        <Label htmlFor="description">Description</Label>
        <Input name="description" placeholder="XYZ Inc. is an awesome company and we want you!" required />
        <Label htmlFor="location">Location</Label>
        <Input name="location" placeholder="Antarctica" required />
        <Label htmlFor="job_type">Job Type</Label>
        <select name="job_type" id="job_type">
          <option value="full_time">Full-Time</option>
          <option value="part_time">Part-Time</option>
          <option value="contract">Contract</option>
        </select>
        <br />
        <SubmitButton pendingText="Submitting...">
          Submit
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
