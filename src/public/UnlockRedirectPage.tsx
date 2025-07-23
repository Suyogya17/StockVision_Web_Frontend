// src/pages/UnlockRedirectPage.tsx
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UnlockRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unlock = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");

      if (!email) {
        toast.error("Invalid unlock link");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/api/auth/unlock-account?email=${email}`
        );

        toast.success(res.data.message || "Account unlocked");
        setTimeout(() => {
          navigate("/");
        }, 100);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(
            err.response?.data?.message || "Failed to unlock account"
          );
        } else {
          toast.error("Failed to unlock account");
        }
      }
    };

    unlock();
  }, [navigate]);

  return <p>Unlocking your account...</p>;
};

export default UnlockRedirectPage;
