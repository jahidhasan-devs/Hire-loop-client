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

const JobSearchFilter = ({ jobs, onFilter, initialValues }) => {
  const [search, setSearch] = useState(initialValues?.search || "");

  const [category, setCategory] = useState(initialValues?.category || "all");

  const [type, setType] = useState(initialValues?.type || "all");

  const [remote, setRemote] = useState(initialValues?.remote || "all");

  // Sync filter state with URL
  useEffect(() => {
    setSearch(initialValues?.search || "");
    setCategory(initialValues?.category || "all");
    setType(initialValues?.type || "all");
    setRemote(initialValues?.remote || "all");
  }, [initialValues]);

  // Unique categories
  const categories = useMemo(() => {
    return [...new Set(jobs.map((job) => job.category).filter(Boolean))];
  }, [jobs]);

  // Unique job types
  const jobTypes = useMemo(() => {
    return [...new Set(jobs.map((job) => job.type).filter(Boolean))];
  }, [jobs]);

  // Send filter values to parent
  useEffect(() => {
    onFilter({
      search,
      category,
      type,
      remote,
    });
  }, [search, category, type, remote, onFilter]);

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

      {/* Result info */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="text-xs text-white/40">
          Search and filter jobs using the options above.
        </p>
      </div>
    </div>
  );
};

export default JobSearchFilter;
