import { it, describe, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { mockDataProvider, TestWrapper } from "../../test";
import type { PropsWithChildren } from "react";
import { useOne } from "./use-one";

describe("useOne", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call the dataProvider with the correct params", async () => {
    const sampleCustomer = {
      id: 1,
      name: "John Doe",
    };

    mockDataProvider.getOne.mockResolvedValueOnce(sampleCustomer);

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "customers", id: "1" }}>
        {children}
      </TestWrapper>
    );

    const { result } = renderHook(() => useOne(), {
      wrapper: Wrapper,
    });

    expect(mockDataProvider.getOne).toHaveBeenCalledExactlyOnceWith({
      resource: "customers",
      id: "1",
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(result.current).toEqual({
      data: sampleCustomer,
      error: undefined,
      isLoading: false,
      isValidating: false,
    });
  });

  it("should throw if called without an id", async () => {
    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "customers", id: null }}>
        {children}
      </TestWrapper>
    );

    expect(() => {
      renderHook(() => useOne(), {
        wrapper: Wrapper,
      });
    }).toThrowError("useOne must be called with an id");

    expect(mockDataProvider.getOne).not.toHaveBeenCalled();
  });

  it("should allow overwriting", () => {
    const sampleProduct = {
      id: 1,
      name: "Blender",
    };

    mockDataProvider.getOne.mockResolvedValueOnce(sampleProduct);

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "customers", id: "1" }}>
        {children}
      </TestWrapper>
    );

    renderHook(
      () =>
        useOne({
          resource: "products",
          id: "1",
        }),
      {
        wrapper: Wrapper,
      },
    );

    expect(mockDataProvider.getOne).toHaveBeenCalledExactlyOnceWith({
      resource: "products",
      id: "1",
    });
  });
});
