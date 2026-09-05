
import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stribe";
import { createSubscription } from "@/lib/actions/subscription";


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/plans");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId:metadata.planId
    };

// update the user table  about the new plan
  const result = await createSubscription(subsInfo);
  console.log(result);
   

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-16 text-white">
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        <section className="relative w-full max-w-lg">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            
            {/* Success Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white shadow-lg shadow-emerald-500/30">
                ✓
              </div>
            </div>

            {/* Heading */}
            <div className="mb-3">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                Payment Successful
              </span>

              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome to HireLoop! 🎉
              </h1>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
              Thank you for upgrading your plan. Your subscription has been
              successfully activated.
            </p>

            {/* Email Card */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Confirmation sent to
              </p>

              <p className="mt-1 break-all text-sm font-medium text-white">
                {customerEmail}
              </p>
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              Your payment has been confirmed
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="flex-1 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-200"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/plans"
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
              >
                View Plans
              </Link>
            </div>

            {/* Support */}
            <p className="mt-7 text-xs leading-5 text-zinc-500">
              Need help?{" "}
              <a
                href="mailto:orders@example.com"
                className="text-zinc-300 transition hover:text-white"
              >
                Contact support
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} HireLoop. All rights reserved.
          </p>
        </section>
      </main>
    );
  }

  return redirect("/plans");
}

