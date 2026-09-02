"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Select,
  Label,
  ListBox,
  InputGroup,
  TextField,
  Button,
} from "@heroui/react";

const JobSearchFilter = ({ jobs, onFilter }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [remote, setRemote] = useState("all");

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(jobs.map((job) => job.category).filter(Boolean))];
  }, [jobs]);

  // Get unique job types
  const jobTypes = useMemo(() => {
    return [...new Set(jobs.map((job) => job.type).filter(Boolean))];
  }, [jobs]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        job.title?.toLowerCase().includes(searchText) ||
        job.company?.name?.toLowerCase().includes(searchText) ||
        job.category?.toLowerCase().includes(searchText) ||
        job.location?.city?.toLowerCase().includes(searchText) ||
        job.location?.country?.toLowerCase().includes(searchText);

      const matchesCategory = category === "all" || job.category === category;

      const matchesType = type === "all" || job.type === type;

      const matchesRemote =
        remote === "all" ||
        (remote === "remote" && job.location?.remote === true) ||
        (remote === "onsite" && job.location?.remote === false);

      return matchesSearch && matchesCategory && matchesType && matchesRemote;
    });
  }, [jobs, search, category, type, remote]);

  // Send filtered jobs to parent
  useEffect(() => {
    onFilter(filteredJobs);
  }, [filteredJobs, onFilter]);

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setType("all");
    setRemote("all");
  };

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-[#171719] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        {/* Search */}
        <TextField
          value={search}
          onChange={setSearch}
          className="w-full lg:flex-1"
        >
          <Label className="mb-2 text-sm font-medium text-white">
            Search Jobs
          </Label>

          <InputGroup>
            <InputGroup.Prefix>
              <span className="text-base text-white/40">⌕</span>
            </InputGroup.Prefix>

            <InputGroup.Input placeholder="Search jobs, companies..." />
          </InputGroup>
        </TextField>

        {/* Job Type */}
        <Select
          selectedKey={type}
          onSelectionChange={(key) => setType(key)}
          className="w-full lg:w-48"
        >
          <Label className="mb-2 text-sm font-medium text-white">
            Job Type
          </Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all">
                <Label>All Types</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              {jobTypes.map((item) => (
                <ListBox.Item key={item} id={item}>
                  <Label>{item}</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Category */}
        <Select
          selectedKey={category}
          onSelectionChange={(key) => setCategory(key)}
          className="w-full lg:w-48"
        >
          <Label className="mb-2 text-sm font-medium text-white">
            Category
          </Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all">
                <Label>All Categories</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              {categories.map((item) => (
                <ListBox.Item key={item} id={item}>
                  <Label>{item}</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Work Mode */}
        <Select
          selectedKey={remote}
          onSelectionChange={(key) => setRemote(key)}
          className="w-full lg:w-44"
        >
          <Label className="mb-2 text-sm font-medium text-white">
            Work Mode
          </Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all">
                <Label>All</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="remote">
                <Label>Remote</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="onsite">
                <Label>On-site</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Clear */}
        <Button
          onPress={clearFilters}
          variant="secondary"
          className="h-10 rounded-xl px-5 lg:mb-0"
        >
          Clear
        </Button>
      </div>

      {/* Result count */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="text-xs text-white/40">
          Showing{" "}
          <span className="font-medium text-white/70">
            {filteredJobs.length}
          </span>{" "}
          {filteredJobs.length === 1 ? "job" : "jobs"}
        </p>
      </div>
    </div>
  );
};

export default JobSearchFilter;
