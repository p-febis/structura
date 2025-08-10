import useSWRMutation, { type SWRMutationConfiguration } from "swr/mutation";
import { useResource } from "../../resource-context/components/ResourceContext";
import { useStructuraClient } from "../../client-provider/components/StructuraClientProvider";

export const useUpdateOne = <T, K>(parameters?: {
  resource?: string;
  id?: string;
  mutationOptions?: SWRMutationConfiguration<T, any, string, K, T>;
}) => {
  const currentResource = useResource();
  const { client } = useStructuraClient();
  const usedResource = parameters?.resource ?? currentResource.resource;
  const usedId = parameters?.id ?? currentResource.id;

  if(!usedId) {
    throw new Error("useUpdateOne should have an id available");
  }

  const { trigger: mutate, ...restMutation } = useSWRMutation<T, any, string, K>(
    usedResource,
    (resource, { arg }: { arg: K }) =>
      client.updateOne<T, K>({
        resource,
	id: usedId,
        data: arg,
      }),
      parameters?.mutationOptions
  );

  return { mutate, ...restMutation };

}
