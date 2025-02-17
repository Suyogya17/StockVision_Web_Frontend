import { Card, CardContent } from "../pages/common/card";
import Navbar from "../pages/common/navbar";
export default function userDashboard() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

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

        <Card>
          <CardContent>
            <h2 className="text-xl font-bold">Product</h2>
            <p className="text-gray-600">All products in the store.</p>
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
            <p className="text-gray-600">Key metrics and analytics overview.</p>
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
  );
}
