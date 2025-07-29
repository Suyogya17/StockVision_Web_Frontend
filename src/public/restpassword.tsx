import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLongEnough = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isStrong = isLongEnough && hasUppercase && hasNumber && hasSymbol;

  const getStrengthLabel = () => {
    if (isStrong) return "Strong";
    if (isLongEnough && (hasNumber || hasUppercase || hasSymbol)) return "Medium";
    return "Weak";
  };

  const getStrengthColor = () => {
    const label = getStrengthLabel();
    return label === "Strong"
      ? "text-green-600"
      : label === "Medium"
      ? "text-yellow-600"
      : "text-red-600";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!isStrong) {
      return toast.error("Password is not strong enough.");
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `https://localhost:3000/api/auth/reset-password/${token}`,
        { password }
      );
      toast.success(res.data.message || "Password reset successful!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCheck = (condition: boolean) => (
    <span className={`mr-2 ${condition ? "text-green-600" : "text-red-600"}`}>
      {condition ? "✔️" : "❌"}
    </span>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        {/* New Password */}
        <label className="block mb-2">New Password</label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded pr-12"
            placeholder="Enter new password"
          />
          <span
            className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <p className={`text-sm mb-4 ${getStrengthColor()}`}>
          Strength: {getStrengthLabel()}
        </p>

        {/* Criteria list */}
        <ul className="text-sm mb-4 space-y-1">
          <li>
            {renderCheck(isLongEnough)} At least 8 characters
          </li>
          <li>
            {renderCheck(hasUppercase)} One uppercase letter
          </li>
          <li>
            {renderCheck(hasNumber)} One number
          </li>
          <li>
            {renderCheck(hasSymbol)} One special character
          </li>
        </ul>

        {/* Confirm Password */}
        <label className="block mb-2">Confirm Password</label>
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded pr-12"
            placeholder="Confirm your password"
          />
          <span
            className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
