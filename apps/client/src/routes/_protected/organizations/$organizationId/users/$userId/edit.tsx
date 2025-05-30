import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/organizations/$organizationId/users/$userId/edit",
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    // Simulate a data fetch or any asynchronous operation
    await new Promise((resolve) => {
      setTimeout(() => resolve(params), 2000);
    });

    return {
      foo: "bar",
    };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error loading data</div>,

});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <div>Hello {data.foo}</div>;
}
