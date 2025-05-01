import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { searchJobAction } from "@/app/actions";
import { SubmitButton } from "../submit-button";

export function JobSearchForm() {
  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto" action={searchJobAction}>
      <h1 className="text-2xl font-medium">Search Job</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="location">Location</Label>
        <Input name="location" placeholder="Antarctica" required />
        <Label htmlFor="job_type">Job Type</Label>
        <select name="job_type" id="job_type" defaultValue="full_time">
          <option value="full_time">Full-Time</option>
          <option value="part_time">Part-Time</option>
          <option value="contract">Contract</option>
        </select>
        <br />
        <SubmitButton pendingText="Searching...">
          Search
        </SubmitButton>
      </div>
    </form>
  );
}
