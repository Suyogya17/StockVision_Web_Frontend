import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetReportOrders } from "../../private/order/orderQuery";
import { useGetList } from "../../private/product/productQuery";
import { useGetUser } from "../../public/query";

// Define interfaces for the chart data
interface ChartData {
  name: string;
  count: number;
}

interface OrderStatusData {
  name: string;
  value: number;
}

// Define the Order interface
interface Order {
  status: string;
  id: string;
  date: string;
  totalPrice: number;
}

export default function Report() {
  const { data: orders, isLoading: ordersLoading } = useGetReportOrders();
  const { data: users, isLoading: usersLoading } = useGetList();
  const { data: products, isLoading: productsLoading } = useGetUser();

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[]>([]);

  // Colors for the bar and pie charts
  const barColors = {
    Orders: "#4F46E5", // Indigo
    Users: "#16A34A", // Green
    Products: "#FACC15", // Yellow
  };

  const pieColors = ["#4CAF50", "#FF9800", "#F44336", "#3F51B5"];

  useEffect(() => {
    if (ordersLoading || usersLoading || productsLoading) {
      console.log("Loading data...");
      return;
    }
  
    console.log("Raw Orders Data:", orders);
    console.log("Raw Users Data:", users);
    console.log("Raw Products Data:", products);
  
    // Check if the necessary data exists and handle both cases for users and products
    const ordersData = Array.isArray(orders?.data) ? orders.data : [];
    const usersData = Array.isArray(users?.data) ? users.data : users;  // Handle case if users is already an array
    const productsData = Array.isArray(products?.data) ? products.data : products;  // Handle case if products is already an array
  
    if (!ordersData || !usersData || !productsData) {
      console.error("Data missing: Orders, Users, or Products are empty or not in the correct format.");
      return;
    }
  
    // Proceed with setting the chart data
    setChartData([
      { name: "Orders", count: ordersData.length },
      { name: "Users", count: usersData.length },
      { name: "Products", count: productsData.length },
    ]);
  
    // Set order status data
    const statusCount: Record<string, number> = {};
    ordersData.forEach((order: Order) => {
      statusCount[order.status] = (statusCount[order.status] || 0) + 1;
    });
  
    setOrderStatusData(
      Object.keys(statusCount).map((status) => ({
        name: status,
        value: statusCount[status],
      }))
    );
  }, [orders, users, products, ordersLoading, usersLoading, productsLoading]);
  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Report Summary
      </h2>

      {/* Bar Chart for Overall Counts */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
          Total Users, Orders, and Products
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={barColors[entry.name as keyof typeof barColors]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Order Status */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
          Order Status Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {orderStatusData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
