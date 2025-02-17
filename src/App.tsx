import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const LoginPage = lazy(() => import("./public/login.tsx"));
const RegisterPage = lazy(() => import("./public/register.tsx"));
const UserDashboard = lazy(() => import("./public/userDashboard.tsx"));
const UserProduct = lazy(() => import("./public/userProduct.tsx"));
const UserOrder = lazy(() => import("./public/userOrder.tsx"));

const Admin = lazy(() => import("./private/index.tsx"));
const AdminProduct = lazy(() => import("./private/product/adminProduct.tsx"));
const AdminOrder = lazy(() => import("./private/order/adminOrder.tsx"));
// const ProductForm = lazy(() => import("./private/product/productForm.tsx"));
// const ProductTable = lazy(() => import("./private/product/productTable.tsx"));
const AdminDashboard = lazy(
  () => import("./private/dashboard/adminDashboard.tsx")
);
const queryClient = new QueryClient();

function App() {
  const privateRouter = [
    {
      path: "/admin",
      element: (
        <Suspense>
          <Admin />
        </Suspense>
      ),
      errorElement: <>Error</>,
      children: [
        {
          path: "/admin",
          element: (
            <Suspense>
              <AdminDashboard />
            </Suspense>
          ),
          errorElement: <>Error</>,
        },
        {
          path: "/admin/product",
          element: (
            <Suspense>
              <AdminProduct />
            </Suspense>
          ),
          errorElement: <>Error</>,
        },
        {
          path: "/admin/order",
          element: (
            <Suspense>
              <AdminOrder />
            </Suspense>
          ),
          errorElement: <>Error</>,
        },

        // {
        //   path: "/admin/product",
        //   element: (
        //     <Suspense>
        //       <ProductTable />
        //     </Suspense>
        //   ),
        //   errorElement: <>Error</>,
        // },
        // {
        //   path: "/admin/product/form",
        //   element: (
        //     <Suspense>
        //       <ProductForm />
        //     </Suspense>
        //   ),
        //   errorElement: <>Error</>,
        // },
      ],
    },
  ];

  const publicRouter = [
    {
      path: "/",
      element: (
        <Suspense>
          <LoginPage />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "/dashboard",
      element: (
        <Suspense>
          <UserDashboard />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "/register",
      element: (
        <Suspense>
          <RegisterPage />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "/product",
      element: (
        <Suspense>
          <UserProduct />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "/order",
      element: (
        <Suspense>
          <UserOrder />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "*",
      element: <>Page not found</>,
    },
  ];

  const isAdmin = false;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createBrowserRouter(isAdmin ? privateRouter : publicRouter)}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
