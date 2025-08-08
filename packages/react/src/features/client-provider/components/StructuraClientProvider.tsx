import type { StructuraClient } from "core";
import { createContext, use } from "react";

type TStructuraClientContext = {
  client: StructuraClient;
};

const StructuraClientContext = createContext<TStructuraClientContext | null>(
  null,
);

export const StructuraClientProvider = ({
  client,
  children,
}: {
  client: StructuraClient;
  children: React.ReactNode;
}) => {
  return (
    <StructuraClientContext.Provider value={{ client }}>
      {children}
    </StructuraClientContext.Provider>
  );
};

export const useStructuraClient = (): TStructuraClientContext => {
  const context = use(StructuraClientContext);
  if (!context)
    throw new Error(
      "useStructuraClient must be used within StructuraClientProvider",
    );
  return context;
};
