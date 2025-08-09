import { it, describe, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { mockDataProvider, TestWrapper } from "../../test";
import type { PropsWithChildren } from "react";
import { useOne } from "./use-one";

describe("useOne", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call the dataProvider with the correct parameters", async () => {
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

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(result.current.data).toEqual(sampleCustomer);
  });

  it("throws an error if called without an id", async () => {
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
  });

  it("returns overriden resource data when provided", async () => {
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

    const { result } = renderHook(
      () =>
        useOne({
          resource: "products",
          id: "1",
        }),
      {
        wrapper: Wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(result.current.data).toEqual(sampleProduct);
  });
});
