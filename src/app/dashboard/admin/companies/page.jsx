import CompaniesTable from "@/components/dashboard/CompanyTable";
import { getCompanies } from "@/lib/api/companies";
import React from "react";


const AdminCompaniesPage = async () => {
  const rawCompanies = await getCompanies();
  // MongoDB ObjectId বা ডেট সেরিবালাইজেশনের জন্য
  const companies = JSON.parse(JSON.stringify(rawCompanies || []));

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-white">
      <CompaniesTable companies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;
