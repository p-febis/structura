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

let interceptedBodies: any[] = [];
let didDelete = false;

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
    http.post("https://example.com/products", async ({ request }) => {
      interceptedBodies.push(await request.json());

      return HttpResponse.json({
        id: 1,
        name: "Scuba tank",
      });
    }),
    http.patch("https://example.com/products/1", async ({ request }) => {
      interceptedBodies.push(await request.json());

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
    interceptedBodies = [];
    didDelete = false;
  });
  afterAll(() => server.close());

  let dataProvider: DataProvider;

  beforeEach(() => {
    // @ts-ignore not up to full implementation yet
    dataProvider = new RestApiDataProvider({
      endpoint: "https://example.com/",
    });
  });

  it("should be able to create the dataProvider", () => {
    expect(dataProvider).toBeDefined();
  });

  it("should implement getList", async () => {
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

  it("should implement getOne", async () => {
    const one = await dataProvider.getOne({
      resource: "products",
      id: "1",
    });

    expect(one).toEqual({
      id: 1,
      name: "Scuba tank",
    });
  });

  it("should implement createOne", async () => {
    const result = await dataProvider.createOne<
      { id: number; name: string },
      { name: string }
    >({
      resource: "products",
      data: {
        name: "Dive watch",
      },
    });

    expect(interceptedBodies[0]).toEqual({
      name: "Dive watch",
    });

    expect(result).toEqual({
      id: 1,
      name: "Scuba tank",
    });
  });

  it("should implement updateOne", async () => {
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

    expect(interceptedBodies[0]).toEqual({
      name: "Dive watch",
    });
  });

  it("should implement deleteOne", async () => {
    await dataProvider.deleteOne({
      resource: "products",
      id: 1,
    });

    expect(didDelete).toBeTruthy();
  });
});
