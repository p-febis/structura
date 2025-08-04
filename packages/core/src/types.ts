export type ListParams = {
  resource: string;
};

export type GetParams = {
  resource: string;
  id: string | number;
};

export type CreateParams<T> = {
  resource: string;
  data: T;
};

export type UpdateParams<T> = {
  resource: string;
  id: string | number;
  data: T;
};

export type DeleteParams = {
  resource: string;
  id: string | number;
};
