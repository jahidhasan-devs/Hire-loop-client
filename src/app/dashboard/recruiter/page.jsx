"use client"

import DashboardStats from '@/components/dashboard/DashboardStats';
import { useSession,isPending, authClient } from '@/lib/auth-client';
import React from 'react';


const stats = [
  {
    type: "jobs",
    title: "Total Job Posts",
    value: "48",
  },
  {
    type: "applicants",
    title: "Total Applicants",
    value: "1,284",
  },
  {
    type: "active",
    title: "Active Jobs",
    value: "18",
  },
  {
    type: "closed",
    title: "Jobs Closed",
    value: "32",
  },
];

const RecruiterDashboardHomePage = () => {

const{data:session,isPending}=authClient.useSession()
if(isPending){
    return <div>Loading....</div>
}
const user=session?.user;
console.log("check",user)

    return (
      <div className="min-h-screen bg-[#111111] px-5 py-4">
        <h1 className="mb-8 text-base font-medium text-zinc-100">
          Welcome back, Alex Sterling
        </h1>

        <DashboardStats stats={stats} />
      </div>
    );
};

export default RecruiterDashboardHomePage;