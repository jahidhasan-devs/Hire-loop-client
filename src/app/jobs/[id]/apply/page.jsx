import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';

const ApplyPage =async ({params}) => {
 const {id}=await params;
const user=await getUserSession()
 if(!user){
    redirect(`/signin?redirect=/jobs/${id}/apply`)
 }
if (user.role !== "seeker") {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          Only job seekers can apply for this position.
        </h2>
        <p className="mt-2 text-gray-500">
          Please sign in with a seeker account to proceed.
        </p>
      </div>
    </div>
  );
}

const job=await getJobById(id);


    return (
        <div>          
            <JobApply applicant={user} job={job}></JobApply>
        </div>
    );
};

export default ApplyPage;