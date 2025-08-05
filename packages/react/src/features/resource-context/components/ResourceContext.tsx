import { createContext, use } from "react";

type TResourceContext = {
  resource: string;
  id: string | null;
};

const ResourceContext = createContext<TResourceContext | null>(null);

export const StructuraRouteProvider = ({
  value,
  children,
}: {
  value: TResourceContext;
  children: React.ReactNode;
}) => {
  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = (): TResourceContext => {
  const context = use(ResourceContext);
  if (!context)
    throw new Error(
      "useResourceContext must be used within StructuraRouteProvider",
    );
  return context;
};
