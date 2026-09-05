"use client";

import Link from "next/link";
import {  Button, Dropdown, Label } from "@heroui/react";
import { Avatar } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user?.image)

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ================= SIGN OUT =================
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setIsMenuOpen(false);
    
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto max-w-7xl px-4">
        {/* ================= NAVBAR ================= */}
        <div className="flex h-20 items-center justify-between">
          {/* ================= LOGO ================= */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/images/logo.png"
              width={154}
              height={44}
              alt="Hiring Loop Logo"
              className="object-contain"
              priority
            />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="font-medium transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/jobs"
              className="font-medium transition hover:text-blue-600"
            >
              Browse Jobs
            </Link>

            <Link
              href="/companies"
              className="font-medium transition hover:text-blue-600"
            >
              Companies
            </Link>

            <Link
              href="/plans"
              className="font-medium transition hover:text-blue-600"
            >
              Pricing
            </Link>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden items-center gap-4 md:flex">
            {!user ? (
              <>
                {/* Login */}
                <Link href="/signin">
                  <Button
                    variant="bordered"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                  >
                    Login
                  </Button>
                </Link>

                {/* Get Started */}
                <Link href="/signup">
                  <Button
                    color="primary"
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 font-medium text-white"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              /* ================= LOGGED USER ================= */
              <Dropdown>
                <Button
                  variant="light"
                  className="flex h-auto items-center gap-3 px-2 py-1"
                >
                  <Avatar>
                    <Avatar.Image alt="John Doe" src={user?.image} />
                    <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                  </Avatar>

                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold">{user?.name}</span>

                    <span className="max-w-[160px] truncate text-xs text-gray-500">
                      {user?.email}
                    </span>
                  </div>
                </Button>

                <Dropdown.Popover>
                  <Dropdown.Menu
                    aria-label="User menu"
                    onAction={(key) => console.log(key)}
                  >
                    <Dropdown.Item
                      id="applications"
                      textValue="My Applications"
                    >
                      <Link href="/applications" className="block w-full">
                        <Label>Browse Jobs</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile">
                      <Link href="/profile" className="block w-full">
                        <Label>Company</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="saved-jobs" textValue="Saved Jobs">
                      <Link href="/saved-jobs" className="block w-full">
                        <Label>Pricing</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      onPress={handleSignOut}
                    >
                      <Label>Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900 md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            {/* User Info */}
            {user && (
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-slate-800">
                <Avatar>
                  <Avatar.Image alt="John Doe" src={user?.image} />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold">{user?.name}</p>

                  <p className="truncate text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Home
              </Link>

              <Link
                href="/jobs"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Browse Jobs
              </Link>

              <Link
                href="/company"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Company
              </Link>

              <Link
                href="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Pricing
              </Link>

              <div className="my-3 h-px bg-gray-200 dark:bg-slate-700" />

              {/* ================= MOBILE AUTH ================= */}

              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="bordered"
                      className="w-full border-blue-500 text-blue-600"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      color="primary"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/applications"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    My Applications
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    Profile
                  </Link>

                  <Link
                    href="/saved-jobs"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    Saved Jobs
                  </Link>

                  <Button
                    color="danger"
                    variant="flat"
                    onPress={handleSignOut}
                    className="mt-2 w-full"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
