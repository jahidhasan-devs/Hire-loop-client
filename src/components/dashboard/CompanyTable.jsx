"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { updateCompany } from "@/lib/actions/companies";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString) {
  if (!dateString) return "Oct 12, 2023";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function CompaniesTable({ companies = [] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const handleAction = async (companyId, action) => {
    try {
      setLoadingId(companyId);

      await updateCompany(String(companyId), {
        status: action,
      });

      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full text-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Companies for a review : {companies.length}
        </h2>
      </div>

      <Table aria-label="Company approval table">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Company Name</Table.Column>

              <Table.Column>Recruiter Email</Table.Column>
              <Table.Column>Industry</Table.Column>
              <Table.Column>Jobs count</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Date Submitted</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {companies.map((company) => {
                const status = (company.status || "pending").toLowerCase();

                const fallbackEmail = `hr@${(company.companyName || "company")
                  .toLowerCase()
                  .replace(/\s+/g, "")}.com`;

                const isProcessing = loadingId === String(company._id);

                return (
                  <Table.Row key={String(company._id)}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700 shrink-0">
                          {company.logo ? (
                            <img
                              src={company.logo}
                              alt={company.companyName || "Company logo"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs font-semibold text-zinc-300">
                              {getInitials(company.companyName)}
                            </span>
                          )}
                        </div>

                        <span className="font-medium text-zinc-100">
                          {company.companyName}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-zinc-400 text-sm">
                        {company.recruiterEmail || fallbackEmail}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {company.industry}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {company.jobsCount}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="inline-flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            status === "approved"
                              ? "bg-emerald-500"
                              : status === "rejected"
                                ? "bg-rose-500"
                                : "bg-amber-400"
                          }`}
                        />

                        <span
                          className={`text-xs font-medium capitalize ${
                            status === "approved"
                              ? "text-emerald-400"
                              : status === "rejected"
                                ? "text-rose-400"
                                : "text-amber-400"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-zinc-400 text-sm">
                        {formatDate(company.createdAt)}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {status !== "approved" && (
                          <Button
                            size="sm"
                            disabled={isProcessing}
                            className="bg-emerald-950/65 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60 font-medium disabled:opacity-50"
                            onPress={() =>
                              handleAction(company._id, "approved")
                            }
                          >
                            {isProcessing ? "..." : "Approve"}
                          </Button>
                        )}

                        {status !== "rejected" && (
                          <Button
                            size="sm"
                            disabled={isProcessing}
                            className="bg-rose-950/65 text-rose-400 border border-rose-800 hover:bg-rose-900/60 font-medium disabled:opacity-50"
                            onPress={() =>
                              handleAction(company._id, "rejected")
                            }
                          >
                            {isProcessing ? "..." : "Reject"}
                          </Button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <div className="flex items-center justify-between px-2 py-3 text-xs text-zinc-400">
            <div>
              Showing 1-{companies.length} of {companies.length} companies
            </div>

            <div className="flex items-center gap-1">
              <button
                className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-50"
                disabled
              >
                &lt;
              </button>

              <button className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-950 font-semibold">
                1
              </button>

              <button className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                2
              </button>

              <button className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                3
              </button>

              <button className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                &gt;
              </button>
            </div>
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
}
