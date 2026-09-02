import Link from "next/link";
import { Card } from "@heroui/react";
// import { Briefcase, Location, Globe, ArrowUpRight } from "@gravity-ui/icons";
import {
  Briefcase,
  Globe,
  ArrowUpRight,
  LocationArrow,
} from "@gravity-ui/icons";

export default function JobCard({ job }) {
  const formatSalary = (min, max, currency) => {
    if (currency === "BDT") {
      return `৳${min.toLocaleString()} - ৳${max.toLocaleString()}`;
    }

    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  return (
    <Card
      className="
    w-full
    rounded-[24px]
    bg-[#171719]
    text-white
    border
    border-white/5
    shadow-none
    p-6
    transition-all
    duration-200
    hover:-translate-y-1
    hover:border-white/10
    hover:bg-[#1b1b1e]
  "
    >
      {/* Header */}
      <Card.Header className="flex flex-col gap-5 p-0">
        {/* Company */}
        <div className="flex items-center gap-3">
          <div
            className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-white
          p-2
        "
          >
            <img
              src={job.company.logo}
              alt={`${job.company.name} logo`}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {job.company.name}
            </p>

            <p className="text-xs text-white/40">{job.category}</p>
          </div>
        </div>

        {/* Title + Description */}
        <div className="flex flex-col gap-2">
          <Card.Title
            className="
          text-[22px]
          font-semibold
          leading-tight
          text-white
        "
          >
            {job.title}
          </Card.Title>

          <Card.Description
            className="
          line-clamp-2
          text-sm
          leading-6
          text-white/50
        "
          >
            {job.description.responsibilities}
          </Card.Description>
        </div>
      </Card.Header>

      {/* Content */}
      <Card.Content className="flex flex-col gap-4 p-0 pt-6">
        {/* Location + Remote */}
        <div className="flex flex-wrap gap-2">
          {/* Location */}
          <div
            className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-white/[0.06]
          px-3
          py-2
          text-xs
          font-medium
          text-white/80
        "
          >
            <LocationArrow className="h-4 w-4 text-blue-400" />

            <span>
              {job.location.city}, {job.location.country}
            </span>
          </div>

          {/* Remote */}
          {job.location.remote && (
            <div
              className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white/[0.06]
            px-3
            py-2
            text-xs
            font-medium
            text-white/80
          "
            >
              <Globe className="h-4 w-4 text-emerald-400" />

              <span>Remote</span>
            </div>
          )}
        </div>

        {/* Job Type + Salary */}
        <div className="flex flex-wrap gap-2">
          {/* Job Type */}
          <div
            className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-white/[0.06]
          px-3
          py-2
          text-xs
          font-medium
          text-white/80
        "
          >
            <Briefcase className="h-4 w-4 text-violet-400" />

            <span>{job.type}</span>
          </div>

          {/* Salary */}
          <div
            className="
          inline-flex
          items-center
          rounded-full
          bg-white/[0.06]
          px-3
          py-2
          text-xs
          font-medium
          text-white/80
        "
          >
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          </div>
        </div>

        {/* Deadline */}
        <p className="text-xs text-white/35">
          Apply before {job.applicationDeadline}
        </p>
      </Card.Content>

      {/* Footer */}
      <Card.Footer
        className="
      flex
      items-center
      justify-between
      p-0
      pt-7
    "
      >
        {/* Apply Now */}
        <Link
          href={`/jobs/${job._id}`}
          className="
        inline-flex
        items-center
        gap-2
        text-sm
        font-medium
        text-white
        transition-all
        duration-200
        hover:opacity-60
      "
        >
          Apply Now
          <ArrowUpRight
            className="
          h-4
          w-4
          text-amber-400
          transition-transform
          duration-200
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
        "
          />
        </Link>

        {/* Status */}
        <span
          className="
        text-xs
        capitalize
        text-white/30
      "
        >
          {job.status}
        </span>
      </Card.Footer>
    </Card>
  );
}
