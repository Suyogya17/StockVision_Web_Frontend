import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyOTP } from "../public/query";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");
  const verifyOtpMutation = useVerifyOTP();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found in local storage.");
      return;
    }

    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: (data) => {
          toast.success("OTP verified successfully");
          navigate("/");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Verification failed");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium text-gray-700">Enter OTP</label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="123456"
          />
          <button
            type="submit"
            disabled={verifyOtpMutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
