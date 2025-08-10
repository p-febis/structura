import { it, describe, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { mockDataProvider, TestWrapper } from "../../test";
import { useUpdateOne } from "./use-update-one";
import type { PropsWithChildren } from "react";

describe("useUpdateOne", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should update a resource", async () => {
    mockDataProvider.updateOne.mockResolvedValueOnce({
      id: 1,
      name: "John Grow",
    });

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "customers", id: "1" }}>
        {children}
      </TestWrapper>
    );

    const onSuccess = vi.fn();

    const { result } = renderHook(
      () =>
        useUpdateOne({
          mutationOptions: {
            onSuccess,
          },
        }),
      {
        wrapper: Wrapper,
      },
    );

    const { mutate } = result.current;

    mutate({
      name: "John Grow",
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(result.current.data).toEqual({
      id: 1,
      name: "John Grow",
    });

    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it("updates the overriden resource when provided", async () => {
    mockDataProvider.updateOne.mockResolvedValueOnce({
      id: 1,
      name: "John Grow",
    });

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "products", id: "300" }}>
        {children}
      </TestWrapper>
    );

    const { result } = renderHook(() => useUpdateOne(), {
      wrapper: Wrapper,
    });

    const { mutate } = result.current;

    mutate({
      name: "John Grow",
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(result.current.data).toEqual({
      id: 1,
      name: "John Grow",
    });
  });
});
