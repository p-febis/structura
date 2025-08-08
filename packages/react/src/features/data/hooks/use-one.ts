import useSWR from "swr";
import { useResource } from "../../resource-context/components/ResourceContext";
import { useStructuraClient } from "../../client-provider/components/StructuraClientProvider";
import type { GetParams } from "core";

export const useOne = <T>(parameters?: GetParams) => {
  const currentResource = useResource();
  const { resource: usedResource, id: usedId } = parameters ?? currentResource;

  if (!usedId) {
    throw new Error("useOne must be called with an id");
  }

  const { client } = useStructuraClient();

  const { mutate, ...restQuery } = useSWR(
    [usedResource, usedId],
    ([resource, id]) => client.getOne<T>({ resource, id }),
  );

  return restQuery;
};
