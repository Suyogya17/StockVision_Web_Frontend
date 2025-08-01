import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "./App.css";
import UnlockRedirectPage from "./public/UnlockRedirectPage";
import AboutUs from "./pages/view/aboutus.tsx";
import Report from "./pages/view/report.tsx";
import AdminDashboard from "./private/dashboard/adminDashboard.tsx";
import AdminOrder from "./private/order/adminOrder.tsx";
import AdminProduct from "./private/product/adminProduct.tsx";
import Account from "./public/account.tsx";
import ForgetPassword from "./public/forgotpassword.tsx";
import Login from "./public/login.tsx";
import UserOrderHistory from "./public/orderhistory.tsx";
import Otp from "./public/OTPPage.tsx";
import Overview from "./public/overview.tsx";
import RegisterPage from "./public/register.tsx";
import UserDashboard from "./public/userDashboard.tsx";
import UserOrder from "./public/userOrder.tsx";
import UserProduct from "./public/userProduct.tsx";
import UserSupport from "./public/usersupport.tsx";
import ResetPassword from "./public/restpassword.tsx"
import KhaltiCallback from "./public/KhaltiCallback.tsx";
// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/account",
    element: <Account />,
  },

  {
    path: "/unlock-account",
    element: <UnlockRedirectPage />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/product",
    element: <AdminProduct />,
  },
  {
    path: "/admin/order",
    element: <AdminOrder />,
  },
  {
    path: "/admin/report",
    element: <Report />,
  },
  {
    path: "/product",
    element: <UserProduct />,
  },
  {
    path: "/order",
    element: <UserOrder />,
  },
  {
  path: "/khalti-callback",
  element: <KhaltiCallback />,
},
  {
    path: "/orderhistory",
    element: <UserOrderHistory />,
  },
  {
    path: "/overview",
    element: <Overview />,
  },
  {
    path: "/support",
    element: <UserSupport />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/support",
    element: <UserSupport />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
  path: "/reset-password/:token",
  element: <ResetPassword />,
},
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
