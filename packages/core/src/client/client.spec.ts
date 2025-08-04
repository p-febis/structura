import { describe, it, expect, vi, beforeEach } from "vitest";
import type { DataProvider } from "../data-provider/data-provider";
import { StructuraClient } from "./client";

describe("Structura Client", () => {
  const mockDataProvider = {
    getList: vi.fn(),
    getOne: vi.fn(),
    createOne: vi.fn(),
    updateOne: vi.fn(),
    deleteOne: vi.fn(),
  };

  let client: StructuraClient;

  beforeEach(() => {
    vi.resetAllMocks();
    client = new StructuraClient({
      dataProvider: mockDataProvider,
    });
  });

  it("should be able to create a client", () => {
    const client = new StructuraClient({
      dataProvider: {} as unknown as DataProvider,
    });
    expect(client).toBeDefined();
  });

  it("should call getList on the data provider", async () => {
    const mockResponse = [
      {
        name: "Widget 1",
      },
    ];

    mockDataProvider.getList.mockResolvedValueOnce(mockResponse);

    const response = await client.getList<{
      name: string;
    }>({
      resource: "widgets",
    });

    expect(mockDataProvider.getList).toHaveBeenCalledExactlyOnceWith({
      resource: "widgets",
    });

    expect(response).toEqual(mockResponse);
  });

  it("should call getOne on the data provider", async () => {
    const mockResponse = {
      name: "Widget 1",
    };

    mockDataProvider.getOne.mockResolvedValueOnce(mockResponse);

    const response = await client.getOne<{
      name: string;
    }>({
      resource: "widgets",
      id: 1,
    });

    expect(mockDataProvider.getOne).toHaveBeenCalledExactlyOnceWith({
      resource: "widgets",
      id: 1,
    });

    expect(response).toEqual(mockResponse);
  });

  it("should call createOne on the data provider", async () => {
    const mockResponse = {
      id: 1,
      name: "Widget 1",
    };

    mockDataProvider.createOne.mockResolvedValueOnce(mockResponse);

    const response = await client.createOne<
      {
        id: number;
        name: string;
      },
      {
        name: string;
      }
    >({
      resource: "widgets",
      data: {
        name: "Widget 1",
      },
    });

    expect(mockDataProvider.createOne).toHaveBeenCalledExactlyOnceWith({
      resource: "widgets",
      data: {
        name: "Widget 1",
      },
    });

    expect(response).toEqual(mockResponse);
  });

  it("should call updateOne on the data provider", async () => {
    const mockResponse = {
      id: 1,
      name: "Widget 1",
    };

    mockDataProvider.updateOne.mockResolvedValueOnce(mockResponse);

    const response = await client.updateOne<
      {
        id: number;
        name: string;
      },
      {
        name: string;
      }
    >({
      resource: "widgets",
      id: 1,
      data: {
        name: "Widget 1",
      },
    });

    expect(mockDataProvider.updateOne).toHaveBeenCalledExactlyOnceWith({
      resource: "widgets",
      id: 1,
      data: {
        name: "Widget 1",
      },
    });

    expect(response).toEqual(mockResponse);
  });

  it("should call deleteOne on the data provider", async () => {
    const mockResponse = {
      id: 1,
      name: "Widget 1",
    };

    mockDataProvider.deleteOne.mockResolvedValueOnce(mockResponse);

    await client.deleteOne({
      resource: "widgets",
      id: 1,
    });

    expect(mockDataProvider.deleteOne).toHaveBeenCalledExactlyOnceWith({
      resource: "widgets",
      id: 1,
    });
  });
});
