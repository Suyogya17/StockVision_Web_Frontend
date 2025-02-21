import { BarChart2, Box, Home, LifeBuoy, ShoppingCart } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";
import Footer from "../pages/common/footer";
import Navbar from "../pages/common/navbar";

export default function DashboardButtons() {
  const navigate = useNavigate();

  const buttons = [
    {
      title: "Overview",
      description: "Quick summary of your platform's performance.",
      path: "/overview",
      icon: <Home className="w-8 h-8 text-gray-800" />,
    },
    {
      title: "Product",
      description: "All products in the store.",
      path: "/product",
      icon: <Box className="w-8 h-8 text-gray-800" />,
    },
    {
      title: "Orders",
      description: "New orders placed today.",
      path: "/orderhistory",
      icon: <ShoppingCart className="w-8 h-8 text-gray-800" />,
    },
    {
      title: "Analytics",
      description: "Key metrics and analytics overview.",
      path: "/analytics",
      icon: <BarChart2 className="w-8 h-8 text-gray-800" />,
    },
    {
      title: "Support",
      description: "Tickets and inquiries.",
      path: "/support",
      icon: <LifeBuoy className="w-8 h-8 text-gray-800" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {buttons.map((button, index) => (
            <div
              key={index}
              onClick={() => navigate(button.path)}
              className="w-full h-72 cursor-pointer bg-white p-6 rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Icon and Title */}
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-gray-200 p-3 rounded-full">
                  {button.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {button.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600">{button.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
