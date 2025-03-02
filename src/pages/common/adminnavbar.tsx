import { Bell, Menu, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./card";

export default function AdminNavBar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle notification visibility
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Optionally clear notifications when clicked (depends on your logic)
    if (showNotifications) {
      setNotifications([]); // Clear notifications if you want to reset them
    }
  };

  const handleAccount = () => {
    navigate("/account");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
      {/* Left Side: Burger Menu and Brand */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="text-xl font-bold">StockVision</span>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center gap-4">
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

      {/* Dropdown Menu */}
      {menuOpen && (
        <Card className="absolute top-16 left-4 w-64 z-50 bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="flex flex-col p-4">
            {[
              { name: "Dashboard", path: "/admin" },
              { name: "Product", path: "/admin/product" },
              { name: "Order", path: "/admin/order" },
              { name: "Report", path: "/admin/report" },
            ].map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                {item.name}
              </a>
            ))}
          </CardContent>
        </Card>
      )}
    </nav>
  );
}
