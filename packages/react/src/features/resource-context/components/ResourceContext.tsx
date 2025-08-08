import { createContext, use } from "react";

export type TResourceContext = {
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

export const useResource = (): TResourceContext => {
  const context = use(ResourceContext);
  if (!context)
    throw new Error(
      "useResourceContext must be used within StructuraRouteProvider",
    );

  if (!context.resource)
    throw new Error(
      "useResource cannot be called without at least a resource set",
    );

  return context;
};
