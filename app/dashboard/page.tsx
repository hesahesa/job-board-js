import JobPostList from "@/components/portal/job-post-lists";
import { Button } from "@/components/ui/button";
import { getJobsByUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const jobs = await getJobsByUser(user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <Button asChild size="sm" variant={"default"}>
        <Link href="/dashboard/add-job">Add new Job</Link>
      </Button>
      <div>
        <h2 className="font-bold text-2xl mb-4">Jobs Posted by You:</h2>
        <JobPostList jobs={jobs}/>
      </div>
    </div>
  );
}
