import useSWR from "swr";
import { useStructuraClient } from "../../client-provider/components/StructuraClientProvider";
import { useResource } from "../../resource-context/components/ResourceContext";
import type { ListParams } from "core";

export const useList = <T>(parameters?: ListParams) => {
  const { resource: currentResource } = useResource();
  const { client } = useStructuraClient();

  const usedResource = parameters?.resource ?? currentResource;

  const { mutate, ...restQuery } = useSWR(
    usedResource,
    (resource) => client.getList<T>({ resource }),
  );

  return restQuery;
};
