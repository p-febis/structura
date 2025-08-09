import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  useParams,
} from "react-router";
import type { PropsWithChildren } from "react";

import { RestApiDataProvider } from "@structura/rest-data-provider";
import { StructuraClient } from "@structura/core";
import {
  StructuraClientProvider,
  StructuraRouteProvider,
} from "@structura/react";

import { DashboardPage } from "./routes/dashboard";
import { DashboardLayout } from "./components/dashboard-layout";
import { ProductsPage } from "./routes/dashboard/products";
import { UsersPage } from "./routes/dashboard/users";
import { ProductCreatePage } from "./routes/dashboard/products-create";
import { CartsPage } from "./routes/dashboard/carts";

const ResourceProviderWrapper = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { id } = useParams();

  const [, , resource] = location.pathname.split("/");

  return (
    <StructuraRouteProvider value={{ resource, id: id ?? null }}>
      {children}
    </StructuraRouteProvider>
  );
};

const ResourceProviderLayout = () => (
  <ResourceProviderWrapper>
    <Outlet />
  </ResourceProviderWrapper>
);

const dataProvider = new RestApiDataProvider({
  endpoint: "https://fakestoreapi.com",
});

const client = new StructuraClient({ dataProvider });

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <StructuraClientProvider client={client}>
        <ResourceProviderLayout />
      </StructuraClientProvider>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "products/create", element: <ProductCreatePage /> },
          { path: "users", element: <UsersPage /> },
          { path: "carts", element: <CartsPage /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
