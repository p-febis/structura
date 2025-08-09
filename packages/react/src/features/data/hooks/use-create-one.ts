import useSWRMutation from "swr/mutation";
import { useResource } from "../../resource-context/components/ResourceContext";
import { useStructuraClient } from "../../client-provider/components/StructuraClientProvider";

export const useCreateOne = <T, K>(parameters?: { resource: string }) => {
  const currentResource = useResource();
  const { client } = useStructuraClient();
  const { resource: usedResource } = parameters ?? currentResource;

  const { trigger: mutate, ...restMutation } = useSWRMutation(
    [usedResource],
    ([resource], { arg }: { arg: K }) =>
      client.createOne<T, K>({
        resource,
        data: arg,
      }),
  );

  return { mutate, ...restMutation };
};
