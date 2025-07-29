import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function KhaltiCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pidx = searchParams.get("pidx");

    if (!pidx) {
      toast.error("Invalid callback from Khalti. Missing pidx.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        const orderData = localStorage.getItem("orderData");

        if (!orderData) {
          toast.error("No order information found. Verification failed.");
          return;
        }

        const parsedOrder = JSON.parse(orderData);
        const orderId = parsedOrder._id;

        const response = await axios.post(
          "https://localhost:3000/api/order/khalti/verify",
          {
            pidx,
            orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("✅ Payment verified and order confirmed!");
          // You can optionally clear localStorage or redirect
          localStorage.removeItem("orderData");
          navigate("/orderhistory");
        } else {
          toast.error("❌ Payment verification failed.");
        }
      } catch (error: any) {
        console.error("❌ Verification failed:", error);
        toast.error(error.response?.data?.message || "Payment verification error.");
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="text-center p-8 text-xl text-gray-700">
      Verifying your payment, please wait...
    </div>
  );
}
