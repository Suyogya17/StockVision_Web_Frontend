import { Bell, Menu, Settings, User } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "./card";

export default function AdminNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
        </button>
        <button
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          aria-label="Settings"
        >
          <Settings className="h-6 w-6" />
        </button>
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Profile"
        >
          <User className="h-6 w-6" />
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
