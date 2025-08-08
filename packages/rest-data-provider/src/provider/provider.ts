import type {
  CreateParams,
  DataProvider,
  DeleteParams,
  GetParams,
  ListParams,
  UpdateParams,
} from "@structura/core";
export interface RestApiDataProviderOptions {
  endpoint: URL | string;
}

type DoFetchParameters = {
  path: string;
  data?: any;
};

export class RestApiDataProvider implements DataProvider {
  constructor(private readonly options: RestApiDataProviderOptions) {}

  doFetch<T>(
    { path, data }: DoFetchParameters,
    method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  ) {
    const url = new URL(path, this.options.endpoint);

    const result = fetch(url, {
      method,
      ...(data ? { body: JSON.stringify(data) } : {}),
    }).then((response) => response.json());

    return result as Promise<T>;
  }

  async getList<T>({ resource }: ListParams) {
    const result = await this.doFetch<T>({ path: resource });
    return result;
  }

  async getOne<T>({ resource, id }: GetParams) {
    const result = await this.doFetch<T>({ path: `${resource}/${id}` });
    return result;
  }

  async createOne<T, K>({ resource, data }: CreateParams<K>) {
    const result = await this.doFetch<T>(
      {
        path: resource,
        data,
      },
      "POST",
    );

    return result;
  }

  async updateOne<T, K>({ resource, id, data }: UpdateParams<K>): Promise<T> {
    const result = await this.doFetch<T>(
      {
        path: `${resource}/${id}`,
        data,
      },
      "PATCH",
    );

    return result;
  }
  async deleteOne({ resource, id }: DeleteParams): Promise<void> {
    await this.doFetch(
      {
        path: `${resource}/${id}`,
      },
      "DELETE",
    );
  }
}
