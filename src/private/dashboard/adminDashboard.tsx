import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../pages/common/adminnavbar";
import Footer from "../../pages/common/footer";
import { useGetList } from "../../private/product/productQuery"; // Fetch products

export default function DashboardButtons() {
  const navigate = useNavigate();
  const { data: products, isLoading: productsLoading } = useGetList();

  // Debugging the products data
  console.log("Products data:", products);

  const buttons = [
    {
      title: "Overview",
      description: "Quick summary of your platform's performance.",
      path: "/overview",
    },
    {
      title: "Products",
      description: "All products in the store.",
      path: "/admin/product",
    },
    {
      title: "Orders",
      description: "New orders placed today.",
      path: "/admin/order",
    },
    {
      title: "Analytics",
      description: "Key metrics and analytics overview.",
      path: "/admin/report",
    },
    {
      title: "Support",
      description: "Tickets and inquiries.",
      path: "/support",
    },
  ];

  // Ensure products is an array
  const productList = Array.isArray(products?.data) ? products.data : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <AdminNavBar />

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
                <div className="mr-4 bg-gray-200 p-3 rounded-full"></div>
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
        {!productsLoading && productList.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Products Overview</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {productList.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-gray-50 p-4 rounded-xl shadow-md border"
                >
                  {/* Product Image */}
                  <img
                    src={`https://localhost:3000/${product.image.replace(
                      "public/",
                      ""
                    )}`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  
                  {/* Product Name */}
                  <h4 className="mt-3 text-lg font-semibold text-gray-800">
                    {product.name}
                  </h4>

                  {/* Product Price & Quantity */}
                  <p className="text-gray-600 text-bold mt-1">Price: {product.price} Rs</p>
                  <p className="text-gray-500 text-bold">Quantity Left: {product.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If No Products Available */}
        {!productsLoading && productList.length === 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">No Products Available</h3>
            <p className="text-gray-500">There are no products available to display.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
