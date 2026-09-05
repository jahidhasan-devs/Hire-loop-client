
import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/application";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <div className="w-full max-w-md rounded-2xl border border-danger-200 bg-danger-50 p-8 text-center shadow-sm dark:border-danger-900/50 dark:bg-danger-950/30">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-danger-100 text-2xl dark:bg-danger-900/40">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-danger-700 dark:text-danger-400">
            Application Restricted
          </h2>

          <p className="mt-3 text-sm leading-6 text-danger-600 dark:text-danger-300">
            Only job seekers can apply for this position. Please sign in with
            a seeker account to continue.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-danger-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-danger-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const application = await getApplicationByApplicant(user.id);
  const plan=await getPlanById(user?.plan||'seeker_free');
  console.log("checking Number",plan);

 

  const job = await getJobById(id);

  const applicationLimitReached =
    application.length >= plan.maxApplicationsPerMonth;

  const progress = Math.min(
    (application.length / plan.maxApplicationsPerMonth) * 100,
    100
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
            Job Application
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Apply for this position
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Complete your application and take the next step in your career.
          </p>
        </div>

        {/* Application Limit Card */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Usage Info */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Monthly Applications
              </p>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {application.length}
                </span>

                <span className="text-sm text-gray-400">
                  / {plan.maxApplicationsPerMonth}
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Applications used this month
              </p>
            </div>

            {/* Progress */}
            <div className="w-full sm:max-w-xs">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Free Plan
                </span>

                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Progress Background */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-red-700">
                {/* Filled Progress */}
                <div
                  className={`h-full rounded-full shadow-sm transition-all duration-700 ease-out ${
                    applicationLimitReached ? "bg-danger-500" : "bg-primary-500"
                  }`}
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-right text-xs text-gray-400">
                {application.length} of {plan.maxApplicationsPerMonth} used
              </p>
            </div>
          </div>
        </div>

        {/* Limit Reached */}
        {applicationLimitReached ? (
          <div className="rounded-2xl border border-warning-200 bg-warning-50 p-8 text-center dark:border-warning-900/50 dark:bg-warning-950/30">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warning-100 text-2xl dark:bg-warning-900/40">
              🔒
            </div>
            <h2 className="text-xl font-bold text-warning-800 dark:text-warning-300">
              Monthly Application Limit Reached
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-warning-700 dark:text-warning-400">
              You have used all {plan.maxApplicationsPerMonth} applications
              available on the Free Plan this month.
            </p>

            <Link
              href="/plans"
              className="group mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12] hover:shadow-xl hover:shadow-black/40 active:translate-y-0"
            >
              Upgrade Your Plan
              <span className="text-lg text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                <ArrowRight/>
              </span>
            </Link>
          </div>
        ) : (
          <>
            {/* Upgrade Notice */}
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-primary-100 bg-primary-50 p-5 dark:border-primary-900/50 dark:bg-primary-950/30 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-primary-900 dark:text-primary-300">
                  Need more applications?
                </h3>

                <p className="mt-1 text-sm text-primary-700 dark:text-primary-400">
                  Upgrade your plan to apply for more positions.
                </p>
              </div>

              <Link
                href="/plan/viewplans"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                View Plans
              </Link>
            </div>

            {/* Application Form */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <JobApply applicant={user} job={job} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;

