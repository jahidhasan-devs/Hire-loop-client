import { getJobs } from "@/lib/api/jobs";
import JobsContent from "@/components/jobs/JobsContent";
import { Suspense } from "react";

const JobsPage = async () => {
  const jobs = await getJobs();

  return (
    <div className="mx-auto max-w-7xl pt-6">
      <h2 className="text-3xl font-medium">Open Position</h2>

      <p className="pb-6 text-muted">
        Discover your next engineering challenge
      </p>

      <Suspense fallback={<div>Loading jobs...</div>}>
        <JobsContent jobs={jobs} />
      </Suspense>
    </div>
  );
};

export default JobsPage;
