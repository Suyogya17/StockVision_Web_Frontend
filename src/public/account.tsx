import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useGetUserProfile, useUserUpdate } from "./query"; // Import API call hook

const UserProfile = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // For image preview and upload
  const [fName, setFName] = useState<string>(""); // To track first name
  const [lName, setLName] = useState<string>(""); // To track last name
  const [username, setUsername] = useState<string>(""); // To track username
  const [email, setEmail] = useState<string>(""); // To track email
  const [phoneNo, setphoneNo] = useState<string>(""); // To track phone number
  const [address, setAddress] = useState<string>(""); // To track address
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false); // To track confirmation state

  const { data: user, isLoading, error } = useGetUserProfile(); // Get user profile with auto-fetching
  console.log(user); // Check the user object

  const {
    mutate: updateUser,
    isPending: isUpdating,
    error: updateError,
  } = useUserUpdate(); // Hook for updating profile

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file); // Update the state with the selected image
    }
  };

  // Handle profile update
  const handleUpdateProfile = () => {
    if (!isConfirmationOpen) {
      // Open confirmation modal
      setIsConfirmationOpen(true);
      return;
    }

    const formData = new FormData();
    if (selectedImage) {
      formData.append("profilePicture", selectedImage); // Append the image file to the form data
    }

    // Append the user data
    formData.append("fName", fName || user.fName); // Use new name or current
    formData.append("lName", lName || user.lName); // Use new name or current
    formData.append("username", username || user.username); // Use new username or current
    formData.append("email", email || user.email); // Use new email or current
    formData.append("phoneNumber", phoneNo || user.phoneNo); // Use new phone number or current
    formData.append("address", address || user.address); // Use new address or current

    updateUser({
      formData: formData,
      customerId: user._id, // Assuming user._id is the unique identifier for the user
    });

    // Close confirmation modal after update
    setIsConfirmationOpen(false);

    // Show toast message after successful update
    toast.success("Profile updated successfully!");
  };

  // Handle confirmation modal closing without update
  const handleCancelUpdate = () => {
    setIsConfirmationOpen(false);
  };

  function handleLogOut() {
    localStorage.removeItem("userToken"); // Example: remove token
    sessionStorage.removeItem("userToken"); // Example: remove session storage token if applicable

    navigate("/");
  }

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen flex items-center justify-center py-12`}
    >
      <div className="w-full max-w-3xl p-8 bg-white shadow-xl rounded-xl">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          Account Settings
        </h2>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8 space-y-4">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage) // Preview selected image
                : `http://localhost:3000/uploads/${user.image}`
            }
            alt="User Avatar"
            className="w-36 h-36 rounded-full border-4 border-gray-300 shadow-lg"
          />
          <div className="text-center">
            <h3 className="text-2xl font-medium">
              <p className="text-lg text-gray-500">{user.role}</p>
              {user.fName} {user.lName}
            </h3>
            <p className="text-lg text-gray-500">{user.email}</p>
            <p className="text-lg text-gray-500">{user.address}</p>
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="cursor-pointer text-blue-500 hover:text-blue-700">
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Settings Options */}
        <div className="space-y-6">
          {/* Manage Account */}
          <div className="p-6 border-2 border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold">Manage Account</h3>
            <p className="text-gray-600 text-sm mb-4">
              Update personal details and preferences
            </p>

            {/* Form for personal details */}
            <div>
              <label className="block text-sm">First Name</label>
              <input
                type="text"
                value={fName || user.fName}
                onChange={(e) => setFName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              />
              <label className="block text-sm mt-4">Last Name</label>
              <input
                type="text"
                value={lName || user.lName}
                onChange={(e) => setLName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              />
              <label className="block text-sm mt-4">Username</label>
              <input
                type="text"
                value={username || user.username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              />
              <label className="block text-sm mt-4">Email</label>
              <input
                type="email"
                value={email || user.email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              />
              <label className="block text-sm mt-4">Phone Number</label>
              <input
                type="text"
                value={phoneNo || user.phoneNumber}
                onChange={(e) => setphoneNo(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              />
              <label className="block text-sm mt-4">Address</label>
              <input
                type="text"
                value={address || user.address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              />
            </div>

            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 mt-6"
              onClick={handleUpdateProfile}
              disabled={isUpdating} // Disable while updating
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
            {updateError && (
              <p className="text-red-500 text-sm mt-2">
                Error: {updateError.message}
              </p>
            )}
          </div>

          {/* Confirmation Modal */}
          {isConfirmationOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-80">
                <h3 className="text-lg font-semibold mb-4">
                  Are you sure you want to update your profile?
                </h3>
                <div className="flex justify-between">
                  <button
                    className="px-6 py-2 bg-red-500 text-white rounded-lg"
                    onClick={handleCancelUpdate}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2 bg-green-500 text-white rounded-lg"
                    onClick={handleUpdateProfile}
                  >
                    Yes, Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <div className="p-6 border-2 border-gray-200 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Dark Mode</h3>
              <p className="text-gray-600 text-sm">
                Enable dark theme for a better experience
              </p>
            </div>
            <button
              className={`px-6 py-2 rounded-full ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
              } transition duration-200`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Disable" : "Enable"}
            </button>
          </div>

          {/* Security */}
          <div className="p-6 border-2 border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold">Security</h3>
            <p className="text-gray-600 text-sm mb-4">
              Change password and manage login activity
            </p>
            <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
              Change Password
            </button>
          </div>

          {/* Logout */}
          <div className="text-center mt-8">
            <button
              onClick={() => {
                handleLogOut();
              }}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
