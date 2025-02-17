import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import { usePlaceOrder } from "../private/order/orderQuery";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: string;
  image: string;
  stock: number;
}

interface OrderPayload {
  customer: string;
  products: { product: string; quantity: number }[];
  totalPrice: number;
  shippingAddress: string;
  status: string;
  paymentStatus: string;
  orderDate: string;
}

export default function OrderPage() {
  const location = useLocation();
  const selectedProduct = location.state?.product as Product | null;
  const placeOrderMutation = usePlaceOrder();
  const navigate = useNavigate(); // Initialize navigate hook

  const [shippingAddress, setShippingAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const customerId = "user123"; // Replace with actual logged-in user ID

  // Get current date to display as order date
  const currentDate = new Date().toLocaleDateString(); // Current date in "MM/DD/YYYY" format

  // Calculate the total price based on the quantity
  const totalPrice = Number(selectedProduct?.price) * quantity;

  const handleOrder = () => {
    if (!selectedProduct || !shippingAddress) {
      toast.error("Please fill all fields.");
      return;
    }

    if (quantity > selectedProduct.stock) {
      toast.error(`Only ${selectedProduct.stock} units are available.`);
      return;
    }

    const orderData: OrderPayload = {
      customer: customerId,
      products: [{ product: selectedProduct._id, quantity }],
      totalPrice,
      shippingAddress,
      status: "pending",
      paymentStatus: "pending",
      orderDate: currentDate,
    };

    console.log("Sending Order Data:", orderData); // Debugging before sending request

    placeOrderMutation.mutate(orderData, {
      onSuccess: () => {
        toast.success("Order placed successfully!");
        setShippingAddress("");
        setQuantity(1);
      },
      onError: (error: any) => {
        console.error("Order Placement Error:", error); // Log full error
        toast.error(error.message || "Failed to place order.");
      },
    });
  };

  const handleBack = () => {
    navigate("/product"); // Navigate to the product page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Place an Order</h1>
      {selectedProduct && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          {/* Product Image */}
          <img
            src={`http://localhost:3000/${selectedProduct.image.replace(
              "public/",
              ""
            )}`}
            alt={selectedProduct.productName}
            className="w-full h-64 object-cover rounded-md mb-4"
          />

          {/* Product Name */}
          <h2 className="text-xl font-semibold mb-2">
            {selectedProduct.productName}
          </h2>

          {/* Product Description */}
          <p className="text-gray-600 mb-2">{selectedProduct.description}</p>

          {/* Product Price */}
          <p className="text-green-600 font-bold text-lg mb-4">
            Rs {selectedProduct.price}
          </p>

          {/* Quantity Input */}
          <div className="flex items-center gap-4 mb-4">
            <label className="text-gray-700">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="border p-2 w-20 rounded-md"
              min={1}
            />
          </div>

          {/* Display Total Price */}
          <p className="text-lg font-semibold text-gray-700">
            Total Price: Rs {totalPrice}
          </p>

          {/* Shipping Address Input */}
          <input
            type="text"
            className="border p-2 w-full rounded-md mt-4"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter shipping address"
          />

          {/* Order Date */}
          <p className="text-sm text-gray-500 mt-4">
            Order Date: {currentDate}
          </p>

          {/* Place Order Button */}
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4  rounded-lg w-1/2"
            onClick={handleOrder}
          >
            Place Order
          </button>

          {/* Back Button */}
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-1/2"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
