// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { lazy } from "react";
// import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify"; // Import ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

// const LoginPage = lazy(() => import("./public/login.tsx"));
// const RegisterPage = lazy(() => import("./public/register.tsx"));
// const UserDashboard = lazy(() => import("./public/userDashboard.tsx"));
// const UserProduct = lazy(() => import("./public/userProduct.tsx"));
// const UserOrder = lazy(() => import("./public/userOrder.tsx"));

// const Admin = lazy(() => import("./private/index.tsx"));
// const AdminProduct = lazy(() => import("./private/product/adminProduct.tsx"));
// const AdminOrder = lazy(() => import("./private/order/adminOrder.tsx"));
// const AdminDashboard = lazy(
//   () => import("./private/dashboard/adminDashboard.tsx")
// );

// const queryClient = new QueryClient();

// function App() {
//   // const privateRouter = [
//   //   {
//   //     path: "/admin",
//   //     element: (
//   //       <Suspense>
//   //         <Admin />
//   //       </Suspense>
//   //     ),
//   //     errorElement: <>Error</>,
//   //     children: [
//   //       {
//   //         path: "/admin",
//   //         element: (
//   //           <Suspense>
//   //             <AdminDashboard />
//   //           </Suspense>
//   //         ),
//   //         errorElement: <>Error</>,
//   //       },
//   //       {
//   //         path: "/admin/product",
//   //         element: (
//   //           <Suspense>
//   //             <AdminProduct />
//   //           </Suspense>
//   //         ),
//   //         errorElement: <>Error</>,
//   //       },
//   //       {
//   //         path: "/admin/order",
//   //         element: (
//   //           <Suspense>
//   //             <AdminOrder />
//   //           </Suspense>
//   //         ),
//   //         errorElement: <>Error</>,
//   //       },
//   //     ],
//   //   },
//   // ];

//   // const publicRouter = [
//   //   {
//   //     path: "/",
//   //     element: (
//   //       <Suspense>
//   //         <LoginPage />
//   //       </Suspense>
//   //     ),
//   //     errorElement: <>Error</>,
//   //   },
//   //   {
//   //     path: "/dashboard",
//   //     element: (
//   //       <Suspense>
//   //         <UserDashboard />
//   //       </Suspense>
//   //     ),
//   //     errorElement: <>Error</>,
//   //   },
//   //   {
//   //     path: "/register",
//   //     element: (
//   //       <Suspense>
//   //         <RegisterPage />
//   //       </Suspense>
//   //     ),
//   //     errorElement: <>Error</>,
//   //   },
//   //   {
//   //     path: "/product",
//   //     element: (
//   //       <Suspense>
//   //         <UserProduct />
//   //       </Suspense>
//   //     ),
//   //     errorElement: <>Error</>,
//   //   },
//   //   {
//   //     path: "/order",
//   //     element: (
//   //       <Suspense>
//   //         <UserOrder />
//   //       </Suspense>
//   //     ),
//   //     errorElement: <>Error</>,
//   //   },
//   //   {
//   //     path: "*",
//   //     element: <>Page not found</>,
//   //   },
//   // ];

//   // const isAdmin = false;

//   return (
//     <>
//       <QueryClientProvider client={queryClient}>
//         <ToastContainer />
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/dashboard" element={<UserDashboard />} />
//           <Route path="/product" element={<UserProduct />} />
//           <Route path="/order" element={<UserOrder />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/admin/product" element={<AdminProduct />} />
//           <Route path="/admin/order" element={<AdminOrder />} />
//         </Routes>
//       </QueryClientProvider>
//     </>
//   );
// }

// export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "./App.css";
import AdminDashboard from "./private/dashboard/adminDashboard.tsx";
import AdminOrder from "./private/order/adminOrder.tsx";
import Account from "./public/account.tsx";
import Login from "./public/login.tsx";
import RegisterPage from "./public/register.tsx";
import UserDashboard from "./public/userDashboard.tsx";
import UserOrder from "./public/userOrder.tsx";
import UserProduct from "./public/userProduct.tsx";

// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/product",
    element: <Login />,
  },
  {
    path: "/admin/order",
    element: <AdminOrder />,
  },
  {
    path: "/product",
    element: <UserProduct />,
  },
  {
    path: "/order",
    element: <UserOrder />,
  },
]);

function App() {
  return (
    <>
      {/* Wrap the RouterProvider with QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
