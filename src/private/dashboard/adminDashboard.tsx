import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../pages/common/adminnavbar";
import { Card, CardContent } from "../../pages/common/card";

function adminDashboard() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/admin/product"); // replace "/destination" with your actual route
  };
  return (
    <>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <AdminNavBar />

        {/* Dashboard Content */}
        <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Cards */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-bold">Overview</h2>
              <p className="text-gray-600">
                Quick summary of your platform's performance.
              </p>
            </CardContent>
          </Card>

          <Card
            className="max-w-xs cursor-pointer hover:scale-105 hover:shadow-xl transition-all"
            onTap={handleCardClick}
          >
            <CardContent>
              <h2 className="text-xl font-bold">Products</h2>
              <p className="text-gray-600">Products that are for you.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-bold">Users</h2>
              <p className="text-gray-600">Active users on the platform.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-bold">Orders</h2>
              <p className="text-gray-600">New orders placed today.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-bold">Analytics</h2>
              <p className="text-gray-600">
                Key metrics and analytics overview.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-bold">Support</h2>
              <p className="text-gray-600">Tickets and inquiries.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}

export default adminDashboard;
