"use client";

import React from "react";
import { Table } from "@heroui/react";
import { Code2, Compass, Database, Cloud, Bot } from "lucide-react";
import Link from "next/link";

function timeAgo(date) {
  if (!date) return "Recently";
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000,
  );
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

export default function ApplicationTable({ jobs = [] }) {
  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Applications: {jobs.length}</h2>
      </div>

      <Table aria-label="Job applications table">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column>Job Title</Table.Column>
              <Table.Column>Company</Table.Column>
              <Table.Column>Applied</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {jobs.map((job) => {
                const lowerTitle = (job.jobTitle || "").toLowerCase();
                const statusVal = job.status || "Applied";

                const getStatusBadgeStyle = (status) => {
                  switch (status.toLowerCase()) {
                    case "review":
                      return "border-warning-500 text-warning-400 bg-warning-500/10";
                    case "shortlisted":
                      return "border-success-500 text-success-400 bg-success-500/10";
                    case "rejected":
                      return "border-danger-500 text-danger-400 bg-danger-500/10";
                    case "offered":
                      return "border-primary-500 text-primary-400 bg-primary-500/10";
                    default:
                      return "border-default-400 text-default-300 bg-default-400/10";
                  }
                };

                return (
                  <Table.Row key={String(job._id || job.jobId)}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-default-100 flex items-center justify-center text-default-600">
                          {lowerTitle.includes("design") ? (
                            <Compass className="w-5 h-5" />
                          ) : lowerTitle.includes("data") ? (
                            <Database className="w-5 h-5" />
                          ) : lowerTitle.includes("cloud") ? (
                            <Cloud className="w-5 h-5" />
                          ) : lowerTitle.includes("ai") ||
                            lowerTitle.includes("research") ? (
                            <Bot className="w-5 h-5" />
                          ) : (
                            <Code2 className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {job.jobTitle}
                          </div>
                          <div className="text-xs text-default-400">
                            {job.jobType || "Full-time"} •{" "}
                            {job.location || "Remote"}
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-foreground">{job.companyName}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-default-400">
                        {timeAgo(job.createdAt)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusBadgeStyle(
                          statusVal,
                        )}`}
                      >
                        {statusVal}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        href={`/jobs/${job.jobId}/apply`}
                        className="text-foreground/90 hover:text-foreground text-sm font-normal transition-colors"
                      >
                        Details
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>{/* Optional footer content */}</Table.Footer>
      </Table>
    </div>
  );
}
