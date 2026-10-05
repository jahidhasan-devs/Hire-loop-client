const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;

export const getJobs = async () => {
  const res = await fetch(`${baseUrl}/api/jobs`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
};

export const getJobById = async (jobId) => {
  const res = await fetch(`${baseUrl}/api/jobs/${jobId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }

  return res.json();
};

export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch company jobs");
  }

  return res.json();
};

export const createJob = async (jobData) => {
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to create job");
  }

  return res.json();
};
