import type React from "react";
import { SWRConfig } from "swr";
import { vi } from "vitest";
import { StructuraClientProvider } from "../client-provider/components/StructuraClientProvider.js";
import { StructuraClient } from "@structura/core";
import "@testing-library/jest-dom/vitest";
import { StructuraRouteProvider, type TResourceContext } from "../resource-context/components/ResourceContext.js";

export const mockDataProvider = {
  getList: vi.fn(),
  getOne: vi.fn(),
  createOne: vi.fn(),
  updateOne: vi.fn(),
  deleteOne: vi.fn(),
};

export const TestWrapper = ({ children, resource }: { children: React.ReactNode, resource: TResourceContext }) => {
  const structuraClient = new StructuraClient({
    // @ts-ignore - mock data provider
    dataProvider: mockDataProvider,
  });

  return (
    <StructuraClientProvider client={structuraClient}>
      <StructuraRouteProvider value={resource}>
        <SWRConfig>{children}</SWRConfig>
      </StructuraRouteProvider>
    </StructuraClientProvider>
  );
};
