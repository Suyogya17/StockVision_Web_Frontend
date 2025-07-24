import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const UnlockRedirectPage = () => {
  const [message, setMessage] = useState("Unlocking account...");
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) {
      setMessage("Invalid unlock link.");
      setError(true);
      return;
    }

    const unlockAccount = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/auth/unlock-account?email=${encodeURIComponent(
            email
          )}`
        );
        const data = await res.json();

        if (res.ok) {
          setMessage(data.message || "Account unlocked successfully!");
          setTimeout(() => navigate("/"), 3000); // Redirect to login
        } else {
          setError(true);
          setMessage(data.message || "Failed to unlock account.");
        }
      } catch (err) {
        console.error(err);
        setError(true);
        setMessage("Something went wrong. Try again later.");
      }
    };

    unlockAccount();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-md text-center w-full max-w-md">
        <h2 className={`text-xl font-bold ${error ? "text-red-600" : "text-green-600"}`}>
          {message}
        </h2>
        <p className="text-gray-500 mt-4">
          {error ? "You can close this tab or try again." : "Redirecting to login..."}
        </p>
      </div>
    </div>
  );
};

export default UnlockRedirectPage;
