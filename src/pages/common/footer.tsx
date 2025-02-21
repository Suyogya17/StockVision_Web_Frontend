import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaHome, FaInfoCircle } from "react-icons/fa"; // FontAwesome icons

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-800 text-white py-6 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center space-x-6 mb-6">
          <button
            onClick={() => navigate("/overview")}
            className="flex items-center space-x-2 hover:underline"
          >
            <FaHome />
            <span>Overview</span>
          </button>
          <button
            onClick={() => navigate("/support")}
            className="flex items-center space-x-2 hover:underline"
          >
            <FaPhoneAlt />
            <span>Customer Support</span>
          </button>
          <button
            onClick={() => navigate("/support")}
            className="flex items-center space-x-2 hover:underline"
          >
            <FaEnvelope />
            <span>Email: stockvision@gmail.com</span>
          </button>
          <button
            onClick={() => navigate("/support")}
            className="flex items-center space-x-2 hover:underline"
          >
            <FaInfoCircle />
            <span>Privacy and Cookies Policy</span>
          </button>
        </div>
        <p className="text-center text-sm mt-4">
          &copy; 2025 StockVision. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
