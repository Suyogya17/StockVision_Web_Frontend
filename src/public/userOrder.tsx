// ✅ OrderPage.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product as Product | null;

  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [quantityError, setQuantityError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!product) {
      toast.error("No product selected!");
      navigate("/product");
    }
  }, [product, navigate]);

  if (!product) return null;

  const totalPrice = product.price * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity < 1) {
      setQuantity(1);
      setQuantityError("");
    } else if (newQuantity > product.quantity) {
      setQuantity(product.quantity);
      setQuantityError(`You cannot order more than ${product.quantity} units.`);
    } else {
      setQuantity(newQuantity);
      setQuantityError("");
    }
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleKhaltiPayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (!shippingAddress.trim()) {
      toast.error("Please enter a shipping address.");
      setIsProcessing(false);
      return;
    }

    if (quantity > product.quantity) {
      toast.error(`Only ${product.quantity} units available.`);
      setIsProcessing(false);
      return;
    }

    const token = localStorage.getItem("token");
    const customerId = token ? parseJwt(token)?.id : null;
    if (!customerId) {
      toast.error("User not authenticated.");
      setIsProcessing(false);
      return;
    }

    const rawAmount = product.price * quantity;
    const adjustedAmount = Math.max(10, Math.min(1000, rawAmount));

    const orderBody = {
      products: [{ product: product._id, quantity }],
      totalPrice: rawAmount,
      shippingAddress,
      payment: { method: "khalti" },
    };

    try {
      const saveOrderRes = await fetch(
        "https://localhost:3000/api/order/createOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderBody),
        }
      );

      const savedOrder = await saveOrderRes.json();
      if (!saveOrderRes.ok)
        throw new Error(savedOrder.message || "Order saving failed");

      const savedOrderId = savedOrder.orderDetails._id;
      localStorage.setItem(
        "orderData",
        JSON.stringify(savedOrder.orderDetails)
      );

      const initiateRes = await fetch(
        "https://localhost:3000/api/order/khalti/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: adjustedAmount * 100,
            purchase_order_id: savedOrderId,
            purchase_order_name: product.productName,
            customer_info: {
              name: "Customer",
              email: "customer@email.com",
              phone: "9800000000",
            },
            return_url: "https://localhost:5173/khalti-callback",
            website_url: "https://localhost:5173",
          }),
        }
      );

      const paymentData = await initiateRes.json();
      if (!initiateRes.ok || !paymentData.payment_url) {
        throw new Error(
          paymentData.message || "Failed to initiate Khalti payment"
        );
      }

      window.location.href = paymentData.payment_url;
    } catch (error) {
      console.error("💥 Error:", error);
      toast.error("Failed to initiate Khalti payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-lg mx-auto mt-10 sm:mt-16">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Place Your Order
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img
          src={`https://localhost:3000/${product.image.replace("public/", "")}`}
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
            max={product.quantity}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-600 mt-2">
            <strong>{product.quantity}</strong> units available
          </p>
          {quantityError && (
            <p className="text-sm text-red-600 mt-2">{quantityError}</p>
          )}

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
            className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your shipping address"
          />
        </div>

        <button
          className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          onClick={handleKhaltiPayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Redirecting..." : "Pay with Khalti 💰"}
        </button>
      </div>
    </div>
  );
}
