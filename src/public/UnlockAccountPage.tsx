import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UnlockAccountPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const email = searchParams.get("email");

  const handleUnlock = async () => {
    if (!email) {
      toast.error("Missing email parameter");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/auth/unlock", { email });
      toast.success("Account unlocked successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to unlock account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
        <h1 className="text-xl font-semibold mb-4">Unlock Your Account</h1>
        <p className="mb-6">Click below to unlock your account.</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleUnlock}
          disabled={loading}
        >
          {loading ? "Unlocking..." : "Unlock Account"}
        </button>
      </div>
    </div>
  );
};

export default UnlockAccountPage;
