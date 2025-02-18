import { Bell, Menu, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./card";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  const handleAccount = () => {
    navigate("/account")
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
      <div className="flex items-center gap-4 relative">
        <button
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
        </button>

        {/* Settings Button */}
        <button
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 relative"
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-label="Settings"
        >
          <Settings className="h-6 w-6" />
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
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Profile"
        >
          <User className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <Card className="absolute top-16 left-4 w-64 z-50 h-[75vh] overflow-y">
          <CardContent className="flex flex-col gap-2 p-4">
            <a
              href="/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Dashboard
            </a>
            <a
              href="/product"
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Product
            </a>
            <a href="/order" className="px-4 py-2 rounded-lg hover:bg-gray-100">
              Order
            </a>
            <a href="/sales" className="px-4 py-2 rounded-lg hover:bg-gray-100">
              Sales
            </a>
            <a
              href="/reports"
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Report
            </a>
            <a
              href="/about-us"
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              About Us
            </a>
            <a
              href="/account"
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Account
            </a>
          </CardContent>
        </Card>
      )}
    </nav>
  );
}
