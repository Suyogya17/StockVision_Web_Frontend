import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../common/header"; // Assuming Navbar is in a separate file.

export default function ProductPage() {
  // States for product management
  const [products, setProducts] = useState<
    {
      id: string;
      name: string;
      price: string;
      quantity: number;
      image: string;
      description: string; // New description field
    }[]
  >([]);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    price: "",
    quantity: 1, // Default quantity is set to 1, but it can be changed by the user
    image: "",
    description: "", // New description field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Add new product
  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: currentProduct.name,
        price: currentProduct.price,
        quantity: currentProduct.quantity,
        image: currentProduct.image,
        description: currentProduct.description, // Save description
      },
    ]);
    setCurrentProduct({
      id: "",
      name: "",
      price: "",
      quantity: 1,
      image: "",
      description: "", // Reset description field after adding product
    });
  };

  // Edit existing product
  const editProduct = (product: {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image: string;
    description: string; // Include description
  }) => {
    setCurrentProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
      description: product.description, // Set description for editing
    });
    setIsEditing(true);
  };

  // Update edited product
  const updateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === currentProduct.id
          ? {
              ...product,
              name: currentProduct.name,
              price: currentProduct.price,
              quantity: currentProduct.quantity,
              image: currentProduct.image,
              description: currentProduct.description, // Update description
            }
          : product
      )
    );
    setCurrentProduct({
      id: "",
      name: "",
      price: "",
      quantity: 1,
      image: "",
      description: "", // Reset description after update
    });
    setIsEditing(false);
  };

  // Delete product
  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Filter products by name
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setCurrentProduct({
        ...currentProduct,
        image: URL.createObjectURL(file), // Create a URL for the image file
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Product Management Section */}
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name:
            </label>
            <input
              type="text"
              value={currentProduct.name}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Price:
            </label>
            <input
              type="number"
              value={currentProduct.price}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, price: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Quantity:
            </label>
            <input
              type="number"
              value={currentProduct.quantity}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  quantity: +e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product quantity"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description:
            </label>
            <textarea
              value={currentProduct.description}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {currentProduct.image && (
              <div className="mt-4">
                <img
                  src={currentProduct.image}
                  alt="Product"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <button
            onClick={isEditing ? updateProduct : addProduct}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10"
              placeholder="Search products..."
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Product List</h2>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
          ) : (
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center mb-4 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex gap-4">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">${product.price}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {product.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editProduct(product)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
