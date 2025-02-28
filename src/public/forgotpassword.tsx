import { useState } from "react";
import { toast } from "react-toastify"; // Import toast for user feedback
import "react-toastify/dist/ReactToastify.css";
import { useForgotPassword } from "./query";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading, error, message } = useForgotPassword(); // Check message/error for feedback
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    // Call forgotPassword function
    await forgotPassword(email); 

    // Check for success or error messages
    if (message) {
      toast.success(message);  // Display success message
    } else if (error) {
      toast.error(error);  // Display error message
      setIsErrorVisible(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          {/* Error message */}
          {isErrorVisible && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
