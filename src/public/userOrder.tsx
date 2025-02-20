import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePlaceOrder } from "../private/order/orderQuery";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product as Product | null;

  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const placeOrderMutation = usePlaceOrder();

  if (!product) {
    toast.error("No product selected!");
    navigate("/product");
    return null;
  }

  const totalPrice = product.price * quantity;

  const handleOrder = () => {
    if (!isConfirmationOpen) {
      setIsConfirmationOpen(true);
      return;
    }

    if (!shippingAddress) {
      toast.error("Please enter a shipping address.");
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} units are available.`);
      return;
    }

    const token = localStorage.getItem("token");
    const customerId = token
      ? JSON.parse(atob(token.split(".")[1])).userId
      : null;

    if (!customerId) {
      toast.error("User not authenticated.");
      return;
    }

    const orderData = {
      customer: customerId,
      products: [
        {
          product: product._id,
          quantity: String(quantity),
          price: String(product.price),
        },
      ],
      shippingAddress,
      status: "pending",
      paymentStatus: "pending",
      totalPrice: String(totalPrice),
    };

    placeOrderMutation.mutate(orderData, {
      onSuccess: () => {
        toast.success("Order placed successfully! 🎉");
        setShippingAddress("");
        setQuantity(1);
        navigate("/product"); // Navigate back to the products page after order confirmation
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to place order.");
      },
    });

    setIsConfirmationOpen(false);
  };

  return (
    <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-lg mx-auto mt-10 sm:mt-16">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Place Your Order
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img
          src={`http://localhost:3000/${product.image.replace("public/", "")}`}
          alt="Product"
          className="w-48 h-48 object-cover rounded-lg border-4 border-gray-200 shadow-lg"
        />
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-medium text-gray-800">
            {product.productName}
          </h3>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-lg font-bold text-green-600">Rs {product.price}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 border-2 border-gray-200 rounded-xl shadow-sm">
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Total Price
          </label>
          <p className="text-lg font-bold text-green-700">Rs {totalPrice}</p>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Shipping Address
          </label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your shipping address"
          />
        </div>

        {isConfirmationOpen ? (
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl">
            <p className="text-lg font-semibold">Confirm Your Order Details</p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
            <p>
              <strong>Total Price:</strong> Rs {totalPrice}
            </p>
            <p>
              <strong>Shipping Address:</strong> {shippingAddress}
            </p>
            <button
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={handleOrder}
              disabled={placeOrderMutation.isPending}
            >
              {placeOrderMutation.isPending
                ? "Processing..."
                : "Confirm and Place Order"}
            </button>
          </div>
        ) : (
          <button
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleOrder}
            disabled={placeOrderMutation.isPending}
          >
            {placeOrderMutation.isPending ? "Processing..." : "Place Order"}
          </button>
        )}
      </div>
    </div>
  );
}
