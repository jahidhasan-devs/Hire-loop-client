"use client";

import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
          <ShieldX className="h-10 w-10 text-danger" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-danger">
          403 Error
        </p>

        <h1 className="mt-3 text-4xl font-bold">Unauthorized Access</h1>

        <p className="mt-4 text-default-500 leading-7">
          You don't have permission to access this page.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button
            color="primary"
            startContent={<Home size={18} />}
            onPress={() => router.push("/")}
          >
            Go Home
          </Button>

          <Button
            variant="bordered"
            startContent={<ArrowLeft size={18} />}
            onPress={() => router.push("/signin")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </main>
  );
}
