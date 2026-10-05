"use client";

import { Pagination } from "@heroui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import JobCard from "./JobCard";
import JobSearchFilter from "./JobSearchFilter";

const ITEMS_PER_PAGE = 9;

const JobsContent = ({ jobs }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get values from URL
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const type = searchParams.get("type") || "all";
  const remote = searchParams.get("remote") || "all";
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(pageFromUrl);

  // Sync page with URL
  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return jobs.filter((job) => {
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

  // Total pages
  const totalItems = filteredJobs.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Update URL
  const updateUrl = useCallback(
    ({
      search: newSearch = search,
      category: newCategory = category,
      type: newType = type,
      remote: newRemote = remote,
      page: newPage = 1,
    } = {}) => {
      const params = new URLSearchParams();

      if (newSearch.trim()) {
        params.set("search", newSearch.trim());
      }

      if (newCategory !== "all") {
        params.set("category", newCategory);
      }

      if (newType !== "all") {
        params.set("type", newType);
      }

      if (newRemote !== "all") {
        params.set("remote", newRemote);
      }

      if (newPage > 1) {
        params.set("page", newPage.toString());
      }

      const queryString = params.toString();

      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl, {
        scroll: false,
      });
    },
    [pathname, router, search, category, type, remote],
  );

  // Keep page valid
  useEffect(() => {
    if (page > totalPages) {
      updateUrl({
        page: totalPages,
      });
    }
  }, [page, totalPages, updateUrl]);

  // Current page jobs
  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, page]);

  // Receive filters from JobSearchFilter
  const handleFilter = useCallback(
    (filters) => {
      updateUrl({
        search: filters.search,
        category: filters.category,
        type: filters.type,
        remote: filters.remote,
        page: 1,
      });
    },
    [updateUrl],
  );

  // Change page
  const handlePageChange = (newPage) => {
    setPage(newPage);

    updateUrl({
      page: newPage,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Page numbers
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis-start");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis-end");
    }

    pages.push(totalPages);

    return pages;
  };

  // Result summary
  const startItem = totalItems === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(page * ITEMS_PER_PAGE, totalItems);

  return (
    <>
      <JobSearchFilter
        jobs={jobs}
        onFilter={handleFilter}
        initialValues={{
          search,
          category,
          type,
          remote,
        }}
      />

      {paginatedJobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination className="w-full">
                <Pagination.Summary>
                  Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>

                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => handlePageChange(page - 1)}
                    >
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>

                  {getPageNumbers().map((p) =>
                    typeof p === "string" ? (
                      <Pagination.Item key={p}>
                        <Pagination.Ellipsis />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p === page}
                          onPress={() => handlePageChange(p)}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ),
                  )}

                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() => handlePageChange(page + 1)}
                    >
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#171719] py-16 text-center">
          <h3 className="text-xl font-medium text-white">No jobs found</h3>

          <p className="mt-2 text-sm text-white/40">
            Try changing your search or filter options.
          </p>
        </div>
      )}
    </>
  );
};

export default JobsContent;
