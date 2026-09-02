"use client";

import { useEffect, useState } from "react";

import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextArea,
} from "@heroui/react";

import {
  X,
  MapPin,
  Upload,
  ChevronDown,
  Building2,
  Users,
  Pencil,
  Plus,
} from "lucide-react";

import { createCompany } from "@/lib/actions/companies";

// ======================================================
// INDUSTRY OPTIONS
// ======================================================

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Marketing",
  "Manufacturing",
  "Other",
];

// ======================================================
// EMPLOYEE OPTIONS
// ======================================================

const employeeRanges = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

// ======================================================
// MAIN COMPANY PAGE
// ======================================================

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  console.log("Recruiter:", recruiter);

  const [company, setCompany] = useState(recruiterCompany);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // ====================================================
  // DATABASE → FRONTEND
  // ====================================================

  const fetchCompany = async () => {
    try {
      setLoading(true);

      console.log("Company fetch process is ready.");
    } catch (error) {
      console.error("Fetch company error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // PAGE LOAD
  // ====================================================

  useEffect(() => {
    fetchCompany();
  }, []);

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <p className="text-sm text-gray-400">Loading company...</p>
      </div>
    );
  }

  // ====================================================
  // NO COMPANY REGISTERED
  // ====================================================

  if (!company) {
    return (
      <>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
              <Building2 size={30} className="text-gray-400" />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              No Company Registered
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
              Register your company to start posting jobs and hiring talented
              candidates on HireLoop.
            </p>

            <Button
              onPress={() => setModalOpen(true)}
              className="mt-6 bg-white font-semibold text-black hover:bg-gray-200"
            >
              <Plus size={18} />
              Register Company
            </Button>
          </div>
        </div>

        {/* COMPANY FORM MODAL */}

        <CompanyFormModal
          open={modalOpen}
          setOpen={setModalOpen}
          company={null}
          recruiter={recruiter}
          onSuccess={(newCompany) => {
            console.log("New company:", newCompany);

            setCompany(newCompany);
            setModalOpen(false);
          }}
        />
      </>
    );
  }

  // ====================================================
  // COMPANY EXISTS
  // ====================================================

  return (
    <>
      <div className="w-full space-y-6">
        {/* PAGE HEADER */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">My Company</h1>

            <p className="mt-1 text-sm text-gray-400">
              Manage your company information.
            </p>
          </div>

          <Button
            onPress={() => setModalOpen(true)}
            className="bg-white font-semibold text-black hover:bg-gray-200"
          >
            <Pencil size={16} />
            Edit Company
          </Button>
        </div>

        {/* COMPANY CARD */}

        <div className="w-full rounded-xl border border-[#2d2d2d] bg-[#151515] p-6">
          {/* Company Header */}

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}

              <div className="h-16 w-16 overflow-hidden rounded-xl border border-[#333] bg-[#202020]">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt="Company Logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Building2 size={28} className="text-gray-500" />
                  </div>
                )}
              </div>

              {/* Name */}

              <div>
                <h2 className="text-xl font-semibold text-white">
                  {company.companyName}
                </h2>

                <p className="mt-1 text-sm text-gray-400">{company.industry}</p>
              </div>
            </div>

            {/* Status */}

            <StatusBadge status={company.status} />
          </div>

          {/* COMPANY INFORMATION */}

          <div className="mt-8 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
            <InfoItem
              icon={<Building2 size={18} />}
              label="Industry"
              value={company.industry}
            />

            <InfoItem
              icon={<MapPin size={18} />}
              label="Location"
              value={company.location}
            />

            <InfoItem
              icon={<Users size={18} />}
              label="Employees"
              value={company.employeeCount}
            />
          </div>

          {/* DESCRIPTION */}

          <div className="mt-8 w-full border-t border-[#2d2d2d] pt-6">
            <h3 className="text-sm font-medium text-gray-300">Description</h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {company.description}
            </p>
          </div>

          {/* WEBSITE */}

          {company.website && (
            <div className="mt-6 w-full border-t border-[#2d2d2d] pt-6">
              <h3 className="text-sm font-medium text-gray-300">Website</h3>

              <p className="mt-2 text-sm text-gray-400">{company.website}</p>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}

      <CompanyFormModal
        open={modalOpen}
        setOpen={setModalOpen}
        company={company}
        recruiter={recruiter}
        onSuccess={(updatedCompany) => {
          console.log("Updated company:", updatedCompany);

          setCompany(updatedCompany);
          setModalOpen(false);
        }}
      />
    </>
  );
}

