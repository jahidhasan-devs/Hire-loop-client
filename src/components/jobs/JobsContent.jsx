"use client";

import { useCallback, useState } from "react";
import JobCard from "./JobCard";
import JobSearchFilter from "./JobSearchFilter";

const JobsContent = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleFilter = useCallback((jobs) => {
    setFilteredJobs(jobs);
  }, []);

  return (
    <>
      <JobSearchFilter jobs={jobs} onFilter={handleFilter} />

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#171719] py-16 text-center">
          <h3 className="text-xl font-medium text-white">No jobs found</h3>

          <p className="mt-2 text-sm text-white/40">
            Try changing your search or filter options.
          </p>
        </div>
      )}
    </>
  );
};

export default JobsContent;
