import React, { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// List of all districts of Nepal
const nepaliDistricts = [
  "Bhaktapur",
  "Chitwan",
  "Dolkha",
  "Gorkha",
  "Jhapa",
  "Jumla",
  "Kathmandu",
  "Kavrepalanchok",
  "Lalitpur",
  "Manang",
  "Nuwakot",
  "Palpa",
  "Pokhara",
];

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data (Example: simple validation)
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    console.log("Registration data:", formData);
    toast.success("Registration successful!");
    // Add logic to handle form submission here.
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
      setIsImageSelected(true);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/");
  };

  const handleProfileImageClick = () => {
    document.getElementById("profile-upload")?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 via-yellow-500 to-red-600 flex justify-center items-center py-12">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Left Side Image Section */}
        <div
          className="hidden md:block w-1/2 bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/20/f0/51/20f051fef796da29c4ad36185ba3f209.jpg')", // Replace with high-resolution image
            backgroundSize: "auto",
            backgroundPosition: "center",
          }}
        >
          {/* Optional Image Here */}
        </div>

        {/* Registration Form Section */}
        <div className="w-full md:w-1/2 p-8">
          {/* Heading: Create your account */}
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8">
            Create your account
          </h2>

          {/* Profile Image Box Outside Form */}
          <div className="flex justify-center mb-6">
            <div
              onClick={handleProfileImageClick}
              className="cursor-pointer relative group mb-4"
            >
              <img
                src={
                  isImageSelected
                    ? profileImage
                    : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-200"
              />
              {/* Hidden file input */}
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0"
              />
              {/* Tooltip only when no image is selected */}
              {!isImageSelected && (
                <div className="absolute bottom-0 left-0 w-full text-center text-sm font-semibold text-gray-500 opacity-100 transition-all duration-300 bg-white py-1 rounded-b-md">
                  Insert Your Image
                </div>
              )}
            </div>
          </div>
          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  formData.firstName ? "border-blue-500" : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400`}
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  formData.lastName ? "border-blue-500" : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400`}
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                {/* Icon inside input */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Address (Dropdown with Nepal districts) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <select
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formData.address ? "border-blue-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400`}
                >
                  <option value="">Select a district</option>
                  {nepaliDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                {/* Icon inside input */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaPhoneAlt />
                </span>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                {/* Icon inside input */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg  border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <span className="px-4 text-gray-500">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3  border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-auto px-6 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 px-4 rounded-lg hover:bg-gradient-to-l transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-center items-center mt-6 text-sm">
            <button
              onClick={handleNavigateToLogin}
              className="text-orange-600 hover:underline focus:outline-none"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
