import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const LoginPage = lazy(() => import("./public/login.tsx"));
const RegisterPage = lazy(() => import("./public/register.tsx"));
const Admin = lazy(() => import("./private/user/index.tsx"));
const ProductForm = lazy(() => import("./private/product/form.tsx"));
const ProductTable = lazy(() => import("./private/product/index.tsx"));
const Dashboard = lazy(() => import("./private/dashboard/index.tsx"));

const queryClient = new QueryClient();

function App() {
  const isAdmin = true;

  const privateRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/admin" element={<Admin />} errorElement={<>Error</>}>
        <Route index element={<Dashboard />} />
        <Route path="product" element={<ProductTable />} />
        <Route path="product/form" element={<ProductForm />} />
      </Route>
    )
  );

  const publicRouter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LoginPage />} errorElement={<>Error</>} />
        <Route
          path="/register"
          element={<RegisterPage />}
          errorElement={<>Error</>}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
          errorElement={<>Error</>}
        />
        <Route path="*" element={<>Page Not Found</>} />
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={isAdmin ? privateRouter : publicRouter} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
