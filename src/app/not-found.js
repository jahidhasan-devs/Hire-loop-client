import Link from "next/link";
import { House, ArrowLeft } from "@gravity-ui/icons";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f0f10] px-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-8xl font-bold tracking-tight text-white">404</h1>

        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-white/20" />

        <h2 className="mt-6 text-2xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
          Sorry, the page you are looking for does not exist or may have been
          moved to another location.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            <House className="size-4" />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
