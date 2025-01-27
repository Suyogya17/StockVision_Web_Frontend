import { useState } from "react";
import Navbar from "../common/header"; // Assuming Navbar is in a separate file.

export default function OrderPage() {
  // Sample products (this would come from your product list in a real app)
  const availableProducts = [
    { id: "1", name: "Product 1", price: 25, image: "/images/product1.jpg" },
    { id: "2", name: "Product 2", price: 35, image: "/images/product2.jpg" },
    { id: "3", name: "Product 3", price: 15, image: "/images/product3.jpg" },
  ];

  // Sample location (this could be dynamically fetched based on user input or their profile)
  const customerLocation = "1234 Elm Street, Springfield, USA";

  // States for order management
  const [order, setOrder] = useState<
    {
      id: string;
      productId: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
      date: string;
      time: string;
      location: string;
    }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("1");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  // Add product to the order
  const addToOrder = () => {
    const product = availableProducts.find((p) => p.id === selectedProduct);
    if (product) {
      const date = new Date();
      const formattedDate = date.toLocaleDateString(); // Get current date
      const formattedTime = date.toLocaleTimeString(); // Get current time
      setOrder([
        ...order,
        {
          id: Date.now().toString(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: selectedQuantity,
          image: product.image,
          date: formattedDate,
          time: formattedTime,
          location: customerLocation,
        },
      ]);
    }
  };

  // Remove item from the order
  const removeFromOrder = (id: string) => {
    setOrder(order.filter((item) => item.id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Order Section */}
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Create Order</h2>

          {/* Product Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Product:
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {availableProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity:
            </label>
            <input
              type="number"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              min="1"
            />
          </div>

          {/* Add to Order Button */}
          <button
            onClick={addToOrder}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add to Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          {order.length === 0 ? (
            <p className="text-gray-500">No items in the order yet.</p>
          ) : (
            <ul>
              {order.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center mb-4 p-4 border rounded-lg hover:bg-gray-50"
                >
                  {/* Product Info */}
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Product ID: {item.productId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">Date: {item.date}</p>
                      <p className="text-sm text-gray-500">Time: {item.time}</p>
                      <p className="text-sm text-gray-500">
                        Location: {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => removeFromOrder(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Total Price */}
          <div className="mt-6 flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
