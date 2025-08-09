import { describe, it, expect, vi, beforeEach } from "vitest";
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

  it("should be able to retrieve a list of data", async () => {
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

    expect(response).toEqual(mockResponse);
  });

  it("should be able to retrieve a single data point", async () => {
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

    expect(response).toEqual(mockResponse);
  });

  it("should be able to create a resource", async () => {
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

    expect(response).toEqual(mockResponse);
  });

  it("should be able to update a resource", async () => {
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

    expect(response).toEqual(mockResponse);
  });

  it("should be able to delete a resource", async () => {
    const mockResponse = {
      id: 1,
      name: "Widget 1",
    };

    mockDataProvider.deleteOne.mockResolvedValueOnce(mockResponse);

    await client.deleteOne({
      resource: "widgets",
      id: 1,
    });
  });
});
