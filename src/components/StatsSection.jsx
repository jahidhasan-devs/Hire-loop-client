import { Card } from "@heroui/react";
import { Briefcase, Building2, Search, Star } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: Briefcase,
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: Building2,
      value: "12K",
      label: "Companies",
    },
    {
      icon: Search,
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: Star,
      value: "97%",
      label: "Satisfication Rate",
    },
  ];

  return (
    <section
      className="
       relative w-full min-h-[650px] bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center py-16 px-4 md:px-8 overflow-hidden"
      style={{ backgroundImage: `url('/images/globe.png')` }}
    >
      {/* Background Gradient & Glow Filter */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90 pointer-events-none" />

      {/* Header Section */}
      <div className="mt-30 relative  z-8 max-w-2xl text-center pt-8">
        <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-slate-200">
          Assisting over{" "}
          <span className="font-semibold text-white drop-shadow-md">
            15,000 job seekers
          </span>
          <br />
          find their dream positions.
        </h2>
      </div>

      {/* Stats Cards Container */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl mt-3">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="group bg-[#090a0f]/80 border border-white/10 hover:border-white/25 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex flex-col justify-between h-36">
                {/* Icon Wrapper */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-white/10">
                  <Icon className="w-5 h-5 text-slate-300 group-hover:text-white stroke-[1.5]" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-4xl font-bold text-white tracking-tight mb-1">
                    {item.value}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                    {item.label}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
