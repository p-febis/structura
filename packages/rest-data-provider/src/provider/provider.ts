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

export class RestApiDataProvider implements DataProvider {
  constructor(private readonly options: RestApiDataProviderOptions) {}

  doFetch<T>(resource: string) {
    const url = new URL(resource, this.options.endpoint);
    const result = fetch(url).then((res) => res.json());

    return result as Promise<T>;
  }

  async getList<T>({ resource }: ListParams) {
    const result = await this.doFetch<T[]>(resource);
    return result;
  }

  async getOne<T>({ resource, id }: GetParams) {
    const result = await this.doFetch<T>(`${resource}/${id}`);
    return result;
  }

  async createOne<T, K>(parameters: CreateParams<K>): Promise<T> {
    return {} as T;
  }

  async updateOne<T, K>(parameters: UpdateParams<K>): Promise<T> {
    return {} as T;
  }
  async deleteOne(parameters: DeleteParams): Promise<void> {
  }
}
