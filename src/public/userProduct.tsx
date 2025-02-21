import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/common/navbar";
import { useGetList } from "../private/product/productQuery";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: string;
  image: string;
  type: string;
}

export default function UserProduct() {
  const navigate = useNavigate();
  const { data, isError, error, isLoading } = useGetList();
  const products: Product[] = Array.isArray(data?.data) ? data.data : [];

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedType, setSelectedType] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Function to navigate to the Order Page with product details
  const handleOrder = (product: Product) => {
    navigate("/order", { state: { product } });
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      parseFloat(product.price) >= minPrice &&
      parseFloat(product.price) <= maxPrice &&
      (selectedType ? product.type === selectedType : true)
    );
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Browse Products</h2>
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded-lg px-4 py-2 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaFilter className="text-xl" />
            <span>Filter</span>
          </button>
        </div>

        {showFilter && (
          <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Filter Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Min Price (Rs): <span className="font-bold">{minPrice}</span>
                </label>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max={maxPrice}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  step="100"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Max Price (Rs): <span className="font-bold">{maxPrice}</span>
                </label>
                <input
                  type="range"
                  className="w-full"
                  min={minPrice}
                  max="100000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  step="100"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Product Type
                </label>
                <select
                  className="w-full border px-3 py-2 rounded-lg"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Shoe">Shoes</option>
                  <option value="T-Shirt">T-shirt</option>
                  <option value="CAp">Cap</option>
                  <option value="Scocks">Scocks</option>
                  <option value="Belt">Belt</option>
                  <option value="Wallet">Wallet</option>
                  <option value="Shirt">Shirt</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={`http://localhost:3000/${product.image.replace(
                  "public/",
                  ""
                )}`}
                alt={product.productName}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {product.productName}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-green-600">
                  Rs {product.price}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    onClick={() => handleOrder(product)}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
