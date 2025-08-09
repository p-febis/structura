import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import { RestApiDataProvider } from "./provider";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import type { DataProvider } from "@structura/core";

const server = setupServer(
  ...[
    http.get("https://example.com/products", () => {
      return HttpResponse.json([
        {
          id: 1,
          name: "Scuba tank",
        },
        {
          id: 2,
          name: "Scuba snorkel",
        },
      ]);
    }),
    http.get("https://example.com/products/1", () => {
      return HttpResponse.json({
        id: 1,
        name: "Scuba tank",
      });
    }),
    http.post("https://example.com/products", async () => {
      return HttpResponse.json({
        id: 1,
        name: "Scuba tank",
      });
    }),
    http.patch("https://example.com/products/1", async () => {
      return HttpResponse.json({
        id: 1,
        name: "Scuba tank",
      });
    }),
    http.delete("https://example.com/products/1", async () => {
      didDelete = true;
      return HttpResponse.json({});
    }),
  ],
);

describe("Structura REST API DataProvider", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  let dataProvider: DataProvider;

  beforeEach(() => {
    // @ts-ignore not up to full implementation yet
    dataProvider = new RestApiDataProvider({
      endpoint: "https://example.com/",
    });
  });

  it("returns a list of products", async () => {
    const list = await dataProvider.getList({
      resource: "products",
    });

    expect(list).toEqual([
      {
        id: 1,
        name: "Scuba tank",
      },
      {
        id: 2,
        name: "Scuba snorkel",
      },
    ]);
  });

  it("returns a single product by id", async () => {
    const one = await dataProvider.getOne({
      resource: "products",
      id: "1",
    });

    expect(one).toEqual({
      id: 1,
      name: "Scuba tank",
    });
  });

  it("creates a new product", async () => {
    const result = await dataProvider.createOne<
      { id: number; name: string },
      { name: string }
    >({
      resource: "products",
      data: {
        name: "Dive watch",
      },
    });

    expect(result).toEqual({
      id: 1,
      name: "Scuba tank",
    });
  });

  it("updates an existing product", async () => {
    const result = await dataProvider.updateOne<
      { id: number; name: string },
      { name: string }
    >({
      resource: "products",
      id: 1,
      data: {
        name: "Dive watch",
      },
    });

    expect(result).toEqual({
      id: 1,
      name: "Scuba tank",
    });
  });

  it("deletes a product by id", async () => {
    await expect(
      dataProvider.deleteOne({
        resource: "products",
        id: 1,
      }),
    ).resolves.not.toThrow();
  });
});
