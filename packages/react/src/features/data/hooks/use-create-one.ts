import useSWRMutation, { type SWRMutationConfiguration } from "swr/mutation";
import { useResource } from "../../resource-context/components/ResourceContext";
import { useStructuraClient } from "../../client-provider/components/StructuraClientProvider";

export const useCreateOne = <T, K>(parameters?: {
  resource?: string;
  mutationOptions?: SWRMutationConfiguration<T, any, string, K, T>;
}) => {
  const currentResource = useResource();
  const { client } = useStructuraClient();
  const usedResource = parameters?.resource ?? currentResource.resource;

  const { trigger: mutate, ...restMutation } = useSWRMutation<T, any, string, K>(
    usedResource,
    (resource, { arg }: { arg: K }) =>
      client.createOne<T, K>({
        resource,
        data: arg,
      }),
      parameters?.mutationOptions
  );

  return { mutate, ...restMutation };
};