// ======================================================
// COMPANY FORM MODAL
// ======================================================

function CompanyFormModal({ open, setOpen, company, recruiter, onSuccess }) {
  const [formData, setFormData] = useState({
    companyName: company?.companyName || "",
    industry: company?.industry || "Technology",
    website: company?.website || "",
    location: company?.location || "",
    employeeCount: company?.employeeCount || "1-10 employees",
    description: company?.description || "",
    logo: null,
  });

  // ====================================================
  // LOGO PREVIEW
  // ====================================================

  const [logoPreview, setLogoPreview] = useState(company?.logo || null);

  // ====================================================
  // SUBMITTING STATE
  // ====================================================

  const [submitting, setSubmitting] = useState(false);

  // ====================================================
  // FORM DATA RESET
  // ====================================================

  useEffect(() => {
    if (company) {
      setFormData({
        companyName: company.companyName || "",
        industry: company.industry || "Technology",
        website: company.website || "",
        location: company.location || "",
        employeeCount: company.employeeCount || "1-10 employees",
        description: company.description || "",
        logo: null,
      });

      setLogoPreview(company.logo || null);
    } else {
      setFormData({
        companyName: "",
        industry: "Technology",
        website: "",
        location: "",
        employeeCount: "1-10 employees",
        description: "",
        logo: null,
      });

      setLogoPreview(null);
    }
  }, [company, open]);

  // ====================================================
  // INPUT CHANGE
  // ====================================================

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ====================================================
  // LOGO CHANGE
  // ====================================================

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and JPG images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    setFormData((previous) => ({
      ...previous,
      logo: file,
    }));

    const previewUrl = URL.createObjectURL(file);

    setLogoPreview(previewUrl);
  };

  // ====================================================
  // FORM SUBMIT
  // ====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      let logoUrl = company?.logo || null;

      // ==================================================
      // 1. IMAGE UPLOAD
      // ==================================================

      if (formData.logo) {
        const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

        if (!apiKey) {
          alert("Image upload API key is missing");
          return;
        }

        const imageBody = new FormData();

        imageBody.append("image", formData.logo);

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: imageBody,
          },
        );

        const imgbbData = await imgbbRes.json();

        if (imgbbData.success) {
          logoUrl = imgbbData.data.url;

          console.log("Uploaded Image URL:", logoUrl);
        } else {
          throw new Error("Image upload failed");
        }
      }

      // ==================================================
      // 2. FINAL COMPANY DATA
      // ==================================================

      const finalCompanyData = {
        companyName: formData.companyName,
        industry: formData.industry,
        website: formData.website,
        location: formData.location,
        employeeCount: formData.employeeCount,
        description: formData.description,
        logo: logoUrl,
        status: company?.status || "pending",

        // IMPORTANT
        recruiterId: recruiter?.id,
      };

      console.log("Final Submitted Data:", finalCompanyData);

      // ==================================================
      // 3. SEND TO BACKEND
      // ==================================================

      const result = await createCompany(finalCompanyData);

      console.log("Backend Response:", result);

      // ==================================================
      // 4. SUCCESS
      // ==================================================

      alert("Company created successfully!");

      if (onSuccess) {
        onSuccess(finalCompanyData);
      }
    } catch (error) {
      console.error("Company submit error:", error);

      alert("Failed to submit company details.");
    } finally {
      setSubmitting(false);
    }
  };

  // ====================================================
  // UI
  // ====================================================

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={open}
        onOpenChange={setOpen}
        className="bg-black/70 backdrop-blur-sm"
      >
        <Modal.Container size="lg" scroll="inside" className="px-0">
          <Modal.Dialog
            aria-label={company ? "Edit company" : "Register new company"}
            className="w-full border border-[#333] bg-[#111] text-white"
          >
            {/* HEADER */}

            <Modal.Header className="border-b border-[#333] px-6 py-5">
              <div className="flex w-full items-start justify-between">
                <div>
                  <Modal.Heading className="text-xl font-semibold">
                    {company ? "Edit Company" : "Register New Company"}
                  </Modal.Heading>

                  <p className="mt-1 text-sm text-gray-400">
                    {company
                      ? "Update your company information."
                      : "Enter your business details to start hiring on HireLoop."}
                  </p>
                </div>

                <Modal.CloseTrigger>
                  <Button
                    isIconOnly
                    variant="ghost"
                    aria-label="Close"
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </Button>
                </Modal.CloseTrigger>
              </div>
            </Modal.Header>

            {/* BODY */}

            <Modal.Body className="px-6 py-6">
              <form
                id="company-form"
                onSubmit={handleSubmit}
                className="w-full space-y-5"
              >
                {/* COMPANY NAME + INDUSTRY */}

                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-white">Company Name</Label>

                    <Input
                      variant="secondary"
                      value={formData.companyName}
                      onChange={(event) =>
                        handleChange("companyName", event.target.value)
                      }
                      placeholder="e.g. Acme Corp"
                      isRequired
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-white">
                      Industry / Category
                    </Label>

                    <Select
                      value={formData.industry}
                      onChange={(value) => handleChange("industry", value)}
                    >
                      <Select.Trigger>
                        <Select.Value />

                        <Select.Indicator>
                          <ChevronDown size={16} />
                        </Select.Indicator>
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {industries.map((industry) => (
                            <ListBox.Item
                              key={industry}
                              id={industry}
                              textValue={industry}
                            >
                              {industry}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>

                {/* WEBSITE + LOCATION */}

                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-white">Website URL</Label>

                    <Input
                      variant="secondary"
                      value={formData.website}
                      onChange={(event) =>
                        handleChange("website", event.target.value)
                      }
                      placeholder="https://www.company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-white">Location</Label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                      />

                      <Input
                        variant="secondary"
                        value={formData.location}
                        onChange={(event) =>
                          handleChange("location", event.target.value)
                        }
                        placeholder="City, Country"
                        className="pl-11"
                        isRequired
                      />
                    </div>
                  </div>
                </div>

                {/* EMPLOYEE + LOGO */}

                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-white">
                      Employee Count Range
                    </Label>

                    <Select
                      value={formData.employeeCount}
                      onChange={(value) => handleChange("employeeCount", value)}
                    >
                      <Select.Trigger>
                        <Select.Value />

                        <Select.Indicator>
                          <ChevronDown size={16} />
                        </Select.Indicator>
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {employeeRanges.map((range) => (
                            <ListBox.Item
                              key={range}
                              id={range}
                              textValue={range}
                            >
                              {range}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* COMPANY LOGO */}

                  <div className="space-y-2">
                    <Label className="text-sm text-white">Company Logo</Label>

                    <label className="flex cursor-pointer items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#555] bg-[#202020]">
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Upload size={20} className="text-gray-400" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          Upload image
                        </p>

                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </p>
                      </div>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </label>
                  </div>
                </div>

                {/* DESCRIPTION */}

                <div className="w-full space-y-2 md:col-span-2">
                  <Label className="text-sm text-white">
                    Brief Description
                  </Label>

                  <TextArea
                    variant="secondary"
                    value={formData.description}
                    onChange={(event) =>
                      handleChange("description", event.target.value)
                    }
                    placeholder="Tell us about your company's mission and culture..."
                    isRequired
                    className="w-full"
                    rows={4}
                  />
                </div>
              </form>
            </Modal.Body>

            {/* FOOTER */}

            <Modal.Footer className="border-t border-[#333] px-6 py-4">
              <Button variant="secondary" slot="close" className="min-w-[92px]">
                Cancel
              </Button>

              <Button
                type="submit"
                form="company-form"
                isDisabled={submitting}
                className="min-w-[165px] bg-white font-semibold text-black hover:bg-gray-200"
              >
                {submitting
                  ? "Saving..."
                  : company
                    ? "Save Changes"
                    : "Register Company"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

// ======================================================
// INFO ITEM
// ======================================================

function InfoItem({ icon, label, value }) {
  return (
    <div className="rounded-lg border border-[#292929] bg-[#1b1b1b] p-4">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}

        <span className="text-xs uppercase tracking-wide">{label}</span>
      </div>

      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

// ======================================================
// STATUS BADGE
// ======================================================

function StatusBadge({ status }) {
  const styles = {
    pending: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

    approved: "border-green-500/20 bg-green-500/10 text-green-400",

    rejected: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  const currentStatus = status || "pending";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${
        styles[currentStatus] || styles.pending
      }`}
    >
      {currentStatus}
    </span>
  );
}
