import { Mail, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/common/navbar";
import Footer from "../pages/common/footer";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

function Support() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted!"); // Show success toast
    navigate("/dashboard");
  };

  return (
    <>
      {/* Render Navbar */}
      <Navbar />

      <div className="p-6 max-w-lg mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Support</h1>
          <p className="text-gray-600 mb-6">Need help? Fill out the form below.</p>
          <p className="text-gray-600 mb-6">
            Or you may directly contact us at our telephone number.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input with Icon */}
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-500" />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            {/* Email Input with Icon */}
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-500" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            {/* Message Input with Icon */}
            <div className="relative">
              <MessageCircle className="absolute left-4 top-4 text-gray-500" />
              <textarea
                placeholder="Describe your issue..."
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition duration-200"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>

      {/* Render Footer */}
      <Footer />
    </>
  );
}

export default Support;
