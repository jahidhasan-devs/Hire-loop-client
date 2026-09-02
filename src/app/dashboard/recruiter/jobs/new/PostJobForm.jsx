"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  ListBox,
  Select,
  Switch,
  TextArea,
  TextField,
} from "@heroui/react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  MapPin,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";

import { redirect, useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/jobs";

export default function PostJobForm({ companyData }) {
  console.log(companyData);
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

   const company = {
     id: companyData?._id || "",
     name: companyData?.companyName || "",
     logo: companyData?.logo || "",
     approved: true,
     plan: "Growth",
     activeJobs: 4,
     jobLimit: 10,
   };

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCategory: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    city: "",
    country: "",
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Software Development",
    "UI/UX Design",
    "Marketing",
    "Sales",
    "Finance",
    "Human Resources",
    "Customer Support",
    "Data & Analytics",
    "Product Management",
    "Other",
  ];

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Remote",
    "Contract",
    "Internship",
  ];

  const currencies = ["USD", "EUR", "GBP", "BDT", "INR", "CAD", "AUD"];

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required.";
    }

    if (!formData.jobCategory) {
      newErrors.jobCategory = "Select a job category.";
    }

    if (!formData.jobType) {
      newErrors.jobType = "Select a job type.";
    }

    if (!formData.salaryMin) {
      newErrors.salaryMin = "Minimum salary is required.";
    }

    if (!formData.salaryMax) {
      newErrors.salaryMax = "Maximum salary is required.";
    }

    if (
      formData.salaryMin &&
      formData.salaryMax &&
      Number(formData.salaryMin) > Number(formData.salaryMax)
    ) {
      newErrors.salaryMax = "Maximum salary must be greater than minimum.";
    }

    if (!isRemote) {
      if (!formData.city.trim()) {
        newErrors.city = "City is required.";
      }

      if (!formData.country.trim()) {
        newErrors.country = "Country is required.";
      }
    }

    if (!formData.deadline) {
      newErrors.deadline = "Application deadline is required.";
    }

    if (!formData.responsibilities.trim()) {
      newErrors.responsibilities = "Responsibilities are required.";
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = "Requirements are required.";
    }

    if (!company.approved) {
      newErrors.company = "Your company must be approved before posting.";
    }

    if (company.activeJobs >= company.jobLimit) {
      newErrors.company = `Your ${company.plan} plan has reached its active job limit.`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    const jobData = {
      title: formData.jobTitle.trim(),

      category: formData.jobCategory,

      type: formData.jobType,

      salary: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
        currency: formData.currency,
      },

      location: {
        city: isRemote ? "" : formData.city.trim(),
        country: isRemote ? "" : formData.country.trim(),
        remote: isRemote,
      },

      applicationDeadline: formData.deadline,

      description: {
        responsibilities: formData.responsibilities.trim(),
        requirements: formData.requirements.trim(),
        benefits: formData.benefits.trim(),
      },

      company: {
        id: company.id,
        name: company.name,
        logo:company.logo,
      },

      status: "active",

      visibility: "public",

      createdAt: new Date().toISOString(),
    };

    try {
      const response = await createJob(jobData);

      await new Promise((resolve) => setTimeout(resolve, 800));

      alert("Job posted successfully.");

      setFormData({
        jobTitle: "",
        jobCategory: "",
        jobType: "",
        salaryMin: "",
        salaryMax: "",
        currency: "USD",
        city: "",
        country: "",
        deadline: "",
        responsibilities: "",
        requirements: "",
        benefits: "",
      });
      router.push("/dashboard/recruiter/jobs");
    } catch (error) {
      console.error("Job creation failed:", error);
      alert("Something went wrong while posting the job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-5 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                href="/dashboard/recruiter/jobs"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800 bg-[#1b1b1b] text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                <ArrowLeft size={14} />
              </Link>

              <h1 className="text-[15px] font-medium text-zinc-100">
                Post a New Job
              </h1>
            </div>

            <p className="ml-9 text-[10px] text-zinc-500">
              Create a job listing and reach qualified candidates on HireLoop.
            </p>
          </div>
        </div>

        {/* Company Status */}
        <div className="mb-5 rounded-md border border-zinc-800 bg-[#191919] px-4 py-3">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800">
                <BriefcaseBusiness size={14} className="text-zinc-400" />
              </div>

              <div>
                <p className="text-[11px] font-medium text-zinc-200">
                  {company.name}
                </p>

                <p className="mt-0.5 text-[9px] text-zinc-500">
                  Registered company • {company.plan} plan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[9px] text-zinc-500">Active jobs</p>

                <p className="text-[11px] text-zinc-200">
                  {company.activeJobs} / {company.jobLimit}
                </p>
              </div>

              {company.approved ? (
                <span className="flex items-center gap-1 rounded-full border border-emerald-900/60 bg-emerald-950/40 px-2 py-1 text-[8px] text-emerald-400">
                  <Check size={10} />
                  Approved
                </span>
              ) : (
                <span className="rounded-full border border-red-900/60 bg-red-950/40 px-2 py-1 text-[8px] text-red-400">
                  Not Approved
                </span>
              )}
            </div>
          </div>

          {errors.company && (
            <p className="mt-2 border-t border-zinc-800 pt-2 text-[9px] text-red-400">
              {errors.company}
            </p>
          )}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-md border border-zinc-800 bg-[#151515]">
            {/* ========================================
                JOB INFO
            ======================================== */}
            <section>
              <div className="border-b border-zinc-800 px-4 py-3 sm:px-5">
                <h2 className="text-[11px] font-medium text-zinc-200">
                  Job Info
                </h2>

                <p className="mt-0.5 text-[9px] text-zinc-500">
                  Provide the basic information about the position.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-4 p-4 sm:grid-cols-2 sm:p-5">
                {/* Job Title */}
                <TextField
                  name="jobTitle"
                  isRequired
                  isInvalid={Boolean(errors.jobTitle)}
                  className="w-full"
                >
                  <Label className="text-[9px] text-zinc-400" isRequired>
                    Job Title
                  </Label>

                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(event) =>
                      updateField("jobTitle", event.target.value)
                    }
                    placeholder="e.g. Senior Frontend Developer"
                    variant="secondary"
                    className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] text-zinc-200 placeholder:text-zinc-600"
                  />

                  {errors.jobTitle && (
                    <p className="mt-1 text-[8px] text-red-400">
                      {errors.jobTitle}
                    </p>
                  )}
                </TextField>

                {/* Job Category */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[9px] text-zinc-400" isRequired>
                    Job Category
                  </Label>

                  <Select
                    aria-label="Job Category"
                    selectedKey={formData.jobCategory || null}
                    onSelectionChange={(key) => updateField("jobCategory", key)}
                    placeholder="Select category"
                    className="w-full"
                    variant="secondary"
                  >
                    <Select.Trigger className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] text-zinc-300">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {categories.map((category) => (
                          <ListBox.Item
                            key={category}
                            id={category}
                            textValue={category}
                          >
                            {category}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {errors.jobCategory && (
                    <p className="text-[8px] text-red-400">
                      {errors.jobCategory}
                    </p>
                  )}
                </div>

                {/* Job Type */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[9px] text-zinc-400" isRequired>
                    Job Type
                  </Label>

                  <Select
                    aria-label="Job Category"
                    selectedKey={formData.jobType || null}
                    onSelectionChange={(key) => updateField("jobType", key)}
                    placeholder="Select job type"
                    className="w-full"
                    variant="secondary"
                  >
                    <Select.Trigger className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] text-zinc-300">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {jobTypes.map((type) => (
                          <ListBox.Item key={type} id={type} textValue={type}>
                            {type}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {errors.jobType && (
                    <p className="text-[8px] text-red-400">{errors.jobType}</p>
                  )}
                </div>

                {/* Remote Toggle */}
                <div className="flex items-center rounded-md border border-zinc-800 bg-[#1e1e1e] px-3">
                  <Switch
                    isSelected={isRemote}
                    onChange={setIsRemote}
                    size="sm"
                  >
                    <Switch.Content className="flex items-center gap-2">
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>

                      <span className="text-[9px] text-zinc-300">
                        Remote position
                      </span>
                    </Switch.Content>
                  </Switch>
                </div>

                {/* Salary Min */}
                <TextField name="salaryMin" isRequired className="w-full">
                  <Label className="text-[9px] text-zinc-400" isRequired>
                    Minimum Salary
                  </Label>

                  <Input
                    type="number"
                    min="0"
                    value={formData.salaryMin}
                    onChange={(event) =>
                      updateField("salaryMin", event.target.value)
                    }
                    placeholder="e.g. 50000"
                    variant="secondary"
                    className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] text-zinc-200 placeholder:text-zinc-600"
                  />

                  {errors.salaryMin && (
                    <p className="mt-1 text-[8px] text-red-400">
                      {errors.salaryMin}
                    </p>
                  )}
                </TextField>

                {/* Salary Max */}
                <TextField name="salaryMax" isRequired className="w-full">
                  <Label className="text-[9px] text-zinc-400" isRequired>
                    Maximum Salary
                  </Label>

                  <Input
                    type="number"
                    min="0"
                    value={formData.salaryMax}
                    onChange={(event) =>
                      updateField("salaryMax", event.target.value)
                    }
                    placeholder="e.g. 80000"
                    variant="secondary"
                    className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] text-zinc-200 placeholder:text-zinc-600"
                  />

                  {errors.salaryMax && (
                    <p className="mt-1 text-[8px] text-red-400">
                      {errors.salaryMax}
                    </p>
                  )}
                </TextField>

                {/* Currency */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[9px] text-zinc-400">Currency</Label>

                  <Select
                    aria-label="Job Category"
                    selectedKey={formData.currency}
                    onSelectionChange={(key) => updateField("currency", key)}
                    className="w-full"
                    variant="secondary"
                  >
                    <Select.Trigger className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] text-zinc-300">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {currencies.map((currency) => (
                          <ListBox.Item
                            key={currency}
                            id={currency}
                            textValue={currency}
                          >
                            {currency}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Deadline */}
                <TextField name="deadline" isRequired className="w-full">
                  <Label className="text-[9px] text-zinc-400" isRequired>
                    Application Deadline
                  </Label>

                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(event) =>
                        updateField("deadline", event.target.value)
                      }
                      variant="secondary"
                      className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] pr-9 text-[10px] text-zinc-300"
                    />

                    <CalendarDays
                      size={13}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                  </div>

                  {errors.deadline && (
                    <p className="mt-1 text-[8px] text-red-400">
                      {errors.deadline}
                    </p>
                  )}
                </TextField>
              </div>

              {/* Location */}
              <div className="border-t border-zinc-800 px-4 py-4 sm:px-5">
                <div className="mb-3">
                  <h3 className="text-[10px] font-medium text-zinc-300">
                    Location
                  </h3>

                  <p className="mt-0.5 text-[8px] text-zinc-500">
                    {isRemote
                      ? "This position will be displayed as remote."
                      : "Enter the city and country where the position is based."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* City */}
                  <TextField
                    name="city"
                    isDisabled={isRemote}
                    className="w-full"
                  >
                    <Label className="text-[9px] text-zinc-400">City</Label>

                    <div className="relative">
                      <MapPin
                        size={13}
                        className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-zinc-600"
                      />

                      <Input
                        value={formData.city}
                        onChange={(event) =>
                          updateField("city", event.target.value)
                        }
                        placeholder="e.g. Dhaka"
                        disabled={isRemote}
                        variant="secondary"
                        className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] pl-8 text-[10px] text-zinc-200 placeholder:text-zinc-600"
                      />
                    </div>

                    {errors.city && (
                      <p className="mt-1 text-[8px] text-red-400">
                        {errors.city}
                      </p>
                    )}
                  </TextField>

                  {/* Country */}
                  <TextField
                    name="country"
                    isDisabled={isRemote}
                    className="w-full"
                  >
                    <Label className="text-[9px] text-zinc-400">Country</Label>

                    <Input
                      value={formData.country}
                      onChange={(event) =>
                        updateField("country", event.target.value)
                      }
                      placeholder="e.g. Bangladesh"
                      disabled={isRemote}
                      variant="secondary"
                      className="h-9 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] text-zinc-200 placeholder:text-zinc-600"
                    />

                    {errors.country && (
                      <p className="mt-1 text-[8px] text-red-400">
                        {errors.country}
                      </p>
                    )}
                  </TextField>
                </div>
              </div>
            </section>

            {/* ========================================
                JOB DESCRIPTION
            ======================================== */}
            <section className="border-t border-zinc-800">
              <div className="border-b border-zinc-800 px-4 py-3 sm:px-5">
                <h2 className="text-[11px] font-medium text-zinc-200">
                  Job Description
                </h2>

                <p className="mt-0.5 text-[9px] text-zinc-500">
                  Explain what the candidate will do and what you expect.
                </p>
              </div>

              <div className="space-y-5 p-4 sm:p-5">
                {/* Responsibilities */}
                <TextField
                  name="responsibilities"
                  isRequired
                  className="w-full"
                >
                  <Label className="text-[9px] text-zinc-400" isRequired>
                    Responsibilities
                  </Label>

                  <TextArea
                    value={formData.responsibilities}
                    onChange={(event) =>
                      updateField("responsibilities", event.target.value)
                    }
                    placeholder={`Describe the main responsibilities of this role.

Example:
• Build and maintain modern web applications
• Collaborate with designers and backend developers
• Review code and improve application performance`}
                    rows={7}
                    variant="secondary"
                    className="min-h-32 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] leading-5 text-zinc-200 placeholder:text-zinc-600"
                  />

                  {errors.responsibilities && (
                    <p className="mt-1 text-[8px] text-red-400">
                      {errors.responsibilities}
                    </p>
                  )}
                </TextField>

                {/* Requirements */}
                <TextField name="requirements" isRequired className="w-full">
                  <Label className="text-[9px] text-zinc-400" isRequired>
                    Requirements
                  </Label>

                  <TextArea
                    value={formData.requirements}
                    onChange={(event) =>
                      updateField("requirements", event.target.value)
                    }
                    placeholder={`List the skills, qualifications, and experience required.

Example:
• 3+ years of experience with React
• Strong JavaScript and TypeScript knowledge
• Experience with REST APIs
• Good communication skills`}
                    rows={7}
                    variant="secondary"
                    className="min-h-32 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] leading-5 text-zinc-200 placeholder:text-zinc-600"
                  />

                  {errors.requirements && (
                    <p className="mt-1 text-[8px] text-red-400">
                      {errors.requirements}
                    </p>
                  )}
                </TextField>

                {/* Benefits */}
                <TextField name="benefits" className="w-full">
                  <Label className="text-[9px] text-zinc-400">
                    Benefits
                    <span className="ml-1 text-zinc-600">(Optional)</span>
                  </Label>

                  <TextArea
                    value={formData.benefits}
                    onChange={(event) =>
                      updateField("benefits", event.target.value)
                    }
                    placeholder={`Mention benefits such as health insurance, flexible hours, remote work, bonuses, paid leave, etc.`}
                    rows={5}
                    variant="secondary"
                    className="min-h-24 rounded-md border-zinc-800 bg-[#1e1e1e] text-[10px] leading-5 text-zinc-200 placeholder:text-zinc-600"
                  />
                </TextField>
              </div>
            </section>

            {/* ========================================
                COMPANY
            ======================================== */}
            <section className="border-t border-zinc-800">
              <div className="border-b border-zinc-800 px-4 py-3 sm:px-5">
                <h2 className="text-[11px] font-medium text-zinc-200">
                  Company
                </h2>

                <p className="mt-0.5 text-[9px] text-zinc-500">
                  This job will be posted under your approved registered
                  company.
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <div className="rounded-md border border-zinc-800 bg-[#1b1b1b] p-4">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800">
                        <BriefcaseBusiness
                          size={15}
                          className="text-zinc-400"
                        />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium text-zinc-200">
                          {company.name}
                        </p>

                        <p className="mt-1 text-[8px] text-zinc-500">
                          Automatically linked to this job
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-[8px] text-zinc-500">Job capacity</p>

                      <p className="mt-1 text-[10px] text-zinc-300">
                        {company.activeJobs} active / {company.jobLimit} allowed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================
                FOOTER ACTIONS
            ======================================== */}
            <div className="flex flex-col-reverse justify-between gap-3 border-t border-zinc-800 bg-[#191919] px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <Link href="/dashboard/recruiter/jobs">
                <Button
                  type="button"
                  variant="secondary"
                  className="h-9 w-full rounded-md border border-zinc-800 bg-[#1f1f1f] px-5 text-[9px] text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 sm:w-auto"
                >
                  <X size={12} />
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="h-9 w-full rounded-md bg-white px-5 text-[9px] font-medium text-black shadow-none hover:bg-zinc-200 sm:w-auto"
              >
                {isSubmitting ? (
                  "Posting Job..."
                ) : (
                  <>
                    <Plus size={12} />
                    Post Job
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
