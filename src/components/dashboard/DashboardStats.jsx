import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.type}
          type={stat.type}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
