import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/auth/login/login";
import RegisterPage from "./pages/auth/register/register";
import Dashboard from "./pages/view/dashboard";
import OrderPage from "./pages/view/order";
import ProductPage from "./pages/view/product";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/registration",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
