import React, { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLocationArrow,
  FaLock,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegister } from "../public/query";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNo: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const { mutate } = useRegister();

  const evaluatePasswordStrength = (password: string): string => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "password") {
      const strength = evaluatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const requestBody = {
      fName: formData.firstName,
      lName: formData.lastName,
      email: formData.email,
      phoneNo: formData.phoneNo,
      address: formData.address,
      username: formData.username,
      password: formData.password,
      image: profileImage,
    };

  mutate(requestBody, {
    onSuccess: () => {
      // ✅ Save email in localStorage for OTP verification
      localStorage.setItem("userEmail", formData.email);

      toast.success("Registration successful!");
      navigate("/otp");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });
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
        <div
          className="hidden md:block w-1/2 bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/20/f0/51/20f051fef796da29c4ad36185ba3f209.jpg')",
            backgroundSize: "auto",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8">
            Create your account
          </h2>

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
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0"
              />
              {!isImageSelected && (
                <div className="absolute bottom-0 left-0 w-full text-center text-sm font-semibold text-gray-500 opacity-100 transition-all duration-300 bg-white py-1 rounded-b-md">
                  Insert Your Image
                </div>
              )}
            </div>
          </div>

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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaLocationArrow />
                </span>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaPhoneAlt />
                </span>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
                  className="w-full px-4 py-3 focus:outline-none focus:border-blue-500"
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
              {formData.password && (
                <p
                  className={`mt-1 text-sm font-medium ${
                    passwordStrength === "Weak"
                      ? "text-red-600"
                      : passwordStrength === "Fair"
                      ? "text-yellow-600"
                      : passwordStrength === "Good"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  Password Strength: {passwordStrength}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 px-4 rounded-lg hover:bg-gradient-to-l transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>

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
