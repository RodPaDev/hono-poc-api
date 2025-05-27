/* eslint-disable no-console */
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { organization, signOut, useSession } from "@/lib/auth-client";
import { Auth } from "@/pages/auth";
import type { MeteoriteLanding } from "@fsm/types";

import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { z } from "zod";

const queryClient = new QueryClient();

const querySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  year: z.string().optional(),
  min_mass: z.string().optional(),
});

function InnerApp() {
  const { data: session, refetch } = useSession();

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const queryParams = querySchema.parse({
    page: String(page),
    pageSize: String(pageSize),
  });

  const {
    isPending,
    error,
    data,
    refetch: refetchData,
  } = useQuery({
    queryKey: ["repoData", queryParams],
    queryFn: async () => {
      // hono rpc + tanstack query chef's kiss
      const response = await apiClient.api.v1["meteorite-landing"].$get({
        query: queryParams,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: MeteoriteLanding[] = (await response.json()).data;

      return data;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    console.log("Session data:", session);
  }, [session]);

  const setActive = async (targetId: string | null) => {
    if (session?.user) {
      const res = await organization.setActive({ organizationId: targetId });
      refetch();
      console.log("Set active organization response:", res);
    } else {
      console.log("No session data available");
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-center text-2xl mt-6">Better Auth Client Example</h1>
      {session ? (
        <div className="text-center mt-4">
          <p>Welcome!</p>
          <Button className="mt-4" onClick={() => signOut()}>
            Sign Out
          </Button>
          <Button className="mt-4" onClick={() => refetchData()}>
            Refetch Data
          </Button>
          <Button
            className="mt-4"
            onClick={() => setActive("4c5DLEKUOSDsTzIuVXkoA1knMonFRxXN")}>
            Set Active Organization
          </Button>
          <Button className="mt-4" onClick={() => setActive(null)}>
            Set Active Organization null
          </Button>

          <div className="mt-4">
            <Button
              className="mr-2"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}>
              Previous
            </Button>
            <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>

          {isPending ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching data</p>
          ) : data && data.length > 0 ? (
            <table className="table-auto border-collapse border border-gray-400 mt-4 mx-auto">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">ID</th>
                  <th className="border border-gray-400 px-4 py-2">Name</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Dataset ID
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Nametype</th>
                  <th className="border border-gray-400 px-4 py-2">Recclass</th>
                  <th className="border border-gray-400 px-4 py-2">Mass</th>
                  <th className="border border-gray-400 px-4 py-2">Fall</th>
                  <th className="border border-gray-400 px-4 py-2">Year</th>
                  <th className="border border-gray-400 px-4 py-2">Reclat</th>
                  <th className="border border-gray-400 px-4 py-2">Reclong</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Geolocation
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: MeteoriteLanding) => (
                  <tr key={item.id}>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.id}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.datasetId}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.nametype}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.recclass}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.mass}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.fall}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.year}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.reclat}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.reclong}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.geolocation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data</p>
          )}
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  );
}

export default App;
