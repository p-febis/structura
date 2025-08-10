import { it, describe, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { mockDataProvider, TestWrapper } from "../../test";
import { useCreateOne } from "./use-create-one";
import type { PropsWithChildren } from "react";

describe("useCreateOne", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should create a resource", async () => {
    mockDataProvider.createOne.mockResolvedValueOnce({
      id: 1,
      name: "John Grow",
    });

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "customers", id: null }}>
        {children}
      </TestWrapper>
    );

    const onSuccess = vi.fn();

    const { result } = renderHook(
      () =>
        useCreateOne({
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

  it("returns overriden resource data when provided", async () => {
    mockDataProvider.createOne.mockResolvedValueOnce({
      id: 1,
      name: "John Grow",
    });

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "products", id: null }}>
        {children}
      </TestWrapper>
    );

    const { result } = renderHook(
      () =>
        useCreateOne({
          resource: "customers",
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
  });
});
