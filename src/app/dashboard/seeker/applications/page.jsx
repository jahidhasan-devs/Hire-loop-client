import { getApplicationByApplicant } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import ApplicationTable from "./ApplicationTable";

const ApplicationPage = async () => {
  const user = await getUserSession();
  const rawJobs = await getApplicationByApplicant(user.id);

  // MongoDB ObjectId/Date সিরিয়ালাইজ করার জন্য
  const jobs = JSON.parse(JSON.stringify(rawJobs || []));

  return <ApplicationTable jobs={jobs} />;
};

export default ApplicationPage;
