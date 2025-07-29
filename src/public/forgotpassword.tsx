import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForgotPassword } from "./query"; // Your custom React Query hook

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword } = useForgotPassword();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    try {
      const promise = forgotPassword(email);

      await toast.promise(promise, {
        pending: {
          render: () => "Sending reset link...",
          className: "bg-blue-100 text-blue-800 font-semibold",
        },
        success: {
          render({ data }) {
            setEmailSent(true);
            return data?.message || "Reset link sent successfully!";
          },
          className: "bg-green-100 text-green-800 font-semibold",
        },
        error: {
          render({ data }) {
            const errorData = data as { message?: string };
            return (
              errorData?.message || "Invalid Email Account. Please try again."
            );
          },
          className: "bg-red-100 text-red-800 font-semibold",
        },
      });
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Forgot Password
        </h2>

        {emailSent ? (
          <p className="text-green-600 text-center mb-4">
            If this email exists in our system, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition`}
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
