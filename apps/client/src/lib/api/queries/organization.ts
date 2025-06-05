import { apiClient } from "@/lib/api/api-client";
import { useQuery } from "@tanstack/react-query";

import { type FilterOrganizations } from "@fsm/common";

export const useGetOrganizations = (params: FilterOrganizations) => {
  return useQuery({
    queryKey: ["organizations", params],
    queryFn: async () => {
      const response = await apiClient.api.v1.organizations.$get({
        query: params,
      });
      return response.json();
    },
  });
};
