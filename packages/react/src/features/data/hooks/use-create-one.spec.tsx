import { it, describe, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { mockDataProvider, TestWrapper } from "../../test";
import { useCreateOne } from "./use-create-one";
import type { PropsWithChildren } from "react";

describe("useCreateOne", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call the dataProvider with the correct params", async () => {
    mockDataProvider.createOne.mockResolvedValueOnce({
      id: 1,
      name: "John Grow",
    });

    const Wrapper = ({ children }: PropsWithChildren) => (
      <TestWrapper resource={{ resource: "customers", id: null }}>
        {children}
      </TestWrapper>
    );

    const { result } = renderHook(() => useCreateOne(), {
      wrapper: Wrapper,
    });

    const { mutate } = result.current;

    mutate({
      name: "John Grow",
    });

    expect(mockDataProvider.createOne).toHaveBeenCalledExactlyOnceWith({
      resource: "customers",
      data: {
        name: "John Grow",
      },
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    })

    expect(result.current.data).toEqual({
      id: 1,
      name: "John Grow",
    });
  });
});
