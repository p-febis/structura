import { it, describe, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { mockDataProvider, TestWrapper } from "../../test";
import { useList } from "./use-list";
import type { PropsWithChildren } from "react";

describe("useList", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  })

  it("should call the dataProvider with the correct parameters", async () => {
    const sampleCustomers = [
      {
        id: 1,
        name: "John Doe",
      },
      {
        id: 2,
        name: "Jane Doe",
      },
    ];

    mockDataProvider.getList.mockResolvedValueOnce(sampleCustomers);

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "customers", id: null }}>
        {children}
      </TestWrapper>
    );

    const { result } = renderHook(() => useList(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(result.current.data).toEqual(sampleCustomers);
  });

  it("returns overriden resource data when provided", async () => {
    const sampleCustomers = [
      {
        id: 1,
        name: "John Doe",
      },
      {
        id: 2,
        name: "Jane Doe",
      },
    ];

    mockDataProvider.getList.mockResolvedValueOnce(sampleCustomers);

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "customers", id: null }}>
        {children}
      </TestWrapper>
    );

    const { result } = renderHook(() => useList({ resource: "products" }), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(result.current.data).toEqual(sampleCustomers);
  });
});
