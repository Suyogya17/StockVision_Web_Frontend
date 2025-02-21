import { Bell, Menu, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteOrder,
  usePlaceOrder,
  useUpdateOrder,
} from "../../private/order/orderQuery";
import { Card, CardContent } from "./card";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle notification visibility
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleAccount = () => {
    navigate("/account");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Optionally clear notifications when clicked (depends on your logic)
    if (showNotifications) {
      setNotifications([]); // Clear notifications if you want to reset them
    }
  };

  // Example mutation hooks
  const { mutate: placeOrder } = usePlaceOrder();
  const { mutate: updateOrder } = useUpdateOrder();
  const { mutate: deleteOrder } = useDeleteOrder();

  const onOrderSuccess = (action: string) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      `${action} order successfully!`,
    ]);
  };

  // Use the onSuccess callback to handle the success logic
  const placeOrderMutation = (orderData: any) => {
    placeOrder(orderData, {
      onSuccess: () => onOrderSuccess("Placed"),
      onError: () => onOrderSuccess("Failed to place order"),
    });
  };

  const updateOrderMutation = (orderId: string, updatedData: any) => {
    updateOrder(
      {
        orderId,
        updatedData,
      },
      {
        onSuccess: () => onOrderSuccess("Updated"),
        onError: () => onOrderSuccess("Failed to update order"),
      }
    );
  };

  const deleteOrderMutation = (orderId: string) => {
    deleteOrder(orderId, {
      onSuccess: () => onOrderSuccess("Deleted"),
      onError: () => onOrderSuccess("Failed to delete order"),
    });
  };

  return (
    <nav className="bg-orange-500 text-white shadow-md p-4 flex justify-between items-center relative">
      {/* Left Side: Burger Menu and Brand */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-lg bg-white-500 hover:bg-orange-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
        <span className="text-xl font-bold">StockVision</span>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications Button */}
        <button
          onClick={toggleNotifications} // Toggle the visibility of notifications
          className="p-2 rounded-lg bg-orange-500 hover:bg-orange-400 relative"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6 text-white" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Settings Button */}
        <button
          className="p-2 rounded-lg bg-orange-500 hover:bg-orange-400 relative"
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-label="Settings"
        >
          <Settings className="h-6 w-6 text-white" />
        </button>

        {/* Settings Dropdown */}
        {settingsOpen && (
          <Card className="absolute right-0 top-12 w-48 z-50">
            <CardContent className="flex flex-col gap-2 p-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg hover:bg-red-100 text-left w-full text-red-600"
              >
                Logout
              </button>
            </CardContent>
          </Card>
        )}

        <button
          onClick={handleAccount}
          className="p-2 rounded-full bg-orange-500 hover:bg-orange-400"
          aria-label="Profile"
        >
          <User className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Notifications Display */}
      {showNotifications && notifications.length > 0 && (
        <div className="absolute top-16 right-0 w-64 bg-white shadow-lg rounded-lg p-4">
          <h3 className="font-semibold">Notifications</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="text-sm text-gray-700">
                {notification}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar Menu */}
      {menuOpen && (
        <Card className="absolute top-16 left-0 w-60 z-50 h-[vh] overflow-y-auto bg-white shadow-lg">
          <CardContent className="flex flex-col justify-center items-center gap-2 p-4">
            <a
              href="/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-orange-400 hover:shadow-lg transition duration-300 w-full text-center bg-white text-black"
            >
              Dashboard
            </a>
            <a
              href="/product"
              className="px-4 py-2 rounded-lg hover:bg-orange-400 hover:shadow-lg transition duration-300 w-full text-center bg-white text-black"
            >
              Product
            </a>
            <a
              href="/orderhistory"
              className="px-4 py-2 rounded-lg hover:bg-orange-400 hover:shadow-lg transition duration-300 w-full text-center bg-white text-black"
            >
              Order History
            </a>

            <a
              href="/aboutus"
              className="px-4 py-2 rounded-lg hover:bg-orange-400 hover:shadow-lg transition duration-300 w-full text-center bg-white text-black"
            >
              About Us
            </a>
            <a
              href="/account"
              className="px-4 py-2 rounded-lg hover:bg-orange-400 hover:shadow-lg transition duration-300 w-full text-center bg-white text-black"
            >
              Account
            </a>
          </CardContent>
        </Card>
      )}
    </nav>
  );
}
