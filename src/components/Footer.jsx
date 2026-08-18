"use client";

import { Link } from "@heroui/react";
import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";
import Image from "next/image";



const Footer = () => {
  return (
    <footer className="w-full bg-black text-white ">
      <div className="mx-auto max-w-[1650px] px-6 py-14 md:px-10 lg:px-16">
        {/* ================= TOP FOOTER ================= */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* ================= BRAND ================= */}
          <div className="flex flex-col">
            {/* Logo */}
            <Link href="/" className="w-fit no-underline">
              <Image src="/images/logo.png"
                       alt="logo image"
                       width={154}
                       height={44}
                       ></Image>
            </Link>

            {/* Description */}
            <p className="mt-10 max-w-[370px] text-[17px] leading-9 text-[#555555]">
              The AI-native career platform. Built for
              <br className="hidden md:block" />
              people who take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="mt-auto flex items-center gap-3 pt-12">
              {/* Facebook */}
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-[52px] w-[52px] items-center justify-center rounded-[11px] bg-[#101010] text-[#777777] no-underline transition-all duration-200 hover:bg-[#1877f2] hover:text-white"
              >
                <LogoFacebook className="h-6 w-6" />
              </Link>

              {/* Pinterest */}
              <Link
                href="#"
                aria-label="Pinterest"
                className="flex h-[52px] w-[52px] items-center justify-center rounded-[11px] bg-[#101010] text-[#777777] no-underline transition-all duration-200 hover:bg-[#5d4df5] hover:text-white"
              >
                <LogoGithub className="h-6 w-6" />
              </Link>

              {/* LinkedIn */}
              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-[52px] w-[52px] items-center justify-center rounded-[11px] bg-[#101010] text-[#777777] no-underline transition-all duration-200 hover:bg-[#0a66c2] hover:text-white"
              >
                <LogoLinkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* ================= PRODUCT ================= */}
          <div>
            <h3 className="text-[20px] font-medium text-[#5145a8]">Product</h3>

            <div className="mt-8 flex flex-col gap-5">
              <Link
                href="/jobs"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Job discovery
              </Link>

              <Link
                href="/worker-ai"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Worker AI
              </Link>

              <Link
                href="/companies"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Companies
              </Link>

              <Link
                href="/salary"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Salary data
              </Link>
            </div>
          </div>

          {/* ================= NAVIGATIONS ================= */}
          <div>
            <h3 className="text-[20px] font-medium text-[#5145a8]">
              Navigations
            </h3>

            <div className="mt-8 flex flex-col gap-5">
              <Link
                href="/help"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Help center
              </Link>

              <Link
                href="/career-library"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Career library
              </Link>

              <Link
                href="/contact"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* ================= RESOURCES ================= */}
          <div>
            <h3 className="text-[20px] font-medium text-[#5145a8]">
              Resources
            </h3>

            <div className="mt-8 flex flex-col gap-5">
              <Link
                href="/brand-guideline"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Brand Guideline
              </Link>

              <Link
                href="/newsroom"
                className="text-[17px] text-[#555555] no-underline transition-colors hover:text-white"
              >
                Newsroom
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM FOOTER ================= */}
        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-white/5 pt-7 md:flex-row md:items-center">
          {/* Copyright */}
          <p className="m-0 text-[16px] text-[#555555]">
            Copyright {new Date().getFullYear()} — Hiring Loop
          </p>

          {/* Policies */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/terms"
              className="text-[16px] text-[#555555] no-underline transition-colors hover:text-white"
            >
              Terms & Policy
            </Link>

            <Link
              href="/privacy"
              className="text-[16px] text-[#555555] no-underline transition-colors hover:text-white"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
