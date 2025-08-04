import type {
  ListParams,
  GetParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from "../types";

export interface DataProvider {
  getList<T>(parameters: ListParams): Promise<T[]>;
  getOne<T>(parameters: GetParams): Promise<T>;
  createOne<T, K>(parameters: CreateParams<K>): Promise<T>;
  updateOne<T, K>(parameters: UpdateParams<K>): Promise<T>;
  deleteOne(parameters: DeleteParams): Promise<void>;
}
