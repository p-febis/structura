import {
  BrowserRouter,
  Route,
  Routes,
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

const ResourceProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { id } = useParams();

  const [, , resource] = location.pathname.split("/");

  return (
    <StructuraRouteProvider value={{ resource, id: id ?? null }}>
      {children}
    </StructuraRouteProvider>
  );
};

const App = () => {
  const dataProvider = new RestApiDataProvider({
    endpoint: "https://dummyjson.com/",
  });

  const client = new StructuraClient({ dataProvider });

  return (
    <BrowserRouter>
      <StructuraClientProvider client={client}>
        <ResourceProvider>
          <Routes>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="cart" element={4} />
            </Route>
          </Routes>
        </ResourceProvider>
      </StructuraClientProvider>
    </BrowserRouter>
  );
};

export default App;
