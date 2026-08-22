import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const RecruiterJobs = async () => {
  const companyId = "company_001"; // TODO: get from logged-in recruiter

  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Manage Jobs</h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage all jobs posted by your company.
          </p>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111111] shadow-xl">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              {/* Table Header */}
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Job Title
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Type / Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Location
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-white/10">
                {jobs?.map((job) => (
                  <tr
                    key={job._id}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    {/* Job Title */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-white">{job.title}</p>

                        <p className="mt-1 text-xs text-gray-500">
                          Posted {job.createdAt?.slice(0, 10)}
                        </p>
                      </div>
                    </td>

                    {/* Type / Category */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-start gap-1.5">
                        <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                          {job.type}
                        </span>

                        <span className="text-sm text-gray-400">
                          {job.category}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5">
                      {job.location?.remote ? (
                        <span className="text-sm font-medium text-gray-300">
                          Remote
                        </span>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            {job.location?.city}
                          </p>

                          <p className="text-xs text-gray-500">
                            {job.location?.country}
                          </p>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                          job.status === "active"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-gray-500/20 bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-1">
                        {/* View */}
                        <button
                          title="View Job"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-blue-500/10 hover:text-blue-400"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Edit */}
                        <button
                          title="Edit Job"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Delete */}
                        <button
                          title="Delete Job"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {(!jobs || jobs.length === 0) && (
            <div className="px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-white">
                No jobs found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Your company has not posted any jobs yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobs;
