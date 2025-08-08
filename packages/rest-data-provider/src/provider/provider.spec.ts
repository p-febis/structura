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
import { DataProvider } from "@structura/core";

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
  ],
);

describe("Structura REST API DataProvider", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
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
});
