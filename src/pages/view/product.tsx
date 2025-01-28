import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../common/header";

export default function ProductPage() {
  const [products, setProducts] = useState<
    {
      id: string;
      name: string;
      price: string;
      quantity: number;
      image: string;
      description: string;
    }[]
  >([]);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    price: "",
    quantity: 1,
    image: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: currentProduct.name,
        price: currentProduct.price,
        quantity: currentProduct.quantity,
        image: currentProduct.image,
        description: currentProduct.description,
      },
    ]);
    setCurrentProduct({
      id: "",
      name: "",
      price: "",
      quantity: 1,
      image: "",
      description: "",
    });
  };

  const editProduct = (product: {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image: string;
    description: string;
  }) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const updateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === currentProduct.id ? { ...currentProduct } : product
      )
    );
    setCurrentProduct({
      id: "",
      name: "",
      price: "",
      quantity: 1,
      image: "",
      description: "",
    });
    setIsEditing(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setCurrentProduct({
        ...currentProduct,
        image: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <Navbar />

      <div className="container mx-auto p-6">
        {/* Product Management Section */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Price
              </label>
              <input
                type="number"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter product price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
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
                placeholder="Enter quantity"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
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
              ></textarea>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {currentProduct.image && (
              <img
                src={currentProduct.image}
                alt="Preview"
                className="w-32 h-32 mt-4 object-cover rounded-lg border"
              />
            )}
          </div>

          <button
            onClick={isEditing ? updateProduct : addProduct}
            className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/3 mx-auto mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10"
            placeholder="Search products..."
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Product List */}
        <div className="bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Product List
          </h2>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center">No products available.</p>
          ) : (
            <ul className="space-y-4">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex gap-4 items-center">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
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
                      className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
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
