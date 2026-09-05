"use client";

import React, { useState } from "react";
import { Card } from "@heroui/react";

const seekerPlans = [
  {
    name: "Free",
    id: "seeker_free",
    price: "$0",
    period: "/forever",
    description: "Perfect for getting started with your job search.",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
    button: "Get Started",
    icon: "🚀",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    name: "Pro",
    id: "seeker_pro",
    price: "$19",
    period: "/month",
    description: "For active job seekers who want more opportunities.",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    button: "Choose Pro",
    popular: true,
    icon: "⚡",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    name: "Premium",
    id: "seeker_premium",
    price: "$39",
    period: "/month",
    description: "Maximum visibility and unlimited applications.",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
    button: "Choose Premium",
    icon: "👑",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id: "recruiter_free",
    price: "$0",
    period: "/forever",
    description: "A simple way to start hiring with HireLoop.",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Great for a company's first year of hiring",
    ],
    button: "Get Started",
    icon: "🌱",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    name: "Growth",
    id: "recruiter_growth",
    price: "$49",
    period: "/month",
    description: "Powerful hiring tools for growing companies.",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    button: "Choose Growth",
    popular: true,
    icon: "📈",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
  {
    name: "Enterprise",
    id: "recruiter_enterprise",
    price: "$149",
    period: "/month",
    description: "Advanced tools for large recruitment teams.",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
    button: "Choose Enterprise",
    icon: "💎",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-400",
  },
];

const faqs = [
  {
    question: "Can I cancel my plan anytime?",
    answer:
      "Yes. You can cancel your subscription at any time. Your current plan will remain active until the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "If you are eligible for a refund, our support team can review your request according to our refund policy.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "You can pay using the supported credit and debit card payment methods available at checkout.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. You can upgrade or downgrade your plan whenever you need.",
  },
  {
    question: "What happens when I downgrade?",
    answer:
      "Your account will move to the new plan while keeping your existing account and application data.",
  },
];

export default function PricingPage() {
  const [userType, setUserType] = useState("seeker");

  const plans = userType === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="absolute right-0 top-[500px] h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* ================= HERO ================= */}
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Small Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Simple & transparent pricing
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Plans that grow with
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              your career
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Whether you're looking for your next opportunity or building your
            dream team, HireLoop has a plan designed for you.
          </p>

          {/* ================= TOGGLE ================= */}
          <div className="mx-auto mt-9 flex w-fit rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <button
              onClick={() => setUserType("seeker")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                userType === "seeker"
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              👤 For Job Seekers
            </button>

            <button
              onClick={() => setUserType("recruiter")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                userType === "recruiter"
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🏢 For Recruiters
            </button>
          </div>
        </div>
      </section>

      {/* ================= PRICING CARDS ================= */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`group relative overflow-hidden border bg-[#0d0d0f] text-white transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "border-violet-500/50 shadow-2xl shadow-violet-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* Popular Gradient Line */}
              {plan.popular && (
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500" />
              )}

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute right-5 top-5 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                  ✦ Most Popular
                </div>
              )}

              <Card.Header className="px-7 pb-0 pt-7">
                {/* Plan Icon */}
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-xl ${plan.iconBg} ${plan.iconColor} border border-white/5`}
                >
                  {plan.icon}
                </div>

                <Card.Title className="text-2xl font-bold text-white">
                  {plan.name}
                </Card.Title>

                <Card.Description className="mt-2 min-h-[48px] text-sm leading-6 text-gray-400">
                  {plan.description}
                </Card.Description>
              </Card.Header>

              <Card.Content className="px-7 pt-6">
                {/* Price */}
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-white">
                    {plan.price}
                  </span>

                  <span className="mb-1 text-sm text-gray-500">
                    {plan.period}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-white/10" />

                <p className="mb-5 text-sm font-semibold text-gray-200">
                  What's included
                </p>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-5 text-gray-400"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          index % 3 === 0
                            ? "bg-emerald-500/10 text-emerald-400"
                            : index % 3 === 1
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-violet-500/10 text-violet-400"
                        }`}
                      >
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card.Content>

              <Card.Footer className=" mt-auto px-7 pb-7 pt-7">
                <form className=" w-full " action="/api/checkout_sessions" method="POST">
                 <input type='hidden' name='plan_id' value={plan.id}></input>
                  <section>
                    <button
                      className={ `w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-white text-black hover:bg-gray-200"
                          : "border border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.08]"
                      }`}
                    >
                      {plan.button}
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </section>
                </form>

                
              </Card.Footer>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-t border-white/10 bg-[#080808] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
              Support
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Frequently asked questions
            </h2>

            <p className="mt-4 text-gray-400">
              Everything you need to know about HireLoop pricing.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-white/20"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-white">
                  <span>{faq.question}</span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg text-gray-400 transition-all duration-300 group-open:rotate-45 group-open:bg-violet-500/10 group-open:text-violet-400">
                    +
                  </span>
                </summary>

                <div className="px-6 pb-5">
                  <p className="text-sm leading-7 text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden px-6 py-24">
        {/* CTA Glow */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-2xl">
            ✨
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Choose the plan that fits your goals and take the next step with
            HireLoop.
          </p>

          <button className="mt-8 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-black shadow-xl shadow-white/5 transition-all hover:bg-gray-200 hover:shadow-white/10">
            Get Started
            <span className="ml-2">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}