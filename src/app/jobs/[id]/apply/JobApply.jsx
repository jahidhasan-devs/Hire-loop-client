"use client";

import React, { useState } from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  Description,
  FieldError,
  TextArea,
} from "@heroui/react";
import { submitApplication } from "@/lib/actions/application";

const JobApply = ({ job, applicant }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("check",applicant);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const applicationData = {
      jobId: job?._id,
      jobTitle:job?.title,
      companyName:job?.company?.name,
      applicantId: applicant?.id,
      applicantName:applicant?.name,
      applicantEmail:applicant?.email,
      resumeLink: formData.get("resumeLink"),
      portfolioLink: formData.get("portfolioLink"),
      coverLetter: formData.get("coverLetter"),
    };

    console.log("Application Data:", applicationData);

    // API call here
    const res=await submitApplication(applicationData);
    if(res.insertedId){
      alert(`Application submitted successful !`);    
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm text-gray-400">Job Application</p>

          <h2 className="text-2xl font-bold text-white">
            Apply for {job?.title}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Submit your resume and some optional information.
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Link */}
          <TextField name="resumeLink" type="url" isRequired className="w-full">
            <Label className="text-gray-200">Resume Link</Label>

            <Input
              placeholder="https://drive.google.com/..."
              className="bg-gray-800 text-white"
            />

            <Description className="text-gray-400">
              Add a publicly accessible link to your resume.
            </Description>

            <FieldError />
          </TextField>

          {/* Portfolio */}
          <TextField name="portfolioLink" type="url" className="w-full">
            <Label className="text-gray-200">
              Portfolio Link <span className="text-gray-500">(Optional)</span>
            </Label>

            <Input
              placeholder="https://yourportfolio.com"
              className="bg-gray-800 text-white"
            />

            <Description className="text-gray-400">
              GitHub, portfolio, LinkedIn, or personal website.
            </Description>

            <FieldError />
          </TextField>

          {/* Cover Letter */}
          <TextField name="coverLetter" className="w-full">
            <Label className="text-gray-200">
              Cover Letter <span className="text-gray-500">(Optional)</span>
            </Label>

            <TextArea
              placeholder="Write a short message to the recruiter..."
              className="min-h-32 bg-gray-800 text-white"
            />

            <Description className="text-gray-400">
              Briefly explain why you are interested in this position.
            </Description>

            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="reset"
              variant="secondary"
              className="border border-gray-700 bg-gray-800 text-gray-200"
            >
              Reset
            </Button>

            <Button
              type="submit"
              variant="primary"
              isDisabled={isSubmitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default JobApply;
