
  
 function Overview() {
  const stats = [
    { title: "Total Users", value: "1,250", color: "bg-blue-500" },
    { title: "Total Orders", value: "5,320", color: "bg-green-500" },
    { title: "Revenue", value: "$152,400", color: "bg-yellow-500" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 ${stat.color} text-white rounded-lg shadow-md`}
          >
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Overview;
