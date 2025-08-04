import type { DataProvider } from "../data-provider/data-provider";
import type {
  CreateParams,
  DeleteParams,
  GetParams,
  ListParams,
  UpdateParams,
} from "../types";

export interface StructuraClientOptions {
  dataProvider: DataProvider;
}

export class StructuraClient {
  private dataProvider: DataProvider;

  constructor({ dataProvider }: StructuraClientOptions) {
    this.dataProvider = dataProvider;
  }

  async getList<T>(parameters: ListParams) {
    const response = await this.dataProvider.getList<T>(parameters);

    return response;
  }

  async getOne<T>(parameters: GetParams) {
    const response = await this.dataProvider.getOne<T>(parameters);

    return response;
  }

  async createOne<T, K>(parameters: CreateParams<K>) {
    const response = await this.dataProvider.createOne<T, K>(parameters);

    return response;
  }

  async updateOne<T, K>(parameters: UpdateParams<K>) {
    const response = await this.dataProvider.updateOne<T, K>(parameters);

    return response;
  }

  async deleteOne(parameters: DeleteParams) {
    await this.dataProvider.deleteOne(parameters);
  }
}
