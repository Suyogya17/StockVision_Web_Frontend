import { BarChart2, Box, Home, LifeBuoy, ShoppingCart } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";
import { useGetList } from "../../src/private/product/productQuery"; // Fetch products
import Footer from "../pages/common/footer";
import Navbar from "../pages/common/navbar";

export default function DashboardButtons() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetList(); // Fetch products
  const products = Array.isArray(data?.data) ? data.data : []; // Ensure data is in an array

  console.log("Fetched Products: ", products); // Debug log to inspect product data

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

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error fetching products: {error?.message}</div>;

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

        {/* Products Section */}
        {products.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Products Overview
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <div
                  key={product._id} // Ensure correct key property
                  className="bg-gray-50 p-4 rounded-xl shadow-md border"
                >
                  {/* Product Image */}
                  <img
                    src={`http://localhost:3000/${product.image.replace(
                      "public/",
                      ""
                    )}`}
                    alt={product.productName} // Use correct property
                    className="w-full h-60 object-cover rounded-lg"
                  />

                  {/* Product Name */}
                  <h4 className="mt-3 text-lg font-semibold text-gray-800">
                    {product.productName} {/* Use correct property */}
                  </h4>

                  {/* Product Price & Quantity */}
                  <p className="text-gray-600 text-bold mt-1">
                    Price: {product.price} Rs
                  </p>
                  <p className="text-gray-500 text-bold">
                    Quantity Left: {product.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If No Products Available */}
        {products.length === 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              No Products Available
            </h3>
            <p className="text-gray-500">
              There are no products available to display.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
