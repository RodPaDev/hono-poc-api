import { apiClient } from "@/lib/api/api-client";
import { useQuery } from "@tanstack/react-query";

interface UseGetOrganizationsParams {
  search?: string;
  status?: string;
}

export const useGetOrganizations = (params?: UseGetOrganizationsParams) => {
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
