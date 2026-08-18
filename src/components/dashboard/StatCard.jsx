import { FileText, Users, BriefcaseBusiness, CircleCheck } from "lucide-react";

const iconMap = {
  jobs: FileText,
  applicants: Users,
  active: BriefcaseBusiness,
  closed: CircleCheck,
};

const StatCard = ({ type, title, value }) => {
  const Icon = iconMap[type] || FileText;

  return (
    <div className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-3.5">
      {/* Icon */}
      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded bg-zinc-800 text-zinc-300">
        <Icon size={14} strokeWidth={1.8} />
      </div>

      {/* Title */}
      <p className="text-[9px] font-normal text-zinc-400">{title}</p>

      {/* Value */}
      <p className="mt-1 text-sm font-medium text-zinc-100">{value}</p>
    </div>
  );
};

export default StatCard;
