
import { getJobById } from "@/lib/api/jobs";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }) => {
  const { id } = await params;

  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-20 text-center dark:bg-gray-950">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Job Not Found
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The job you are looking for does not exist.
        </p>

        <Link
          href="/jobs"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Jobs
        </Link>

        {/* ================= HEADER ================= */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            {/* Company */}
            <div className="flex items-center gap-5">

              {/* Logo */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                {job.company?.logo && (
                  <Image
                    src={job.company.logo}
                    alt={job.company?.name || "Company logo"}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  {job.title}
                </h1>

                <p className="mt-1 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                  {job.company?.name}
                </p>
              </div>
            </div>

            {/* Apply Button */}
            <Link
              href={`/jobs/${id}/apply`}
              className="rounded-xl bg-blue-600 px-7 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Apply Now
            </Link>
          </div>

          {/* Job Tags */}
          <div className="mt-7 flex flex-wrap gap-3">

            {/* Category */}
            <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400">
              {job.category}
            </span>

            {/* Type */}
            <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-400">
              {job.type}
            </span>

            {/* Location */}
            <span className="rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              📍{" "}
              {job.location?.remote
                ? "Remote"
                : `${job.location?.city}, ${job.location?.country}`}
            </span>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ================= LEFT ================= */}
          <div className="space-y-6 lg:col-span-2">

            {/* Responsibilities */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Responsibilities
              </h2>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                {job.description?.responsibilities}
              </p>
            </section>

            {/* Requirements */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Requirements
              </h2>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                {job.description?.requirements}
              </p>
            </section>

            {/* Benefits */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Benefits
              </h2>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                {job.description?.benefits}
              </p>
            </section>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-6">

            {/* Salary */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Salary
              </h2>

              <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                {job.salary?.currency}{" "}
                {job.salary?.min?.toLocaleString()} -{" "}
                {job.salary?.max?.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                Per year
              </p>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Location
              </h2>

              <p className="mt-2 font-medium text-gray-900 dark:text-white">
                {job.location?.remote
                  ? "Remote"
                  : `${job.location?.city}, ${job.location?.country}`}
              </p>
            </section>

            {/* Job Type */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Job Type
              </h2>

              <p className="mt-2 font-medium text-gray-900 dark:text-white">
                {job.type}
              </p>
            </section>

            {/* Deadline */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Application Deadline
              </h2>

              <p className="mt-2 font-medium text-gray-900 dark:text-white">
                {new Date(
                  job.applicationDeadline
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </section>

            
            {/* <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/30">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Interested in this job?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Submit your application and take the next step in your career.
              </p>

              <Link
                href={`/jobs/${id}/apply`}
                className="mt-5 block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Apply Now
              </Link>
            </section> */}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Page;

